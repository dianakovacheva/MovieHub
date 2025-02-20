import Link from "next/link";
import HeaderSection from "./header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import InformationBlockMultiple from "../information-block-multiple";

export default function DetailsSection({ movie }) {
  const sectionName = "Details";

  if (!movie || movie.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={undefined} />
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
    <div className="flex flex-col sm:w-[60vw]">
      <HeaderSection sectionName={sectionName} data={undefined} />

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
        <InformationBlockMultiple
          data={movie.origin_country}
          keyPlural={"Countries of origin"}
          keySingular={"Country of origin"}
        >
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
        </InformationBlockMultiple>
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
        <InformationBlockMultiple
          data={movie.spoken_languages}
          keyPlural={"Languages"}
          keySingular={"Language"}
        >
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
        </InformationBlockMultiple>
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
        <InformationBlockMultiple
          data={movie.production_countries}
          keyPlural={"Filming locations"}
          keySingular={"Filming location"}
        >
          <ul className="flex flex-wrap gap-6">
            {movie.production_countries.map((counry) => (
              <li
                key={counry.iso_3166_1}
                className="[&:nth-child(n+2)]:list-disc"
              >
                {counry.name}
              </li>
            ))}
          </ul>
        </InformationBlockMultiple>
      ) : (
        ""
      )}

      {/* Production Companies */}
      {movie.production_companies ? (
        <InformationBlockMultiple
          data={movie.production_companies}
          keyPlural={"Production companies"}
          keySingular={"Production company"}
        >
          <ul className="flex flex-wrap gap-6 md:mt-6">
            {movie.production_companies.map((company) => (
              <li key={company.id} className="[&:nth-child(n+2)]:list-disc">
                {company.name}
              </li>
            ))}
          </ul>
        </InformationBlockMultiple>
      ) : (
        ""
      )}
    </div>
  );
}
