import Link from "next/link";
import Poster from "./poster";
import { MoviesProps } from "../app/actions/movie/definitions";

type AccordionProps = {
  movies: MoviesProps["movies"];
  listTitle: string;
};

export default function Accordion({ movies, listTitle }: AccordionProps) {
  return movies ? (
    <div className="collapse collapse-arrow bg-zinc-50 dark:bg-[#121212] rounded-xl p-4 shadow-xs">
      <input type="checkbox" />
      <div className="collapse-title">
        <ul className="list">
          <div className="flex gap-6 items-center text-lg font-medium text-zinc-900 dark:text-white">
            <li className="tracking-wide">
              {listTitle ? listTitle : "Movies Count"}
            </li>
            <li className="list-disc opacity-60">{movies.length}</li>
          </div>
        </ul>
      </div>
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
    </div>
  ) : (
    <p> No movies to display. </p>
  );
}
