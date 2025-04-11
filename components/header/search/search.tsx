"use client";

import SearchDesktop from "./search-desktop/search-desktop";
import SearchMobile from "./search-mobile/search-mobile";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { search } from "../../../app/actions/search/search-data";
import { SearchResponse } from "../../../app/actions/search/types";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // State variables
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse["results"]>(
    []
  );
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
  useEffect(() => {
    const newQuery = searchParams.get("query") || "";

    if (!newQuery) setSearchResults([]); // Clear results if the query is empty
    setQuery(newQuery);
  }, [searchParams]);

  return (
    <>
      {/* Search icon hidden on mobile */}
      <SearchDesktop
        searchType={searchType}
        setSearchType={setSearchType}
        query={query}
        handleChange={handleChange}
        searchResults={searchResults}
      />

      {/* Search icon hidden on desktop */}
      <SearchMobile
        searchType={searchType}
        setSearchType={setSearchType}
        query={query}
        handleChange={handleChange}
        searchResults={searchResults}
      />
    </>
  );
}
