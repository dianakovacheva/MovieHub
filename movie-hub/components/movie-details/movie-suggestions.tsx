"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import moviePosterURL from "../../app/actions/movie/image-API-URL";
import Image from "next/image";
import Link from "next/link";
import HeaderSection from "./header-section";
import { useState, useRef, useEffect } from "react";

export default function FeaturedToday({ topMovieSuggestions }) {
  const sectionName = "More like this";
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Add a small buffer (1px) to account for rounding errors
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
    }
  };

  // Initial arrow visibility check
  useEffect(() => {
    updateArrowVisibility();
  }, [topMovieSuggestions]);

  if (!topMovieSuggestions || topMovieSuggestions.length === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={undefined} />
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
          <span> No movie suggestions available. </span>
        </div>
      </>
    );
  }

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth; // Scroll by the width of the visible area

      const newScrollLeft =
        direction === "left"
          ? Math.max(0, scrollLeft - scrollAmount)
          : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return topMovieSuggestions ? (
    <>
      <HeaderSection sectionName={sectionName} data={undefined} />
      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full z-10 hover:bg-black/50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        <div
          ref={carouselRef}
          className="carousel rounded-box overflow-x-auto scroll-smooth hide-scrollbar"
          onScroll={updateArrowVisibility}
        >
          <div className="carousel-item gap-1 flex">
            {topMovieSuggestions.map((movie) => (
              <Link
                href={`/movie/${movie.id}-${movie.title
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                key={movie.id}
                className="flex-none"
              >
                <Image
                  src={`${moviePosterURL}/${movie.poster_path}`}
                  alt={`${movie?.title}'s poster`}
                  width={250}
                  height={200}
                  loading="lazy"
                  unoptimized={false}
                  className="rounded-lg shadow-sm"
                />
              </Link>
            ))}
          </div>
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full z-10 hover:bg-black/50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </>
  ) : (
    <p> No movies to show. </p>
  );
}
