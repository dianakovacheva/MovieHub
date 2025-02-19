import Link from "next/link";
import HeaderSection from "./header-section";
import { SquareArrowOutUpRight } from "lucide-react";

export default function DetailsSection({ movie }) {
  const sectionName = "Details";

  if (!movie || movie.length === 0) {
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
          <span> No movie suggestions available. </span>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <HeaderSection sectionName={sectionName} data={0} />

      {/* Movie Release Date */}
      {movie.release_date ? (
        <>
          <div className="divider"></div>
          <p className="text-base">
            <span className="font-bold mr-2">Release date</span>
            {movie.release_date} (United States)
          </p>
        </>
      ) : (
        ""
      )}

      {/* Movie Origin Country */}
      {movie.origin_country ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            {movie.origin_country.length > 1 ? (
              <p className="text-base font-bold mr-4">Countries of origin</p>
            ) : (
              <p className="text-base font-bold mr-4">Country of origin</p>
            )}
            <ul className="flex gap-6">
              {movie.origin_country.map((counry) => (
                <li
                  key={counry}
                  className="[&:nth-child(n+2)]:list-disc color-red"
                >
                  {counry}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Movie Website */}
      {movie.homepage ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            <p className="text-base font-bold mr-2">Official site</p>
            <Link
              href={movie.homepage}
              className="flex items-end gap-2"
              target="_blank"
            >
              Official site <SquareArrowOutUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Languages */}
      {movie.spoken_languages ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            {movie.spoken_languages.length > 1 ? (
              <p className="text-base font-bold mr-4">Languages</p>
            ) : (
              <p className="text-base font-bold mr-4">Language</p>
            )}
            <ul className="flex gap-6">
              {movie.spoken_languages.map((language) => (
                <li
                  key={language.iso_639_1}
                  className="[&:nth-child(n+2)]:list-disc"
                >
                  {language.english_name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Also known as */}
      {movie.original_title ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            <p className="text-base font-bold mr-2">Also known as</p>
            {movie.original_title}
          </div>
        </>
      ) : (
        ">"
      )}

      {/* Filming Locations */}
      {movie.production_countries ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            {movie.production_countries.length > 1 ? (
              <p className="text-base font-bold mr-4">Filming locations</p>
            ) : (
              <p className="text-base font-bold mr-4">Filming location</p>
            )}
            <ul className="flex gap-6">
              {movie.production_countries.map((counry) => (
                <li
                  key={counry.iso_3166_1}
                  className="[&:nth-child(n+2)]:list-disc"
                >
                  {counry.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Production Companies */}
      {movie.production_companies ? (
        <>
          <div className="divider"></div>
          <div className="flex items-center">
            {movie.production_companies.length > 1 ? (
              <p className="text-base font-bold mr-4">Production companies</p>
            ) : (
              <p className="text-base font-bold mr-4">Production company</p>
            )}
            <ul className="flex flex-wrap gap-6">
              {movie.production_companies.map((company) => (
                <li key={company.id} className="[&:nth-child(n+2)]:list-disc">
                  {company.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
