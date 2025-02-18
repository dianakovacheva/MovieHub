import Image from "next/image";
import moviePosterURL from "../../app/actions/movies/image-API-URL";
import HeaderSection from "./header-section";

export default function TopCastList({ topCast }) {
  const sectionName = "Top Cast";

  if (!topCast || topCast.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={0} />
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span> No cast available. </span>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} data={topCast} />

      <div className="grid xl:grid-cols-3">
        <ul
          role="list"
          className="grid gap-x-24 gap-y-5 sm:grid-cols-2  xl:col-span-2"
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
