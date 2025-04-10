import Link from "next/link";
import HeaderSection from "./header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import InformationBlock from "../information-block";
import HorizontalList from "../horizontal-list";
import { MovieDetailsResponse } from "../../app/actions/movie/types";

export default function DetailsSection({
  movie,
}: {
  movie: MovieDetailsResponse;
}) {
  const sectionName: string = "Details";

  const productionCountries =
    movie.production_countries &&
    movie.production_countries.map((country) => ({
      id: country.iso_3166_1 ? country.iso_3166_1 : "",
      name: country.name ? country.name : "",
    }));

  const spokenLanguages =
    movie.spoken_languages &&
    movie.spoken_languages.map((language) => ({
      id: language.iso_639_1 ? language.iso_639_1 : "",
      name: language.english_name ? language.english_name : "",
    }));

  return (
    movie && (
      <div>
        <HeaderSection sectionName={sectionName} count={undefined} />

        {/* Movie Release Date */}
        {movie.release_date !== "" && (
          <InformationBlock blockName="Release date">{`${movie.release_date} (United States)`}</InformationBlock>
        )}

        {/* Movie Origin Country */}
        {productionCountries && productionCountries.length > 0 && (
          <InformationBlock
            blockName={
              productionCountries.length > 1
                ? "Countries of origin"
                : "Country of origin"
            }
          >
            <HorizontalList data={productionCountries} />
          </InformationBlock>
        )}

        {/* Movie Website */}
        {movie.homepage && movie.homepage !== "" && (
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
        {spokenLanguages && spokenLanguages.length > 0 && (
          <InformationBlock
            blockName={spokenLanguages.length > 1 ? "Languages" : "Language"}
          >
            <HorizontalList data={spokenLanguages} />
          </InformationBlock>
        )}

        {/* Also known as */}
        {movie.original_title && movie.original_title !== "" && (
          <InformationBlock blockName="Also known as">
            {movie.original_title}
          </InformationBlock>
        )}

        {/* Filming Locations */}
        {productionCountries && productionCountries.length > 0 && (
          <InformationBlock
            blockName={
              productionCountries.length > 1
                ? "Filming locations"
                : "Filming location"
            }
          >
            <HorizontalList data={productionCountries} />
          </InformationBlock>
        )}

        {/* Production Companies */}
        {movie.production_companies &&
          movie.production_companies.length > 0 && (
            <InformationBlock
              blockName={
                movie.production_companies.length > 1
                  ? "Production companies"
                  : "Production company"
              }
            >
              <HorizontalList data={movie.production_companies} />
            </InformationBlock>
          )}
      </div>
    )
  );
}
