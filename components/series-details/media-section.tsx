import { Suspense } from "react";
import Video from "../video";
import { getSeriesVideos } from "../../app/actions/series/series-data";
import Poster from "../poster";
import { SeriesDetailsResponse } from "../../app/actions/series/types";

export default async function SeriesMedia({
  series,
}: {
  series: SeriesDetailsResponse;
}) {
  const seriesVideos = await getSeriesVideos(series.id);
  let seriesKey: string = "";

  // Get trailer key
  if (seriesVideos) {
    seriesVideos.map((video) => {
      if (video.type?.toLowerCase() === "trailer" && video.key) {
        seriesKey = video.key;
      }
    });
  }

  return (
    series && (
      <div className="flex flex-col-reverse md:flex-row w-full gap-2 mb-2">
        <Poster
          alt={series.name}
          path={series.poster_path}
          height={0}
          width={500}
          style={undefined}
          isMovie={true}
        />

        {/* Trailer Video */}
        <Suspense fallback={<p>Loading video...</p>}>
          <Video videoId={seriesKey} onReady={undefined} />
        </Suspense>
      </div>
    )
  );
}
