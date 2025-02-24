import InformationBlockSingle from "../informatio-block-single";
import InformationBlockMultiple from "../information-block-multiple";
import Paragraph from "../paragraph";
import HeaderSection from "./header-section";
import Keywords from "./keywords";
import MovieGenres from "./movie-genres";

export default function Storyline({ movie, keywords }) {
  const sectionName: string = "Storyline";

  return movie ? (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:w-[60vw]">
        <HeaderSection sectionName={sectionName} data={undefined} />
        {movie.overview !== "" ? <Paragraph text={movie.overview} /> : ""}
      </div>

      {keywords ? <Keywords keywords={keywords} /> : ""}

      <div className="flex flex-col sm:w-[60vw]">
        {/* Taglines */}
        {movie.tagline !== "" ? (
          <InformationBlockSingle title={"Taglines"} data={movie.tagline} />
        ) : (
          ""
        )}

        {/* Genres */}
        {movie.genres.length > 0 ? (
          <InformationBlockMultiple
            data={movie.genres}
            keyPlural={"Genres"}
            keySingular={"Genre"}
          >
            <MovieGenres movieGenres={movie.genres} />
          </InformationBlockMultiple>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <p> No movie overview available. </p>
  );
}
