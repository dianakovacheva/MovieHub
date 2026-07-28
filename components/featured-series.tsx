import { getTrendingSeriesToday } from "../app/actions/series/series-data";
import { toSeriesListItems } from "../app/actions/series/definitions";
import HeaderSection from "./movie-details/header-section";
import SeriesCarousel from "./series-carousel";

export default async function FeaturedSeries() {
  const trendingSeries = await getTrendingSeriesToday();
  const series = toSeriesListItems(trendingSeries);
  const sectionName = "Trending series today";

  return (
    <>
      <HeaderSection sectionName={sectionName} />
      {series.length > 0 && <SeriesCarousel series={series} />}
    </>
  );
}
