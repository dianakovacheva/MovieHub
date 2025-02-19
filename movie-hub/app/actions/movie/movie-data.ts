import baseApiURL from "./base-API-URL";

// Trending movies today
export async function getTrendingMoviesToday() {
  const trendingMoviesTodayURL = `${baseApiURL}/trending/movie/day?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(trendingMoviesTodayURL);
    const resData = await res.json();
    const moviesData = Object.values(resData.results);

    return moviesData;
  } catch (error: any) {
    console.log(error.message);
  }
}

// Movie's details
export const getMovieDetails = async (id: number) => {
  const movieDetailsURL = `${baseApiURL}/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(movieDetailsURL);

    const resData = await res.json();
    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Movie videos
export const getMovieVideos = async (id: number) => {
  const movieVideosURL = `${baseApiURL}/movie/${id}/videos?language=en-US&api_key=${process.env.API_KEY}`;
  try {
    const res = await fetch(movieVideosURL);

    const resData = await res.json();
    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Movie Backdrops
export const getMovieBackdrops = async (id: number) => {
  const movieImagesURL = `${baseApiURL}/movie/${id}/images?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(movieImagesURL);

    const resData = await res.json();
    return resData.backdrops;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Movie Credits
export const getMovieCredits = async (id: number) => {
  const movieCreditsURL = `${baseApiURL}/movie/${id}/credits?language=en-US&api_key=${process.env.API_KEY}`;
  try {
    const res = await fetch(movieCreditsURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Movie Suggestions
export const getMovieSuggestions = async (id: number) => {
  const similarMoviesURL = `${baseApiURL}/movie/${id}/similar?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(similarMoviesURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Movie Keyword
export const getKeywords = async (id: number) => {
  const keywordsURL = `${baseApiURL}/movie/${id}/keywords?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(keywordsURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};
