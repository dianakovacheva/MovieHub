"use client";

import React, { useState } from "react";
import HeaderSection from "./movie-details/header-section";
import VideoList from "./video-list";
import Video from "./video";
import Link from "next/link";
import { VideoGalleryProps } from "../app/actions/videos/definitions";
import { YouTubePlayer } from "react-youtube";

export default function VideoGallery({
  videos,
  videoListTitle,
  sectionName,
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const videosCount: number = videos.length;

  const handlePrevious = () => {
    if (videos && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedVideo(videos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (videos && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedVideo(videos[currentIndex + 1]);
    }
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  };

  return (
    <>
      {sectionName && (
        <HeaderSection sectionName={sectionName} count={videosCount} />
      )}

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Main Player Section */}
          {selectedVideo && (
            <div className="lg:col-span-2">
              {selectedVideo.key && (
                <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden">
                  <Video videoId={selectedVideo.key} onReady={onReady} />
                </div>
              )}

              <div className="mt-4 space-y-2">
                <div className="flex gap-3">
                  {selectedVideo.movie_title && (
                    <Link
                      href={`/movie/${selectedVideo.movie_id}`}
                      className="flex-none"
                    >
                      <h3 className="text-xl font-bold text-zinc-500 dark:text-[#f5c518] uppercase line-clamp-2 hover:underline">
                        {selectedVideo.movie_title}
                      </h3>
                    </Link>
                  )}

                  <h3 className="text-xl font-medium dark:text-white">
                    {selectedVideo.name}
                  </h3>
                </div>
                {videosCount && videosCount > 0 && (
                  <p className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
                    Video {currentIndex + 1} of {videosCount}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Videos List Section */}
          {selectedVideo && (
            <VideoList
              videoListTitle={videoListTitle}
              videos={videos}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              currentIndex={currentIndex}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              setCurrentIndex={setCurrentIndex}
              player={player}
            />
          )}
        </div>
      ) : (
        <p> No videos available. </p>
      )}
    </>
  );
}
