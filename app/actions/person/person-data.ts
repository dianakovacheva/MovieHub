import { getUnique } from "../../utils/get-unique";
import baseApiURL from "../API-URLS/base-API-URL";
import {
  MostPopularPeopleResponse,
  PersonDataResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
} from "./types";

// Person data
export async function getPersonData(
  id: number
): Promise<PersonDataResponse | null> {
  const personDataURL = `${baseApiURL}/person/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personDataURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: PersonDataResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Person Images
export async function getPersonImages(
  id: number
): Promise<PersonImagesResponse["profiles"] | null> {
  const personImagesURL = `${baseApiURL}/person/${id}/images?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personImagesURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: PersonImagesResponse = await res.json();

    return resData.profiles;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Person Movie Credits
export async function getPersonMovieCredits(
  id: number
): Promise<PersonMovieCreditsResponse | null> {
  const personMovieCreditsURL = `${baseApiURL}/person/${id}/movie_credits?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personMovieCreditsURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: PersonMovieCreditsResponse = await res.json();

    return resData;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}

// Get a list of people ordered by popularity
export async function getMostPopularPeople(): Promise<
  MostPopularPeopleResponse["results"] | null
> {
  const mostPopularPeopleURL = `${baseApiURL}/person/popular?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(mostPopularPeopleURL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resData: MostPopularPeopleResponse = await res.json();
    let results: MostPopularPeopleResponse["results"];

    if (resData && resData.results) {
      results = resData.results.filter(getUnique);
    }

    return results;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
}
