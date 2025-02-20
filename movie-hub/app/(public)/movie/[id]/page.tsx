import {
  getMovieDetails,
  getMovieCredits,
  getMovieBackdrops,
  getMovieVideos,
  getMovieSuggestions,
  getKeywords,
} from "../../../actions/movie/movie-data";
import { Metadata } from "next";

import MovieInfo from "../../../../components/movie-details/movie-info";
import MovieMedia from "../../../../components/movie-details/media-section";
import ImageGallery from "../../../../components/movie-details/image-gallery";
import VideoGallery from "../../../../components/movie-details/video-gallery";
import TopCastList from "../../../../components/movie-details/top-cast-list";
import MovieSuggestions from "../../../../components/movie-details/movie-suggestions";
import DetailsSection from "../../../../components/movie-details/details-section";
import Storyline from "../../../../components/movie-details/storyline";
import BoxOffice from "../../../../components/movie-details/box-office";
import Paragraph from "../../../../components/paragraph";
import InformationBlockMultiple from "../../../../components/information-block-multiple";

export const metadata: Metadata = {
  title: "Details Page",
};

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const movieCredits = await getMovieCredits(id);
  const backdrops = await getMovieBackdrops(movie.id);
  const videos = await getMovieVideos(movie.id);
  const movieSuggestions = await getMovieSuggestions(movie.id);
  const keywords = await getKeywords(movie.id);
  const directors: any[] = [];
  const writers: any[] = [];
  const stars = [];
  const cast = [];

  // Directors
  movieCredits.crew.map((data) => {
    if (data.job.toLowerCase() == "director") {
      directors.push(data);
    }
  });

  // Writes
  movieCredits.crew.map((data) => {
    if (
      data.job.toLowerCase() == "writer" ||
      data.job.toLowerCase() == "screenplay"
    ) {
      writers.push(data);
    }
  });

  // Stars
  movieCredits.cast.map((data) => {
    if (
      data.known_for_department.toLowerCase() == "acting" &&
      data.popularity
    ) {
      stars.push({
        name: data.name,
        popularity: data.popularity,
      });
    }
  });

  // Sort the stars array by popularity (descending order)
  const starsSorted = stars
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // Cast
  movieCredits.cast.map((data) => {
    if (
      data.known_for_department.toLowerCase() == "acting" &&
      data.popularity
    ) {
      cast.push(data);
    }
  });

  const topCast = cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10);

  // Movie Suggestions
  const topMovieSuggestions = movieSuggestions.results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Movie Info */}
      <MovieInfo key={movie.id} movie={movie} />

      {/* Media Section */}
      <MovieMedia key={movie.id} movie={movie} />

      <div className="flex flex-col">
        {/* Movie Tagline */}
        {movie.tagline ? <Paragraph text={movie.tagline} /> : ""}

        {/* Crew and Cast */}
        <div className="flex flex-col">
          {/* Directors */}
          {directors ? (
            <InformationBlockMultiple
              data={directors}
              keyPlural={"Directors"}
              keySingular={"Director"}
            >
              <ul className="flex flex-wrap gap-6">
                {directors.map((director) => (
                  <li
                    key={director.id}
                    className="[&:nth-child(n+2)]:list-disc"
                  >
                    {director.name}
                  </li>
                ))}
              </ul>
            </InformationBlockMultiple>
          ) : (
            ""
          )}

          {/* Writers */}
          {writers ? (
            <InformationBlockMultiple
              data={writers}
              keyPlural={"Writers"}
              keySingular={"Write"}
            >
              <ul className="flex gap-6 flex-wrap">
                {writers.map((data) => (
                  <li key={data.id} className="[&:nth-child(n+2)]:list-disc">
                    {data.name}
                  </li>
                ))}
              </ul>
            </InformationBlockMultiple>
          ) : (
            ""
          )}

          {/* Stars */}
          {starsSorted ? (
            <InformationBlockMultiple
              data={starsSorted}
              keyPlural={"Stars"}
              keySingular={"Star"}
            >
              <ul className="flex flex-wrap gap-6">
                {starsSorted.map((star) => (
                  <li key={star.name} className="[&:nth-child(n+2)]:list-disc">
                    {star.name}
                  </li>
                ))}
              </ul>
            </InformationBlockMultiple>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Video Gallery */}
      <VideoGallery videos={videos} />

      {/* Image Gallery */}
      <ImageGallery backdrops={backdrops} />

      {/* Top Cast List */}
      <TopCastList topCast={topCast} />

      {/* Top Movie Suggestions */}
      <MovieSuggestions topMovieSuggestions={topMovieSuggestions} />

      {/* Storyline */}
      <Storyline movie={movie} keywords={keywords.keywords} />

      {/* Details Section */}
      <DetailsSection movie={movie} />

      {/* Box Office*/}
      <BoxOffice revenue={movie.revenue} />
    </div>
  );
}
