import Link from "next/link";
import Poster from "./poster";

export default function ActorsGallery({ actors }) {
  return (
    <ul
      role="list"
      className="grid gap-x-24 gap-y-5 sm:grid-cols-2 xl:col-span-2"
    >
      {actors.map((person) => (
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
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="rounded-full mask mask-squircle h-24 w-24 shadow-sm">
                    <Poster
                      data={person}
                      path={person.profile_path}
                      height={150}
                      width={150}
                      className={undefined}
                      isMovie={false}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{person.name}</div>
                  <div className="text-xs font-normal text-zinc-500 dark:text-[#c0bcbc]">
                    {person.character}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
