"use server";

import baseApiURL from "../API-URLS/base-API-URL";
import { SearchResponse } from "./types";
import { redis } from "../../../redis";

const DEFAULT_EXPIRATION = 60 * 60 * 12; // 12 hours

export async function search(
  searchTerm: string,
  searchType: string //   "multi" | "movie" | "person"
): Promise<SearchResponse["results"] | null> {
  const searchURL = `${baseApiURL}/search/${searchType.trim()}?query=${searchTerm.trim()}&language=en-US&api_key=${
    process.env.API_KEY
  }`;
  const cacheKey = `search:${searchType}:${searchTerm.toLowerCase()}`;

  try {
    // 1. Try to get from Redis
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("From Redis Cache");
      return JSON.parse(cached) as SearchResponse["results"];
    }

    // 2. Otherwise, fetch from TMDB
    const res = await fetch(searchURL);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SearchResponse = await res.json();

    // Filter only movie and person results
    if (resData && resData.results && searchType == "multi") {
      resData.results = resData.results.filter(
        (result) =>
          result.media_type == "movie" || result.media_type == "person"
      );

      resData.results?.filter((item) => item.title !== undefined);
      resData.results?.filter((item) => item.name !== undefined);
    }

    // 3. Cache the result in Redis (set TTL)
    await redis.set(cacheKey, JSON.stringify(resData.results), {
      EX: DEFAULT_EXPIRATION,
    });

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
