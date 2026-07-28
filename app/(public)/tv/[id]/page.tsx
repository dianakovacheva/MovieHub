import { Metadata } from "next";

import {
  getSeriesDetails,
  getSeriesCredits,
  getSeriesBackdrops,
  getSeriesVideos,
  getSeriesSuggestions,
  getSeriesKeywords,
} from "../../../actions/series/series-data";

import SeriesInfo from "../../../../components/series-details/series-info";
import SeriesMedia from "../../../../components/series-details/media-section";
import ImageGallery from "../../../../components/image-gallery";
import VideoGallery from "../../../../components/video-gallery";
import TopCastList from "../../../../components/movie-details/top-cast-list";
import SeriesDetailsSection from "../../../../components/series-details/details-section";
import StorylineSeries from "../../../../components/series-details/storyline-series";
import Paragraph from "../../../../components/paragraph";
import InformationBlock from "../../../../components/information-block";
import MoreLikeThisSeries from "../../../../components/series-details/more-like-this-series";
import { SeriesCreditsResponse } from "../../../actions/series/types";
import HorizontalList from "../../../../components/horizontal-list";
import { notFound } from "next/navigation";
import { isInWatchlist } from "../../../actions/watchlist/watchlist-data";
import CommentSection from "../../../../components/comments/comment-section";
import { getComments } from "../../../actions/comment/comment-data";
import { getUserSession } from "../../../actions/user/user-data";
import { toSeriesListItems } from "../../../actions/series/definitions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seriesId = id.split("-")[0] ?? id;
  const series = await getSeriesDetails(seriesId);

  return {
    title: series?.name ? `${series.name} - MovieHub` : "Series Details",
  };
}

export default async function SeriesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // URLs include a slug (e.g. "1399-game-of-thrones"); the numeric prefix is the TMDB id
  const seriesId = id.split("-")[0] ?? id;

  const series = await getSeriesDetails(seriesId);
  const seriesCredits = await getSeriesCredits(seriesId);
  let backdrops = await getSeriesBackdrops(seriesId);
  const seriesVideos = await getSeriesVideos(seriesId);
  const seriesSuggestions = await getSeriesSuggestions(seriesId);
  const keywords = await getSeriesKeywords(seriesId);
  const inWatchlist = await isInWatchlist(`tv-${seriesId}`);
  const currentUser = await getUserSession();
  const comments = await getComments(`tv-${seriesId}`);

  const cast: SeriesCreditsResponse["cast"] = [];
  const videoListTitle: string = "Videos List";
  const sectionName: string = "Videos";

  if (!series) {
    notFound();
  }

  // Creators (TV equivalent of directors/writers)
  const creators =
    series.created_by?.map((creator) => ({
      id: creator.id ?? 0,
      name: creator.name,
    })) ?? [];

  if (seriesCredits?.cast) {
    seriesCredits.cast.forEach((data) => {
      if (
        data.known_for_department?.toLowerCase() === "acting" &&
        data.popularity
      ) {
        cast.push(data);
      }
    });
  }

  const topCast = cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  const topThreeCast = topCast.slice(0, 3);

  // Similar series
  const topSeriesSuggestions = toSeriesListItems(
    seriesSuggestions
      ? [...seriesSuggestions].sort((a, b) => b.popularity - a.popularity)
      : [],
  );

  // Add the series name to the backdrops
  if (series && backdrops) {
    backdrops = backdrops.map((image) => ({
      ...image,
      name: series.name,
    }));
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Series Info */}
      {series && <SeriesInfo series={series} inWatchlist={inWatchlist} />}

      {/* Media Section */}
      {series && <SeriesMedia series={series} />}

      <div className="flex flex-col">
        {/* Series Tagline */}
        {series && series.tagline !== "" && series.tagline !== undefined && (
          <Paragraph text={series.tagline} />
        )}

        {/* Creators & Stars */}
        <div className="flex flex-col">
          {creators.length > 0 && (
            <InformationBlock
              blockName={creators.length > 1 ? "Creators" : "Creator"}
            >
              <HorizontalList data={creators} path="/person" />
            </InformationBlock>
          )}

          {topThreeCast.length > 0 && (
            <InformationBlock
              blockName={topThreeCast.length > 1 ? "Stars" : "Star"}
            >
              <HorizontalList data={topThreeCast} path={"/person"} />
            </InformationBlock>
          )}
        </div>
      </div>

      {/* Video Gallery */}
      {seriesVideos && videoListTitle && (
        <VideoGallery
          videos={seriesVideos}
          videoListTitle={videoListTitle}
          sectionName={sectionName}
        />
      )}

      {/* Image Gallery */}
      {backdrops && <ImageGallery backdrops={backdrops} />}

      {/* Top Cast List */}
      {topCast.length > 0 && <TopCastList topCast={topCast} />}

      {/* More like this */}
      {topSeriesSuggestions.length > 0 && (
        <MoreLikeThisSeries series={topSeriesSuggestions} />
      )}

      <div className="flex flex-col gap-4 sm:w-[60vw]">
        {/* Storyline */}
        {series && keywords && (
          <StorylineSeries series={series} keywords={keywords} />
        )}

        {/* Details Section */}
        {series && <SeriesDetailsSection series={series} />}
      </div>

      {/* Comments */}
      <CommentSection
        movieId={`tv-${seriesId}`}
        comments={comments ?? []}
        currentUserId={currentUser?.id ?? null}
      />
    </div>
  );
}
