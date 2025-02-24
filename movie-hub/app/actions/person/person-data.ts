import baseApiURL from "../API-URLS/base-API-URL";

// Movie's details
export const getPersonDetails = async (id: number) => {
  const personDetailsURL = `${baseApiURL}/person/${id}?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personDetailsURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Person Images
export const getPersonImages = async (id: number) => {
  const personImagesURL = `${baseApiURL}/person/${id}/images?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personImagesURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Get Person's Movie Credits
export const getPersonMovieCredits = async (id: number) => {
  const personMovieCreditsURL = `${baseApiURL}/person/${id}/movie_credits?language=en-US&api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(personMovieCreditsURL);
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    console.log(error.message);
  }
};
