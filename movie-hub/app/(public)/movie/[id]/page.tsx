import {
  getMovieDetails,
  getMovieCredits,
  getMovieBackdrops,
  getMovieVideos,
  getMovieSuggestions,
} from "../../../actions/movies/moviesData";
import { Metadata } from "next";

import MovieInfo from "../../../../components/movie-details/movie-info";
import MovieMedia from "../../../../components/movie-details/media-section";
import ImageGallery from "../../../../components/movie-details/image-gallery";
import VideoGallery from "../../../../components/movie-details/video-gallery";
import TopCastList from "../../../../components/movie-details/top-cast-list";
import MovieSuggestions from "../../../../components/movie-details/movie-suggestions";

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
  const directors: string[] = [];
  const writers: string[] = [];
  const stars = [];
  const cast = [];

  // Directors
  movieCredits.crew.map((data) => {
    if (data.job.toLowerCase() == "director") {
      directors.push(data.name);
    }
  });

  // Writers
  movieCredits.crew.map((data) => {
    if (
      data.job.toLowerCase() == "writer" ||
      data.job.toLowerCase() == "screenplay"
    ) {
      writers.push(data.name);
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
    <div className="flex flex-col gap-6">
      {/* Movie Info */}
      <MovieInfo key={movie.id} movie={movie} />

      {/* Media Section */}
      <MovieMedia key={movie.id} movie={movie} />

      {/* Staff */}
      <div className="flex flex-col">
        <div>
          <p className="text-base font-normal">{movie.overview}</p>
        </div>
        <div className="divider"></div>
        {/* Directors */}
        <div>
          <p className="text-base">
            <span className="font-bold">
              {directors.length > 1 ? "Directors" : "Director"}{" "}
            </span>
            {directors.join(", ")}
          </p>
        </div>

        <div className="divider"></div>
        {/* Writers */}
        <div>
          <p className="text-base">
            <span className="font-bold">
              {writers.length > 1 ? "Writers" : "Writer"}{" "}
            </span>
            {writers.join(", ")}
          </p>
        </div>

        <div className="divider"></div>
        {/* Stars */}
        <div>
          <p className="text-base">
            <span className="font-bold">
              {starsSorted.length > 1 ? "Stars" : "Star"}{" "}
            </span>
            {starsSorted.map((actor) => actor.name).join(", ")}
          </p>
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
    </div>
  );
}
