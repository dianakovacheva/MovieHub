import Link from "next/link";
import HeaderSection from "../movie-details/header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import InformationBlock from "../information-block";
import HorizontalList from "../horizontal-list";
import { SeriesDetailsResponse } from "../../app/actions/series/types";

export default function SeriesDetailsSection({
  series,
}: {
  series: SeriesDetailsResponse;
}) {
  const sectionName: string = "Details";

  const spokenLanguages =
    series.spoken_languages &&
    series.spoken_languages.map((language) => ({
      id: language.iso_639_1 ? language.iso_639_1 : "",
      name: language.english_name ? language.english_name : "",
    }));

  const networks =
    series.networks &&
    series.networks.map((network) => ({
      id: network.id ? network.id.toString() : "",
      name: network.name ? network.name : "",
    }));

  return (
    series && (
      <div>
        <HeaderSection sectionName={sectionName} />

        {/* First air date */}
        {series.first_air_date && series.first_air_date !== "" && (
          <InformationBlock blockName="First air date">
            {series.first_air_date}
          </InformationBlock>
        )}

        {/* Last air date */}
        {series.last_air_date && series.last_air_date !== "" && (
          <InformationBlock blockName="Last air date">
            {series.last_air_date}
          </InformationBlock>
        )}

        {/* Status */}
        {series.status && series.status !== "" && (
          <InformationBlock blockName="Status">
            {series.status}
          </InformationBlock>
        )}

        {/* Seasons & episodes */}
        {series.number_of_seasons ? (
          <InformationBlock blockName="Seasons">
            {`${series.number_of_seasons} ${
              series.number_of_seasons > 1 ? "seasons" : "season"
            }${
              series.number_of_episodes
                ? ` · ${series.number_of_episodes} episodes`
                : ""
            }`}
          </InformationBlock>
        ) : (
          ""
        )}

        {/* Networks */}
        {networks && networks.length > 0 && (
          <InformationBlock
            blockName={networks.length > 1 ? "Networks" : "Network"}
          >
            <HorizontalList data={networks} />
          </InformationBlock>
        )}

        {/* Website */}
        {series.homepage && series.homepage !== "" && (
          <InformationBlock blockName="Official site">
            <Link
              href={series.homepage}
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
        {series.original_name && series.original_name !== "" && (
          <InformationBlock blockName="Also known as">
            {series.original_name}
          </InformationBlock>
        )}

        {/* Production Companies */}
        {series.production_companies &&
          series.production_companies.length > 0 && (
            <InformationBlock
              blockName={
                series.production_companies.length > 1
                  ? "Production companies"
                  : "Production company"
              }
            >
              <HorizontalList data={series.production_companies} />
            </InformationBlock>
          )}
      </div>
    )
  );
}
