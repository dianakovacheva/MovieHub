import { SeriesDetailsResponse } from "../../app/actions/series/types";
import InformationBlock from "../information-block";
import Paragraph from "../paragraph";
import HeaderSection from "../movie-details/header-section";
import Keywords from "../movie-details/keywords";
import MovieGenres from "../movie-details/movie-genres";

export default function StorylineSeries({
  series,
  keywords,
}: {
  series: SeriesDetailsResponse;
  keywords: { id: number; name?: string }[];
}) {
  const sectionName: string = "Storyline";

  return (
    <div className="flex flex-col gap-2">
      <HeaderSection sectionName={sectionName} />

      {series.overview && series.overview !== "" ? (
        <Paragraph text={series.overview} />
      ) : (
        <p> No series overview available. </p>
      )}

      {keywords && <Keywords keywords={keywords} />}

      <div>
        {/* Taglines */}
        {series.tagline && series.tagline !== "" && (
          <InformationBlock blockName="Taglines">
            {series.tagline}
          </InformationBlock>
        )}

        {/* Genres */}
        {series.genres && series.genres.length > 0 && (
          <InformationBlock
            blockName={series.genres.length > 1 ? "Genres" : "Genre"}
          >
            <MovieGenres movieGenres={series.genres} />
          </InformationBlock>
        )}
      </div>
    </div>
  );
}
