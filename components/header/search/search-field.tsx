"use client";

import SearchDesktop from "./search-desktop/search-desktop";
import SearchMobile from "./search-mobile/search-mobile";
import { redirect, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense, useEffect, useState } from "react";
import { search } from "../../../app/actions/search/search-data";
import { SearchResponse } from "../../../app/actions/search/types";

export default function SearchField() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse["results"]>(
    []
  );
  const [searchType, setSearchType] = useState("multi"); // Default search type

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() && searchType) {
      e.preventDefault();
      const searchUrl = `/search/?q=${searchQuery
        .split(" ")
        .join("-")
        .toLowerCase()}&type=${searchType}`;

      // Navigate to the search results page with query and type in the URL
      redirect(searchUrl);
    }
  };

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

  return (
    <>
      {/* Search icon hidden on mobile */}
      <Suspense>
        <SearchDesktop
          searchType={searchType}
          setSearchType={setSearchType}
          query={searchQuery}
          handleChange={handleInputChange}
          onKeyDown={handleKeyDown}
          searchResults={searchResults}
        />
      </Suspense>

      {/* Search icon hidden on desktop */}
      <Suspense>
        <SearchMobile
          searchType={searchType}
          setSearchType={setSearchType}
          query={searchQuery}
          handleChange={handleInputChange}
          onKeyDown={handleKeyDown}
          searchResults={searchResults}
        />
      </Suspense>
    </>
  );
}
