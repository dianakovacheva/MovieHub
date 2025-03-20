"use client";

import React from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function Video({
  videoId,
  onReady,
}: {
  videoId: string;
  onReady?: (event: { target: YouTubePlayer }) => void | undefined;
}) {
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

  return (
    <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-sm">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="w-full h-full"
      />
    </div>
  );
}
