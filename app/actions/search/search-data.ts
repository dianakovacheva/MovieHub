"use server";

import baseApiURL from "../API-URLS/base-API-URL";
import { SearchResponse } from "./types";

export async function search(
  searchTerm: string,
  searchType: string //   "multi" | "movie" | "person"
): Promise<SearchResponse["results"] | null> {
  const searchURL = `${baseApiURL}/search/${searchType.trim()}?query=${searchTerm.trim()}&language=en-US&api_key=${
    process.env.API_KEY
  }`;

  try {
    // Fetch results directly from TMDB
    const res = await fetch(searchURL);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SearchResponse = await res.json();

    // Filter to movie, tv and person results
    if (resData && resData.results && searchType == "multi") {
      resData.results = resData.results.filter(
        (result) =>
          result.media_type == "movie" ||
          result.media_type == "tv" ||
          result.media_type == "person"
      );
    }

    // Sort results by popularity
    if (resData && resData.results) {
      resData.results = resData.results.sort(
        (a, b) => b.popularity - a.popularity
      );
    }

    return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}
