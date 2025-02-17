"use client";

import Image from "next/image";
import moviePosterURL from "../../app/actions/movies/image-API-URL";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ backdrops }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  // Sort backdrops by vote_average to show best rated images first
  const sortedBackdrops = [...backdrops].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  const [selectedImage, setSelectedImage] = useState(sortedBackdrops[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(sortedBackdrops[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < sortedBackdrops.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(sortedBackdrops[currentIndex + 1]);
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="inline-flex gap-2 items-center mb-4 text-4xl font-medium text-zinc-900 dark:text-white">
          <div className="h-10 w-1 bg-[#f5c518] rounded-sm" />
          Photos
          <span className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
            {sortedBackdrops.length}
          </span>
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <div className="relative">
          <Image
            src={`${baseImageUrl}${selectedImage.file_path}`}
            width={selectedImage.width}
            height={selectedImage.height}
            alt="Selected backdrop"
            className="h-auto w-full rounded-lg object-cover"
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
        <div className="mt-2 flex justify-between font-normal text-sm text-zinc-500 dark:text-[#c0bcbc]">
          <span>
            Image {currentIndex + 1} of {sortedBackdrops.length}
          </span>
          <span>
            Rating: {selectedImage.vote_average.toFixed(1)} (
            {selectedImage.vote_count} votes)
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        <div className="overflow-x-auto pt-1 pl-1">
          <div className="flex gap-2 pb-4">
            {sortedBackdrops.map((backdrop, index) => (
              <div
                key={backdrop.file_path}
                className="flex-none cursor-pointer transition-all hover:opacity-80"
                onClick={() => {
                  setSelectedImage(backdrop);
                  setCurrentIndex(index);
                }}
              >
                <Image
                  src={`${moviePosterURL}${backdrop.file_path}`}
                  alt={`Backdrop ${index + 1}`}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className={`h-24 w-40 rounded object-cover ${
                    selectedImage.file_path === backdrop.file_path
                      ? "ring-2 ring-blue-500 dark:ring-yellow-400"
                      : "ring-1 ring-gray-200 dark:ring-gray-700"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
