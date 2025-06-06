import Link from "next/link";
import Poster from "./poster";
import { MoviesProps } from "../app/actions/movie/definitions";

type AccordionBodyProps = {
  movies: MoviesProps["movies"];
};

export default async function AccordionBody({ movies }: AccordionBodyProps) {
  return (
    <div className="collapse-content font-semibold text-zinc-900 dark:text-white">
      <ul key="movies_list" className="list max-h-[60vh] overflow-scroll">
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.title && (
              <Link
                href={`/movie/${movie.id}-${movie.title
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="flex-none"
              >
                <li className="list-row">
                  <div>
                    <Poster
                      alt={movie.title}
                      path={movie.poster_path}
                      height={200}
                      width={250}
                      style="rounded-lg object-cover shadow-sm w-15 h-25"
                      isMovie={true}
                    />
                  </div>
                  <div className="list-col-grow flex flex-col gap-2">
                    <div className="text-md font-bold">{movie.title}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {movie.character}
                    </div>
                  </div>
                  <div className="text-sm uppercase font-semibold opacity-60">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "-"}
                  </div>
                </li>
              </Link>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
