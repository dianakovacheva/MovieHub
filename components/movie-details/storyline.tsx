import { MovieDetailsResponse } from "../../app/actions/movie/types";
import InformationBlock from "../information-block";
import Paragraph from "../paragraph";
import HeaderSection from "./header-section";
import Keywords from "./keywords";
import MovieGenres from "./movie-genres";

export default function Storyline({
  movie,
  keywords,
}: {
  movie: MovieDetailsResponse;
  keywords: { id: number; name?: string }[];
}) {
  const sectionName: string = "Storyline";

  return (
    <div className="flex flex-col gap-2">
      <HeaderSection sectionName={sectionName} />

      {movie.overview && movie.overview !== "" ? (
        <Paragraph text={movie.overview} />
      ) : (
        <p> No movie overview available. </p>
      )}

      {keywords && <Keywords keywords={keywords} />}

      <div>
        {/* Taglines */}
        {movie.tagline && movie.tagline !== "" && (
          <InformationBlock blockName="Taglines">
            {movie.tagline}
          </InformationBlock>
        )}

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <InformationBlock
            blockName={movie.genres.length > 1 ? "Genres" : "Genre"}
          >
            <MovieGenres movieGenres={movie.genres} />
          </InformationBlock>
        )}
      </div>
    </div>
  );
}
