import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { search } from "../../../../app/actions/search/search-data";
import SearchResultsList from "../search-results-list";
import {
  SearchMovieResponse,
  SearchPersonResponse,
  SearchResponse,
} from "../../../../app/actions/search/types";

export default function SearchDesktop() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // State variables
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse["results"]>(
    []
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchType, setSearchType] = useState("multi"); // Default search type

  const handleSearch = useDebouncedCallback(
    async (searchTerm: string, searchType: string) => {
      if (!searchTerm) {
        setSearchResults([]);

        return;
      }

      let searchResultsData = await search(searchTerm, searchType);

      if (searchResultsData) {
        searchResultsData = searchResultsData.sort(
          (a, b) => b.popularity - a.popularity
        );
        setSearchResults(searchResultsData);
      }
    },
    500
  );

  // Handle input change
  const handleChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value, searchType);
    setShowDropdown(!!value);

    // Update URL query immediately
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Handle search type change
  useEffect(() => {
    if (query) {
      handleSearch(query, searchType);
    }
  }, [handleSearch, query, searchType]); // Re-fetch when search type changes

  // Sync query state with URL changes
  // useEffect(() => {
  //   const newQuery = searchParams.get("query") || "";

  //   if (!newQuery) setSearchResults([]); // Clear results if the query is empty
  //   setQuery(newQuery);
  // }, [searchParams]);

  const moviesArray: SearchResponse["results"] = [];
  const personsArray: SearchResponse["results"] = [];

  searchResults?.forEach((result) => {
    if (result.media_type === "person") {
      personsArray.push(result);
    } else if (result.media_type === "movie") {
      moviesArray.push(result);
    }
  });

  const resultsArray = [...moviesArray, ...personsArray];

  const results = searchResults?.map((result) => ({
    id: result.id,
    media_type: result.media_type,
    title: result.title,
    release_date: result.release_date,
    poster_path: result.poster_path,
    name: result.name,
    known_for_department: result.known_for_department,
    profile_path: result.profile_path,
  }));

  return (
    <div className="dropdown">
      <form className="flex items-center join hidden md:flex">
        <select
          id="search-options"
          className="bg-base-100 z-1 w-32 join-item p-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          aria-label="Search category"
        >
          <option disabled={true} value="">
            Search by
          </option>
          <option value="multi">All</option>
          <option value="movie">Movie</option>
          <option value="person">Person</option>
        </select>
        <label
          htmlFor="search-input"
          className="input join-item flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search"
            list="search-options"
          />
          <Search className="opacity-50 hidden sm:flex hover:cursor-pointer" />
        </label>
      </form>
      {searchResults && searchResults.length > 0 && (
        <SearchResultsList results={results} searchType={searchType} />
      )}
    </div>
  );
}
