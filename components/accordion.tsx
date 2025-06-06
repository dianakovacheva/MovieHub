import { MoviesProps } from "../app/actions/movie/definitions";
import AccordionBody from "./accordion-body";

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
      <AccordionBody movies={movies} />
    </div>
  ) : (
    <p> No movies to display. </p>
  );
}
