import { Metadata } from "next";

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
import ImageGallery from "../../../../components/image-gallery";
import VideoGallery from "../../../../components/video-gallery";
import TopCastList from "../../../../components/movie-details/top-cast-list";
import DetailsSection from "../../../../components/movie-details/details-section";
import Storyline from "../../../../components/movie-details/storyline";
import BoxOffice from "../../../../components/movie-details/box-office";
import Paragraph from "../../../../components/paragraph";
import InformationBlock from "../../../../components/information-block";
import MoreLikeThis from "../../../../components/movie-details/more-like-this";
import {
  MovieCreditsResponse,
  MovieSuggestionsResponse,
} from "../../../actions/movie/types";
import UnorderedList from "../../../../components/unordered-list";

export const metadata: Metadata = {
  title: "Details Page",
};

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const movie = await getMovieDetails(id);
  const movieCredits = await getMovieCredits(id);
  let backdrops = await getMovieBackdrops(id);
  const movieVideos = await getMovieVideos(id);
  const movieSuggestions = await getMovieSuggestions(id);
  const keywords = await getMovieKeywords(id);
  const directors: MovieCreditsResponse["crew"] = [];
  const writers: MovieCreditsResponse["crew"] = [];
  const cast: MovieCreditsResponse["cast"] = [];
  let topMovieSuggestions: MovieSuggestionsResponse["results"];
  const videoListTitle: string = "Videos List";
  const sectionName: string = "Videos";

  if (movieCredits?.crew) {
    movieCredits.crew.forEach((data) => {
      // Directors
      if (data.job?.toLowerCase() == "director") {
        directors.push(data);
        // Writes
      } else if (data.job?.toLowerCase() == "writer") {
        writers.push(data);
      }
    });
  }

  if (movieCredits?.cast) {
    movieCredits.cast.forEach((data) => {
      if (data.known_for_department !== undefined) {
        if (
          data.known_for_department?.toLowerCase() == "acting" &&
          data.popularity
        ) {
          cast.push(data);
        }
      }
    });
  }

  const topCast = cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  const topThreeCast = topCast.slice(0, 3);

  // Movie Suggestions
  if (movieSuggestions) {
    topMovieSuggestions = [...movieSuggestions].sort(
      (a, b) => b.popularity - a.popularity
    );
    // .slice(0, 12);
  }

  // Add movie's title to the backdrops
  if (movie && backdrops) {
    backdrops = backdrops.map((image) => ({
      ...image,
      name: movie.title,
    }));
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Movie Info */}
      {movie && <MovieInfo movie={movie} />}

      {/* Media Section */}
      {movie && <MovieMedia movie={movie} />}

      <div className="flex flex-col">
        {/* Movie Tagline */}
        {movie && movie.tagline !== "" && movie.tagline !== undefined && (
          <Paragraph text={movie.tagline} />
        )}

        {/* Crew and Cast */}
        <div className="flex flex-col">
          {/* Directors */}
          {directors.length > 0 && (
            <InformationBlock
              blockName={directors.length > 1 ? "Directors" : "Director"}
            >
              <UnorderedList data={directors} path="/person" />
            </InformationBlock>
          )}

          {/* Writers */}
          {writers && writers.length > 0 && (
            <InformationBlock
              blockName={writers.length > 1 ? "Writers" : "Writer"}
            >
              <UnorderedList data={writers} path={"/person"} />
            </InformationBlock>
          )}

          {/* Stars */}
          {topThreeCast && (
            <InformationBlock
              blockName={topThreeCast.length > 1 ? "Stars" : "Star"}
            >
              <UnorderedList data={topThreeCast} path={"/person"} />
            </InformationBlock>
          )}
        </div>
      </div>

      {/* Video Gallery */}
      {movieVideos && videoListTitle && (
        <VideoGallery
          videos={movieVideos}
          videoListTitle={videoListTitle}
          sectionName={sectionName}
        />
      )}

      {/* Image Gallery */}
      {backdrops && <ImageGallery backdrops={backdrops} />}

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
