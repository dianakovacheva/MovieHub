import HeaderSection from "../movie-details/header-section";
import SeriesCarousel from "../series-carousel";
import { SeriesProps } from "../../app/actions/series/definitions";

export default function MoreLikeThisSeries({ series }: SeriesProps) {
  const sectionName: string = "More like this";

  return (
    <>
      <HeaderSection sectionName={sectionName} />
      {series && <SeriesCarousel series={series} />}
    </>
  );
}
