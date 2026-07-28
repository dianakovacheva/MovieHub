import { getTopRatedSeries } from "../app/actions/series/series-data";
import { toSeriesListItems } from "../app/actions/series/definitions";
import HeaderSection from "./movie-details/header-section";
import SeriesCarousel from "./series-carousel";

export default async function TopRatedSeries() {
  const topRatedSeries = await getTopRatedSeries();
  const series = toSeriesListItems(topRatedSeries);
  const sectionName = "Top rated series";

  return (
    <>
      <HeaderSection sectionName={sectionName} />
      {series.length > 0 && <SeriesCarousel series={series} />}
    </>
  );
}
