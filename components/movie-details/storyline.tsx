import InformationBlock from "../information-block";
import Paragraph from "../paragraph";
import HeaderSection from "./header-section";
import Keywords from "./keywords";
import MovieGenres from "./movie-genres";

export default function Storyline({ movie, keywords }) {
  const sectionName: string = "Storyline";

  return movie ? (
    <div className="flex flex-col gap-2">
      {movie.overview && (
        <HeaderSection sectionName={sectionName} count={undefined} />
      )}

      {movie.overview !== "" && <Paragraph text={movie.overview} />}

      {keywords && <Keywords keywords={keywords} />}

      <div>
        {/* Taglines */}
        {movie.tagline !== "" && (
          <InformationBlock blockName="Taglines">
            {movie.tagline}
          </InformationBlock>
        )}

        {/* Genres */}
        {movie.genres.length > 0 && (
          <InformationBlock
            blockName={movie.genres.length > 1 ? "Genres" : "Genre"}
          >
            <MovieGenres movieGenres={movie.genres} />
          </InformationBlock>
        )}
      </div>
    </div>
  ) : (
    <p> No movie overview available. </p>
  );
}
