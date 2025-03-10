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
import VideoGallery from "../../../../components/video-gallery";
import TopCastList from "../../../../components/movie-details/top-cast-list";
import DetailsSection from "../../../../components/movie-details/details-section";
import Storyline from "../../../../components/movie-details/storyline";
import BoxOffice from "../../../../components/movie-details/box-office";
import Paragraph from "../../../../components/paragraph";
import InformationBlockMultiple from "../../../../components/information-block-multiple";
import MoreLikeThis from "../../../../components/movie-details/more-like-this";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Details Page",
};

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const movieCredits = await getMovieCredits(id);
  const backdrops = await getMovieBackdrops(movie.id);
  const movieVideos = await getMovieVideos(movie.id);
  const movieSuggestions = await getMovieSuggestions(movie.id);
  const keywords = await getKeywords(movie.id);
  const directors: any[] = [];
  const writers: any[] = [];
  const stars = [];
  const cast = [];
  const videoListTitle = "Videos List";

  // Directors
  movieCredits.crew.map((data) => {
    if (data.job.toLowerCase() == "director") {
      directors.push(data);
    }
  });

  // Writes
  movieCredits.crew.map((data) => {
    if (data.job.toLowerCase() == "writer") {
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
        id: data.id,
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
      <MovieInfo movie={movie} />

      {/* Media Section */}
      <MovieMedia movie={movie} />

      <div className="flex flex-col">
        {/* Movie Tagline */}
        {movie.tagline !== "" ? <Paragraph text={movie.tagline} /> : ""}

        {/* Crew and Cast */}
        <div className="flex flex-col">
          {/* Directors */}
          {directors.length > 0 ? (
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
                    <Link
                      href={`/person/${director.id}`}
                      className="link link-hover text-[#0e63be]"
                    >
                      {director.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </InformationBlockMultiple>
          ) : (
            ""
          )}

          {/* Writers */}
          {writers.length > 0 ? (
            <InformationBlockMultiple
              data={writers}
              keyPlural={"Writers"}
              keySingular={"Writer"}
            >
              <ul className="flex gap-6 flex-wrap">
                {writers.map((data) => (
                  <li key={data.id} className="[&:nth-child(n+2)]:list-disc">
                    <Link
                      href={`/person/${data.id}`}
                      className="link link-hover text-[#0e63be]"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </InformationBlockMultiple>
          ) : (
            ""
          )}

          {/* Stars */}
          {starsSorted.length > 0 ? (
            <InformationBlockMultiple
              data={starsSorted}
              keyPlural={"Stars"}
              keySingular={"Star"}
            >
              <ul className="flex flex-wrap gap-6">
                {starsSorted.map((star) => (
                  <li key={star.id} className="[&:nth-child(n+2)]:list-disc">
                    <Link
                      href={`/person/${star.id}`}
                      className="link link-hover text-[#0e63be]"
                    >
                      {star.name}
                    </Link>
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
      <VideoGallery
        videos={movieVideos}
        videoListTitle={videoListTitle}
        sectionName={"Videos"}
      />

      {/* Image Gallery */}
      <ImageGallery backdrops={backdrops} />

      {/* Top Cast List */}
      <TopCastList topCast={topCast} />

      {/* Top Movie Suggestions */}
      <MoreLikeThis movies={topMovieSuggestions} />

      <div className="flex flex-col gap-4 sm:w-[60vw]">
        {/* Storyline */}
        <Storyline movie={movie} keywords={keywords.keywords} />

        {/* Details Section */}
        <DetailsSection movie={movie} />

        {/* Box Office*/}
        <BoxOffice revenue={movie.revenue} />
      </div>
    </div>
  );
}
