import Image from "next/image";
import posterURL from "../../app/actions/API-URLS/image-API-URL";
import HeaderSection from "./header-section";
import Link from "next/link";

export default function TopCastList({ topCast }) {
  const sectionName: string = "Top Cast";

  return topCast.length > 0 ? (
    <>
      <HeaderSection sectionName={sectionName} data={topCast} />

      <div className="grid xl:grid-cols-3">
        <ul
          role="list"
          className="grid gap-x-24 gap-y-5 sm:grid-cols-2 xl:col-span-2"
        >
          {topCast.map((person) => (
            <Link
              href={`/person/${person.id}-${person.name
                .split(" ")
                .join("-")
                .toLowerCase()}`}
              key={person.id}
              className="flex-none"
            >
              <li key={person.id}>
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-full mask mask-squircle h-24 w-24 shadow-sm">
                        {!person.profile_path ? (
                          <Image
                            src="/default-avatar-profile-icon.jpg"
                            alt={person.name}
                            width={150}
                            height={150}
                          />
                        ) : (
                          <Image
                            src={`${posterURL}${person.profile_path}`}
                            alt={person.name}
                            width={100}
                            height={100}
                          />
                        )}
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
      </div>
    </>
  ) : (
    <p> No cast available. </p>
  );
}
