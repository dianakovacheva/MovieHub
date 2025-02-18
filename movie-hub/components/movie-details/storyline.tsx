import HeaderSection from "./header-section";
import Keywords from "./keywords";
import MovieGenres from "./movie-genres";

export default function Storyline({ movie, keywords }) {
  const sectionName = "Storyline";

  if (!movie || movie.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={0} />
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-[60vw]">
        <HeaderSection sectionName={sectionName} data={0} />
        <p className="text-base/6">{movie.overview}</p>
      </div>
      <div>
        <Keywords keywords={keywords} />
      </div>
      <div className="flex flex-col m-0 p-0">
        {/* Taglines */}
        <div className="divider"></div>
        <p className="text-base">
          <span className="font-bold mr-2">Taglines </span>
          {movie.tagline}
        </p>
        <div className="divider"></div>
        <p className="text-base">
          <span className="font-bold mr-2">Genres</span>
          <MovieGenres movieGenres={movie.genres} />
        </p>
      </div>
    </div>
  );
}
