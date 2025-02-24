import Image from "next/image";
import Link from "next/link";
import posterURL from "../app/actions/API-URLS/image-API-URL";

export default function Accordion({ movies, listTitle }) {
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
              <Link
                href={`/movie/${movie.id}-${movie.title
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="flex-none"
              >
                <li className="list-row">
                  <div>
                    {movie.poster_path ? (
                      <Image
                        src={`${posterURL}/${movie.poster_path}`}
                        alt={`${movie.title}'s poster`}
                        width={250}
                        height={200}
                        loading="lazy"
                        unoptimized={false}
                        className="rounded-lg object-cover shadow-sm w-15 h-25"
                      />
                    ) : (
                      <Image
                        src="/default-movie-image.jpg"
                        alt={`${movie.title}'s poster`}
                        width={250}
                        height={200}
                        loading="lazy"
                        unoptimized={false}
                        className="rounded-lg object-cover shadow-sm w-15 h-25"
                      />
                    )}
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
            </div>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p> No movies to display. </p>
  );
}
