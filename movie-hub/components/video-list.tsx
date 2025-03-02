import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import youtubeURL from "../app/actions/API-URLS/youtube-API-URL";

export default function VideoList({
  videoListTitle,
  videos,
  handlePrevious,
  handleNext,
  selectedVideo,
  setSelectedVideo,
  currentIndex,
  setCurrentIndex,
  player,
}) {
  return videos.length > 0 ? (
    <div className="lg:col-span-1">
      <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium text-zinc-900 dark:text-white">
            {videoListTitle}
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
              disabled={currentIndex === videos.length - 1}
              className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {videos.map((video, index) => (
            <div
              video={video}
              key={video["id"]}
              className={`group flex gap-3 p-2 rounded-lg cursor-pointer transition-colors
                  ${
                    selectedVideo.key == video["key"]
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
                {video["key"] ? (
                  <Image
                    src={`${youtubeURL}${video["key"]}/hqdefault.jpg`}
                    width={100}
                    height={100}
                    alt={video["name"]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={`${youtubeURL}${video["key"]}/hqdefault.jpg`}
                    width={100}
                    height={100}
                    alt={"Movie video"}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                  <Play size={20} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col">
                  {video["movie_title"] ? (
                    <h5 className="text-sm font-bold text-zinc-500 dark:text-[#c0bcbc] uppercase line-clamp-2">
                      {video["movie_title"]}
                    </h5>
                  ) : (
                    ""
                  )}

                  <h5 className="font-medium text-sm text-zinc-900 dark:text-white line-clamp-2">
                    {video["name"]}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    " No videos to display. "
  );
}
