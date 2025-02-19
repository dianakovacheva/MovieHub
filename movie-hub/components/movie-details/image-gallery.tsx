"use client";

import Image from "next/image";
import moviePosterURL from "../../app/actions/movie/image-API-URL";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeaderSection from "./header-section";

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

  const sectionName = "Photos";

  if (!sortedBackdrops || sortedBackdrops.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={0} />
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
          <span> No photo available. </span>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} data={sortedBackdrops} />

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
    </>
  );
}
