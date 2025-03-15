"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import MovieRating from "../movie-rating";
import AddToWatchListButton from "../add-to-watchlist-button";
import Poster from "../poster";
import { TrendingMovieListResponse } from "../../app/actions/movie/types";

export default function MoviesCarousel({ moviesData }) {
  const movies: TrendingMovieListResponse["results"] = moviesData;
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

  const scroll = (direction: string) => {
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

  return movies && movies.length > 0 ? (
    <div className="relative group carousel rounded-box overflow-x-auto scroll-smooth hide-scrollbar">
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
        <div className="carousel-item gap-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="card shadow-sm bg-zinc-50 dark:bg-[#121212] mb-2 w-55 h-[65vh]"
            >
              {movie.title && (
                <Link
                  href={`/movie/${movie.id}-${movie.title
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  className="flex-none"
                >
                  <Poster
                    name={movie.title}
                    path={
                      movie.poster_path !== null &&
                      movie.poster_path !== "" &&
                      movie.poster_path !== undefined
                        ? movie.poster_path
                        : ""
                    }
                    height={250}
                    width={200}
                    className="rounded-t-lg h-90 w-60 object-cover"
                    isMovie={true}
                  />
                </Link>
              )}

              <div className="flex flex-col gap-1 text-base font-normal m-3">
                <div className="flex gap-4 items-center">
                  <MovieRating movie={movie} />
                  <AddToWatchListButton />
                </div>
                {movie.title && (
                  <Link
                    href={`/movie/${movie.id}-${movie.title
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                    className="flex-none"
                  >
                    <p className="truncate hover:underline">{movie.title}</p>
                  </Link>
                )}
              </div>
            </div>
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
  ) : (
    <p> No movies to show. </p>
  );
}
