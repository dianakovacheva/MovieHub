import Image from "next/image";
import moviePosterURL from "../../app/actions/movies/image-API-URL";
import HeaderSection from "./header-section";

export default function TopCastList({ topCast }) {
  const sectionName = "Top Cast";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={topCast} />
      <div className="grid xl:grid-cols-4">
        <ul
          role="list"
          className="grid gap-x-24 gap-y-12 sm:grid-cols-2  xl:col-span-2"
        >
          {topCast.map((person) => (
            <li key={person.id}>
              <div className="flex items-center gap-x-6">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="rounded-full mask mask-squircle h-24 w-24">
                      <Image
                        src={`${moviePosterURL}${person.profile_path}`}
                        alt={person.name}
                        width={100}
                        height={100}
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
          ))}
        </ul>
      </div>
    </>
  );
}
