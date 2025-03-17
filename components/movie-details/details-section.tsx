import Link from "next/link";
import HeaderSection from "./header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import InformationBlock from "../information-block";
import UnorderedList from "../unordered-list";

export default function DetailsSection({ movie }) {
  const sectionName: string = "Details";

  return (
    <div>
      <HeaderSection sectionName={sectionName} count={undefined} />

      {/* Movie Release Date */}
      {movie.release_date !== "" && (
        <InformationBlock blockName="Release date">{`${movie.release_date} (United States)`}</InformationBlock>
      )}

      {/* Movie Origin Country */}
      {movie.origin_country.length > 0 && (
        <InformationBlock
          blockName={
            movie.origin_country.length > 1
              ? "Countries of origin"
              : "Country of origin"
          }
        >
          <UnorderedList data={movie.origin_country} path={undefined} />
        </InformationBlock>
      )}

      {/* Movie Website */}
      {movie.homepage !== "" && (
        <InformationBlock blockName="Official site">
          <Link
            href={movie.homepage}
            className="flex items-end gap-2"
            target="_blank"
            rel="nofollow"
          >
            Official site <SquareArrowOutUpRight size={16} strokeWidth={2} />
          </Link>
        </InformationBlock>
      )}

      {/* Languages */}
      {movie.spoken_languages.length > 0 && (
        <InformationBlock
          blockName={
            movie.spoken_languages.length > 1 ? "Languages" : "Language"
          }
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
        </InformationBlock>
      )}

      {/* Also known as */}
      {movie.original_title !== "" && (
        <InformationBlock blockName="Also known as">
          {movie.original_title}
        </InformationBlock>
      )}

      {/* Filming Locations */}
      {movie.production_countries.length > 0 && (
        <InformationBlock
          blockName={
            movie.production_countries.length > 1
              ? "Filming locations"
              : "Filming location"
          }
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
        </InformationBlock>
      )}

      {/* Production Companies */}
      {movie.production_companies.length > 0 && (
        <InformationBlock
          blockName={
            movie.production_companies.length > 1
              ? "Production companies"
              : "Production company"
          }
        >
          <UnorderedList data={movie.production_companies} path={undefined} />
        </InformationBlock>
      )}
    </div>
  );
}
