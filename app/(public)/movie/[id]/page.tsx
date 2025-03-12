import { Metadata } from "next";
import Link from "next/link";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieBackdrops,
  getMovieVideos,
  getMovieSuggestions,
  getMovieKeywords,
} from "../../../actions/movie/movie-data";

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
import {
  MovieCreditsResponse,
  MovieSuggestionsResponse,
} from "../../../actions/movie/types";

export const metadata: Metadata = {
  title: "Details Page",
};

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const movieCredits = await getMovieCredits(id);
  const backdrops = await getMovieBackdrops(movie!.id);
  const movieVideos = await getMovieVideos(movie!.id);
  const movieSuggestions = await getMovieSuggestions(movie!.id);
  const keywords = await getMovieKeywords(movie!.id);
  const directors: MovieCreditsResponse["crew"] = [];
  const writers: MovieCreditsResponse["crew"] = [];
  // const stars: { name: string; popularity: number; id: number }[] = [];
  const stars: MovieCreditsResponse["cast"] = [];
  const cast: MovieCreditsResponse["cast"] = [];
  let topMovieSuggestions: MovieSuggestionsResponse["results"];
  const videoListTitle = "Videos List";

  if (movieCredits?.crew) {
    movieCredits.crew.map((data) => {
      // Directors
      if (data.job && data.job.toLowerCase() == "director") {
        directors.push(data);
        // Writes
      } else if (data.job && data.job.toLowerCase() == "writer") {
        writers.push(data);
      }
    });
  }

  if (movieCredits?.cast) {
    movieCredits.cast.map((data) => {
      if (data.known_for_department !== undefined) {
        if (
          data.known_for_department.toLowerCase() == "acting" &&
          data.popularity
        ) {
          // Stars
          // stars.push({
          //   name: data.name,
          //   popularity: data.popularity,
          //   id: data.id,
          //   adult: false,
          //   gender: 0,
          //   cast_id: 0,
          //   order: 0,
          // });
          stars.push(data);
        } else if (
          data.known_for_department.toLowerCase() == "acting" &&
          data.popularity
        ) {
          cast.push(data);
        }
      }
    });
  }

  // Sort the stars array by popularity (descending order)
  const starsSorted = stars
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // Cast
  // movieCredits.cast.map((data) => {
  //   if (
  //     data.known_for_department.toLowerCase() == "acting" &&
  //     data.popularity
  //   ) {
  //     cast.push(data);
  //   }
  // });

  const topCast = cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10);

  // Movie Suggestions
  if (movieSuggestions?.results) {
    topMovieSuggestions = movieSuggestions.results
      .sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      )
      .slice(0, 12);
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Movie Info */}
      {movie && <MovieInfo movieData={movie} />}

      {/* Media Section */}
      {movie && <MovieMedia movieData={movie} />}

      <div className="flex flex-col">
        {/* Movie Tagline */}
        {movie && movie.tagline !== "" && movie.tagline !== undefined && (
          <Paragraph text={movie.tagline} />
        )}

        {/* Crew and Cast */}
        <div className="flex flex-col">
          {/* Directors */}
          {directors.length > 0 && (
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
          )}

          {/* Writers */}
          {writers.length > 0 && (
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
          )}

          {/* Stars */}
          {starsSorted.length > 0 && (
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
          )}
        </div>
      </div>

      {/* Video Gallery */}
      {movieVideos && videoListTitle && (
        <VideoGallery
          videos={movieVideos}
          videoListTitle={videoListTitle}
          sectionName={"Videos"}
        />
      )}

      {/* Image Gallery */}
      {backdrops && <ImageGallery backdropsData={backdrops} />}

      {/* Top Cast List */}
      {topCast && <TopCastList topCast={topCast} />}

      {/* Top Movie Suggestions */}
      {topMovieSuggestions && <MoreLikeThis movies={topMovieSuggestions} />}

      <div className="flex flex-col gap-4 sm:w-[60vw]">
        {/* Storyline */}
        {movie && keywords && <Storyline movie={movie} keywords={keywords} />}

        {/* Details Section */}
        {movie && <DetailsSection movie={movie} />}

        {/* Box Office*/}
        {movie && <BoxOffice revenue={movie.revenue} />}
      </div>
    </div>
  );
}
