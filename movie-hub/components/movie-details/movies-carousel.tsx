"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import posterURL from "../../app/actions/API-URLS/image-API-URL";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function MoviesCarousel({ movies }) {
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
  }, [movies]);

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

  return movies.length > 0 ? (
    <>
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
            {movies.map((movie) => (
              <Link
                href={`/movie/${movie.id}-${movie.title
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                key={movie.id}
                className="flex-none"
              >
                {movie.poster_path ? (
                  <Image
                    src={`${posterURL}/${movie.poster_path}`}
                    alt={`${movie?.title}'s poster`}
                    width={250}
                    height={200}
                    loading="lazy"
                    unoptimized={false}
                    className="rounded-lg h-90 w-auto object-cover shadow-sm"
                    key={movie.id}
                  />
                ) : (
                  <Image
                    src="/default-movie-image.jpg"
                    alt={`${movie?.title}'s poster`}
                    width={250}
                    height={200}
                    loading="lazy"
                    unoptimized={false}
                    className="rounded-lg h-90 object-cover w-65 shadow-sm"
                    key={movie.id}
                  />
                )}
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
