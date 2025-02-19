import baseApiURL from "../movie/base-API-URL";

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

    return resData.backdrops;
  } catch (error: any) {
    console.log(error.message);
  }
};
