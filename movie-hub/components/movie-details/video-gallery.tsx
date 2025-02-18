"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import YouTube from "react-youtube";
import Image from "next/image";
import HeaderSection from "./header-section";

export default function VideoGallery({ videos }) {
  if (!videos.results || videos.results.length === 0) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>No videos available for this title.</span>
      </div>
    );
  }

  const sortedVideos = [...videos.results].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  const [selectedVideo, setSelectedVideo] = useState(sortedVideos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player, setPlayer] = useState(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 1,
    },
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedVideo(sortedVideos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < sortedVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedVideo(sortedVideos[currentIndex + 1]);
    }
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const sectionName = "Videos";

  return (
    <>
      <HeaderSection sectionName={sectionName} data={sortedVideos} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Player Section */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden">
            <YouTube
              videoId={selectedVideo.key}
              opts={opts}
              onReady={onReady}
              className="w-full h-full"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-medium dark:text-white">
              {selectedVideo.name}
            </h3>
            <p className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
              Video {currentIndex + 1} of {sortedVideos.length}
            </p>
          </div>
        </div>

        {/* Videos List Section */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-zinc-900 dark:text-white">
                Videos List
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                           hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === sortedVideos.length - 1}
                  className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                           hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {sortedVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`group flex gap-3 p-2 rounded-lg cursor-pointer transition-colors
                    ${
                      selectedVideo.key === video.key
                        ? "bg-zinc-200 dark:bg-zinc-800"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  onClick={() => {
                    setSelectedVideo(video);
                    setCurrentIndex(index);
                    if (player) {
                      player.pauseVideo();
                    }
                  }}
                >
                  <div className="relative flex-shrink-0 w-32 aspect-video rounded-md overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      width={100}
                      height={100}
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="font-medium text-sm text-zinc-900 dark:text-white line-clamp-2">
                      {video.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
