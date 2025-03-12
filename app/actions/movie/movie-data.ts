import baseApiURL from "../API-URLS/base-API-URL";
import { TrendingMovieListSchema } from "./definitions";
import {
  MovieCreditDetailsResponse,
  MovieCreditsResponse,
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieKeywordsResponse,
  MovieSuggestionsResponse,
  MovieVideosResponse,
  TopRatedMoviesResponse,
  TrendingMovieListResponse,
  UpcomingMoviesResponse,
} from "./types";

// Get trending movies today
export async function getTrendingMoviesToday(): Promise<TrendingMovieListResponse | null> {
  const trendingMoviesTodayURL = `${baseApiURL}/trending/movie/day?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(trendingMoviesTodayURL);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData = await res.json();
    const parsed = TrendingMovieListSchema.safeParse(resData);

    if (!parsed.success) {
      console.error("Invalid API response:", parsed.error);
      return null;
    }

    return parsed.data.results as TrendingMovieListResponse;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie's details
export async function getMovieDetails(
  id: number
): Promise<MovieDetailsResponse | null> {
  const movieDetailsURL = `${baseApiURL}/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(movieDetailsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieDetailsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie videos
export async function getMovieVideos(
  id: number
): Promise<MovieVideosResponse["results"] | null> {
  const movieVideosURL = `${baseApiURL}/movie/${id}/videos?language=en-US&api_key=${process.env.API_KEY}`;
  try {
    const res = await fetch(movieVideosURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieVideosResponse = await res.json();

    return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie Backdrops
export async function getMovieBackdrops(
  id: number
): Promise<MovieImagesResponse["backdrops"] | null> {
  const movieImagesURL = `${baseApiURL}/movie/${id}/images?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(movieImagesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieImagesResponse = await res.json();

    return resData.backdrops;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie Credits
export async function getMovieCredits(
  id: number
): Promise<MovieCreditsResponse | null> {
  const movieCreditsURL = `${baseApiURL}/movie/${id}/credits?language=en-US&api_key=${process.env.API_KEY}`;
  try {
    const res = await fetch(movieCreditsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieCreditsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get a Movie Credit details by ID
export async function getMovieCreditDetails(
  id: number
): Promise<MovieCreditDetailsResponse | null> {
  const movieCreditDetailsURL = `${baseApiURL}/credit/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(movieCreditDetailsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieCreditDetailsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie Suggestions
export async function getMovieSuggestions(
  id: number
): Promise<MovieSuggestionsResponse | null> {
  const similarMoviesURL = `${baseApiURL}/movie/${id}/similar?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(similarMoviesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieSuggestionsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Movie Keyword
export async function getMovieKeywords(
  id: number
): Promise<MovieKeywordsResponse | null> {
  const keywordsURL = `${baseApiURL}/movie/${id}/keywords?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(keywordsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MovieKeywordsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get Upcoming Movies
export async function getUpcomingMovies(): Promise<
  UpcomingMoviesResponse["results"] | null
> {
  const year = new Date().getFullYear();

  const upcomingMoviesURL = `${baseApiURL}/discover/movie?primary_release_year=${year}&language=en-US&api_key=${process.env.API_KEY}`;

  // const today = new Date();
  // const minDate = new Date(today);
  // minDate.setDate(today.getDate() + 1); // Tomorrow

  // const maxDate = new Date(minDate);
  // maxDate.setDate(minDate.getDate() + 14); // Tomorrow + 14 days

  // const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  // const upcomingMoviesURL = `${baseApiURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${formatDate(
  //   minDate
  // )}&release_date.lte=${formatDate(maxDate)}&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(upcomingMoviesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: UpcomingMoviesResponse = await res.json();

    return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get a list of movies ordered by rating
export async function getTopRatedMovies(): Promise<
  TopRatedMoviesResponse["results"] | null
> {
  const topRatedMoviesURL = `${baseApiURL}/movie/top_rated?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(topRatedMoviesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: TopRatedMoviesResponse = await res.json();

    return resData.results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}
export { TrendingMovieListResponse };
