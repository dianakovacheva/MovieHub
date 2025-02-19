import SubtitleMovie from "./subtitle-movie";
import Title from "./title";

export default async function MovieInfo({ movie }) {
  return movie ? (
    <div className="flex items-start justify-between w-full">
      {/* Movie Info Left Side */}
      <div className="flex flex-col gap-2 md:gap-0">
        <Title name={movie.title} />
        <SubtitleMovie movie={movie} />
      </div>

      {/* Movie Info Right Side */}
      <div className="right-side flex gap-10 items-start hidden sm:flex">
        {/* Rating Info */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            VIEWERS RATING
          </p>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
              color="#f5c518"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            {/* Rating */}
            <div>
              <div className="flex items-center gap-1">
                {movie.vote_average ? (
                  <p className="text-xl font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </p>
                ) : (
                  <p className="text-xl font-semibold">0</p>
                )}

                <span className="text-base font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  / 10
                </span>
              </div>
              {movie.vote_count ? (
                <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  {movie.vote_count}
                </p>
              ) : (
                <p className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                  0
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Your Rating */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 dark:text-[#c0bcbc] text-xs font-bold">
            YOUR RATING
          </p>
          <button className="btn-ghost text-[#5799ef]">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              <p className="text-2xl">Rate</p>
            </div>
          </button>
        </div>

        {/* Popularity Info */}
        {/* <div className="flex flex-col gap-2">
          <p className="text-[#c0bcbc] text-xs font-bold">POPULARITY</p>
          <p className="font-bold text-2xl">{movie.popularity.toFixed(2)}</p>
        </div> */}
      </div>
    </div>
  ) : (
    <p> No movie info to display yet. </p>
  );
}
