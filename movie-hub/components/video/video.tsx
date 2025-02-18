"use client";

import React from "react";
import YouTube from "react-youtube";

export default function Video({ videoId }) {
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
    videoId && (
      // <div className="relative w-full pt-[56.25%] m-0">
      //   <div className="absolute inset-0">
      //     <YouTube
      //       opts={opts}
      //       className="h-full w-full md:h-[60%] md:w-[80%] rounded-box overflow-hidden"
      //       videoId={videoId}
      //     />
      //   </div>
      // </div>
      <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      </div>
    )
  );
}
