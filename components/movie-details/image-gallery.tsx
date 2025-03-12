"use client";

import posterURL from "../../app/actions/API-URLS/image-API-URL";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeaderSection from "./header-section";
import Poster from "../poster";
import { MovieImagesResponse } from "../../app/actions/movie/types";

export default function ImageGallery({ backdropsData }) {
  const backdrops: MovieImagesResponse["backdrops"] = backdropsData;

  const sectionName: string = "Photos";
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  let sortedBackdrops: typeof backdrops;

  // Sort backdrops by vote_average to show best rated images first
  if (backdrops) {
    sortedBackdrops = backdrops.sort((a, b) => b.vote_average - a.vote_average);
  }

  const [selectedImage, setSelectedImage] = useState(
    sortedBackdrops && sortedBackdrops.length > 0 ? sortedBackdrops[0] : null
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (
      sortedBackdrops &&
      sortedBackdrops.length > 0 &&
      currentIndex !== null &&
      currentIndex > 0
    ) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(sortedBackdrops[currentIndex - 1] ?? selectedImage); // Fallback to current image
    }
  };

  const handleNext = () => {
    if (sortedBackdrops) {
      if (currentIndex < sortedBackdrops.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedImage(sortedBackdrops[currentIndex + 1]);
      }
    }
  };

  return (
    <>
      <HeaderSection sectionName={sectionName} data={sortedBackdrops} />

      {sortedBackdrops && sortedBackdrops.length > 0 ? (
        <>
          {/* Main Content */}
          <div className="flex flex-col">
            <div className="relative">
              <Poster
                data={sortedBackdrops}
                path={`${baseImageUrl}${selectedImage?.file_path}`}
                height={800}
                width={800}
                className={
                  "max-h-[80vh] w-full rounded-lg object-contain shadow-sm"
                }
                isMovie={false}
              />

              {/* Navigation arrows */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-2 text-white 
                     transition-colors hover:bg-black/40 disabled:opacity-50 dark:bg-black/50 dark:hover:bg-black/70"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === sortedBackdrops.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-2 text-white 
                     transition-colors hover:bg-black/40 disabled:opacity-50 dark:bg-black/50 dark:hover:bg-black/70"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Image metadata */}
            {selectedImage &&
              selectedImage !== undefined &&
              sectionName !== null && (
                <div className="mt-2 flex justify-between font-normal text-sm text-zinc-500 dark:text-[#c0bcbc]">
                  <span>
                    Image {currentIndex + 1} of {sortedBackdrops.length}
                  </span>
                  <span>
                    Rating: {selectedImage.vote_average.toFixed(1)} (
                    {selectedImage.vote_count}{" "}
                    {selectedImage.vote_count > 1 ||
                    selectedImage.vote_count === 0
                      ? "votes"
                      : "vote"}
                    )
                  </span>
                </div>
              )}
          </div>

          {/* Thumbnails */}
          <div className="relative">
            <div className="overflow-x-auto pt-1 pl-1">
              <div className="flex gap-2 pb-4">
                {sortedBackdrops.map((backdrop, index) => (
                  <div
                    key={index}
                    className="flex-none cursor-pointer transition-all hover:opacity-80"
                    onClick={() => {
                      setSelectedImage(backdrop);
                      setCurrentIndex(index);
                    }}
                  >
                    {selectedImage && (
                      <Poster
                        data={sortedBackdrops}
                        path={`${posterURL}${backdrop.file_path}`}
                        height={selectedImage.height}
                        width={selectedImage.width}
                        className={`h-24 w-40 rounded object-cover shadow-sm ${
                          selectedImage.file_path === backdrop.file_path
                            ? "ring-2 ring-blue-500 dark:ring-yellow-400"
                            : "ring-1 ring-gray-200 dark:ring-gray-700"
                        }`}
                        isMovie={false}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p> No photo available. </p>
      )}
    </>
  );
}
