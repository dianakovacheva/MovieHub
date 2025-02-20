import InformationBlockMultiple from "../information-block-multiple";
import Paragraph from "../paragraph";
import HeaderSection from "./header-section";
import Keywords from "./keywords";
import MovieGenres from "./movie-genres";

export default function Storyline({ movie, keywords }) {
  const sectionName = "Storyline";

  if (!movie || movie.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={undefined} />
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span> No movie overview available. </span>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:w-[60vw]">
        <HeaderSection sectionName={sectionName} data={undefined} />
        {movie.overview ? <Paragraph text={movie.overview} /> : ""}
      </div>

      {keywords ? <Keywords keywords={keywords} /> : ""}

      <div className="flex flex-col sm:w-[60vw]">
        {/* Taglines */}
        {movie.tagline ? (
          <>
            <div className="divider"></div>
            <div className="flex items-center flex-wrap gap-6 sm:gap-0">
              <p className="text-base font-bold mr-2">Taglines</p>
              <span className="text-base/6"> {movie.tagline} </span>
            </div>
          </>
        ) : (
          ""
        )}

        {/* Genres */}
        {movie.genres ? (
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
  );
}
