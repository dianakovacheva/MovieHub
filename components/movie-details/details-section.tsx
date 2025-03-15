import Link from "next/link";
import HeaderSection from "./header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import InformationBlockMultiple from "../information-block-multiple";
import InformationBlockSingle from "../informatio-block-single";

export default function DetailsSection({ movie }) {
  const sectionName: string = "Details";

  return (
    <div>
      <HeaderSection sectionName={sectionName} count={undefined} />

      {/* Movie Release Date */}
      {movie.release_date !== "" ? (
        <InformationBlockSingle
          title={"Release date"}
          data={`${movie.release_date} (United States)`}
        />
      ) : (
        ""
      )}

      {/* Movie Origin Country */}
      {movie.origin_country.length > 0 ? (
        <InformationBlockMultiple
          data={movie.origin_country}
          keyPlural={"Countries of origin"}
          keySingular={"Country of origin"}
        >
          <ul className="flex gap-6">
            {movie.origin_country.map((counry) => (
              <li key={counry} className="[&:nth-child(n+2)]:list-disc">
                {counry}
              </li>
            ))}
          </ul>
        </InformationBlockMultiple>
      ) : (
        ""
      )}

      {/* Movie Website */}
      {movie.homepage !== "" ? (
        <InformationBlockSingle
          title={"Official site"}
          data={
            <Link
              href={movie.homepage}
              className="flex items-end gap-2"
              target="_blank"
              rel="nofollow"
            >
              Official site <SquareArrowOutUpRight size={16} strokeWidth={2} />
            </Link>
          }
        />
      ) : (
        ""
      )}

      {/* Languages */}
      {movie.spoken_languages.length > 0 ? (
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
      {movie.original_title !== "" ? (
        <InformationBlockSingle
          title={"Also known as"}
          data={movie.original_title}
        />
      ) : (
        ""
      )}

      {/* Filming Locations */}
      {movie.production_countries.length > 0 ? (
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
      {movie.production_companies.length > 0 ? (
        <InformationBlockMultiple
          data={movie.production_companies}
          keyPlural={"Production companies"}
          keySingular={"Production company"}
        >
          <ul className="flex flex-wrap gap-6 mt-2 md:mt-0">
            {movie.production_companies.map((company) => (
              <li
                key={company.id}
                className="[&:nth-child(n+2)]:list-disc items-center"
              >
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
