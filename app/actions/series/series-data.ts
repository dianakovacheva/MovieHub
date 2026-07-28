"use server";

import { getUniqueById } from "../../utils/get-unique-by-id";
import baseApiURL from "../API-URLS/base-API-URL";
import {
  AiringTodaySeriesResponse,
  DiscoverSeriesResponse,
  OnTheAirSeriesResponse,
  PopularSeriesResponse,
  SeriesCreditsResponse,
  SeriesDetailsResponse,
  SeriesImagesResponse,
  SeriesKeywordsResponse,
  SeriesSuggestionsResponse,
  SeriesVideosResponse,
  TopRatedSeriesResponse,
  TrendingSeriesListResponse,
} from "./types";

// Get trending series today
export async function getTrendingSeriesToday(): Promise<
  TrendingSeriesListResponse["results"] | null
> {
  const trendingSeriesTodayURL = `${baseApiURL}/trending/tv/day?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(trendingSeriesTodayURL);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: TrendingSeriesListResponse = await res.json();
    resData.results = resData.results?.filter(getUniqueById);

    return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series details
export async function getSeriesDetails(
  id: string | number
): Promise<SeriesDetailsResponse | null> {
  const seriesDetailsURL = `${baseApiURL}/tv/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(seriesDetailsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesDetailsResponse = await res.json();

    if (resData.genres && resData.production_companies) {
      resData.genres = resData.genres?.filter(getUniqueById);

      resData.production_companies =
        resData.production_companies?.filter(getUniqueById);
    }

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series videos
export async function getSeriesVideos(
  id: string | number
): Promise<SeriesVideosResponse["results"] | null> {
  const seriesVideosURL = `${baseApiURL}/tv/${id}/videos?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(seriesVideosURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesVideosResponse = await res.json();

    if (resData.results) return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series backdrops
export async function getSeriesBackdrops(
  id: string | number
): Promise<SeriesImagesResponse["backdrops"] | null> {
  const seriesImagesURL = `${baseApiURL}/tv/${id}/images?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(seriesImagesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesImagesResponse = await res.json();

    if (resData.backdrops) return resData.backdrops;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series credits
export async function getSeriesCredits(
  id: string | number
): Promise<SeriesCreditsResponse | null> {
  const seriesCreditsURL = `${baseApiURL}/tv/${id}/credits?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(seriesCreditsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesCreditsResponse = await res.json();

    if (resData.cast && resData.crew) {
      resData.cast = resData.cast?.filter(getUniqueById);
      resData.crew = resData.crew?.filter(getUniqueById);
    }

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series suggestions (similar shows)
export async function getSeriesSuggestions(
  id: string | number
): Promise<SeriesSuggestionsResponse["results"] | null> {
  const similarSeriesURL = `${baseApiURL}/tv/${id}/similar?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(similarSeriesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesSuggestionsResponse = await res.json();

    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Series keywords (TV keywords live under `results`)
export async function getSeriesKeywords(
  id: string | number
): Promise<SeriesKeywordsResponse["results"] | null> {
  const keywordsURL = `${baseApiURL}/tv/${id}/keywords?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(keywordsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: SeriesKeywordsResponse = await res.json();

    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Discover series first airing this year
export async function getDiscoverSeries(): Promise<
  DiscoverSeriesResponse["results"] | null
> {
  const year = new Date().getFullYear();

  const discoverSeriesURL = `${baseApiURL}/discover/tv?first_air_date_year=${year}&language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(discoverSeriesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: DiscoverSeriesResponse = await res.json();

    if (resData.results) return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get a list of series ordered by rating
export async function getTopRatedSeries(): Promise<
  TopRatedSeriesResponse["results"] | null
> {
  const topRatedSeriesURL = `${baseApiURL}/tv/top_rated?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(topRatedSeriesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: TopRatedSeriesResponse = await res.json();
    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get a list of popular series
export async function getPopularSeries(): Promise<
  PopularSeriesResponse["results"] | null
> {
  const popularSeriesURL = `${baseApiURL}/tv/popular?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(popularSeriesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: PopularSeriesResponse = await res.json();
    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get series airing today
export async function getAiringTodaySeries(): Promise<
  AiringTodaySeriesResponse["results"] | null
> {
  const airingTodayURL = `${baseApiURL}/tv/airing_today?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(airingTodayURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: AiringTodaySeriesResponse = await res.json();
    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get series currently on the air
export async function getOnTheAirSeries(): Promise<
  OnTheAirSeriesResponse["results"] | null
> {
  const onTheAirURL = `${baseApiURL}/tv/on_the_air?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(onTheAirURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: OnTheAirSeriesResponse = await res.json();
    if (resData.results) {
      resData.results = resData.results?.filter(getUniqueById);

      return resData.results;
    }
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}
