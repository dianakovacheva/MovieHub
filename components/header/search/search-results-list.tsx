import Link from "next/link";
import { ReactNode } from "react";
import Poster from "../../poster";

export default function SearchResultsList({
  results,
  searchType,
}: {
  results?: {
    id: number;
    media_type?: string;
    name?: ReactNode;
    title?: string;
    release_date?: string;
    known_for_department?: string;
    poster_path?: string;
    profile_path?: string;
  }[];
  searchType: string;
}) {
  if (!results || results?.length === 0) return null;

  return (
    <ul
      tabIndex={0}
      className="dropdown-content list absolute join-item z-1 join-item p-2 mt-4 max-h-[60vh] w-[30vw] overflow-scroll bg-zinc-50 dark:bg-[#121212] rounded-box shadow-md flex gap-4"
    >
      {results.map((result) => {
        return (
          <Link
            key={result.id}
            href={
              searchType == "multi"
                ? result.media_type === "person" || result.known_for_department
                  ? `/person/${result.id}`
                  : `/movie/${result.id}`
                : `/${searchType}/${result.id}`
            }
          >
            <li className="list-row hover:bg-zinc-300 dark:hover:bg-zinc-700">
              <div className="flex-none">
                <Poster
                  name={result.title ? result.title : result.name?.toString()}
                  path={
                    result.poster_path
                      ? result.poster_path
                      : result.profile_path
                  }
                  height={200}
                  width={250}
                  className="rounded-lg object-cover shadow-sm w-15 h-25"
                  isMovie={true}
                />
              </div>
              <div>
                <div className="text-base font-bold">
                  {result.title ? result.title : result.name}
                  {searchType === "multi" &&
                    result.media_type &&
                    (result.media_type === "movie" ? " (Movie)" : " (Person)")}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {result.known_for_department
                    ? result.known_for_department
                    : result.release_date}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
