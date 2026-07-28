import Link from "next/link";
import Poster from "./poster";

type ActorsGalleryProps = {
  actors: {
    adult: boolean;
    gender: number;
    id: number;
    known_for?: {
      adult: boolean;
      backdrop_path?: string;
      genre_ids?: number[];
      id: number;
      media_type?: string;
      original_language?: string;
      original_title?: string;
      overview?: string;
      poster_path?: string;
      release_date?: string;
      title?: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    known_for_department?: string;
    name?: string;
    popularity: number;
    profile_path?: string;
    character?: string;
  }[];
};

export default function ActorsGallery({ actors }: ActorsGalleryProps) {
  return (
    <ul
      role="list"
      className="grid gap-x-24 gap-y-5 sm:grid-cols-2 xl:col-span-2"
    >
      {actors.map(
        (person) =>
          person.name && (
            <Link
              href={`/person/${person.id}-${person.name
                .split(" ")
                .join("-")
                .toLowerCase()}`}
              key={person.id}
              className="flex-none"
            >
              <li>
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-3 group">
                    <div className="avatar">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full mask mask-squircle shadow-sm">
                        <Poster
                          alt={person.name}
                          path={person.profile_path}
                          height={150}
                          width={150}
                          style="h-full w-full object-cover"
                          isMovie={false}
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold transition-colors duration-200 group-hover:text-zinc-500 dark:group-hover:text-zinc-400">
                        {person.name}
                      </div>
                      {person.character && (
                        <div className="text-xs font-normal text-zinc-500 transition-colors duration-200 group-hover:text-zinc-500 dark:text-[#c0bcbc] dark:group-hover:text-zinc-400">
                          {person.character}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          )
      )}
    </ul>
  );
}
