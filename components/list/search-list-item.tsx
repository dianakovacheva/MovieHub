"use client";

import { SearchResponse } from "../../app/actions/search/types";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense, useEffect, useState } from "react";
import { search } from "../../app/actions/search/search-data";
import SearchMovieResults from "./search-movie-results";

type SearchListItemProps = {
  listId: string;
  userId: string;
};

export default function SearchListItem({
  listId,
  userId,
}: SearchListItemProps) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse["results"]>(
    []
  );
  const searchType = "movie";

  const handleSearch = useDebouncedCallback(async () => {
    if (!searchQuery) {
      setSearchResults([]);

      return;
    }

    const searchResultsData = await search(searchQuery, searchType);

    if (searchResultsData) setSearchResults(searchResultsData);
  }, 500);

  // Handle input change
  const handleInputChange = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value;

    setSearchQuery(searchTerm);
  };

  // Search by pressing the enter key
  // const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && searchQuery.trim() && searchType) {
  //     e.preventDefault();

  //     // Add movie to the list
  //     const movie = await addMovieToList(listId, "2", userId);

  //     console.log(movie);

  //     // const searchUrl = `/search/?q=${searchQuery
  //     //   .split(" ")
  //     //   .join("-")
  //     //   .toLowerCase()}&type=${searchType}`;

  //     // Navigate to the search results page with query and type in the URL
  //     // redirect(searchUrl);
  //   }
  // };

  // Handle search type change
  useEffect(() => {
    if (searchQuery) handleSearch();
  }, [handleSearch, searchQuery, searchType]); // Re-fetch when search type changes

  // Sync query state with URL changes
  useEffect(() => {
    const newQuery = searchParams.get("query") || "";
    setSearchQuery(newQuery);

    if (!newQuery) setSearchResults([]); // Clear results if the query is empty
  }, [searchParams]);

  // Add movie to the list
  //     const movie = await addMovieToList(listId, "2", userId);

  //     console.log(movie);

  return (
    <>
      <Suspense>
        <div className="dropdown">
          <form className="items-center">
            <label htmlFor="search-input">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                // onKeyDown={handleKeyDown}
                placeholder="Search"
                list="search-options"
                className="input md:w-[50%] w-[100%]"
              />
            </label>
          </form>

          {searchResults && searchResults.length > 0 && (
            <SearchMovieResults
              data={searchResults}
              listId={listId}
              userId={userId}
              listStyle={
                "dropdown-content list absolute z-1 join-item p-2 mt-4 max-h-[60vh] md:w-[50%] w-[100%] overflow-scroll bg-zinc-50 dark:bg-[#121212] rounded-box shadow-md hover:cursor-pointer"
              }
              cardStyle="list-row hover:bg-zinc-300 dark:hover:bg-zinc-700"
            />
          )}
        </div>
      </Suspense>
    </>
  );
}
