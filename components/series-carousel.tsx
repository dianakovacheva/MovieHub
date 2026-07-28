"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import MovieRating from "./movie-rating";
import AddToWatchListButton from "./add-to-watchlist-button";
import Poster from "./poster";
import { SeriesProps } from "../app/actions/series/definitions";

export default function SeriesCarousel({ series }: SeriesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
  }, [series]);

  const scroll = (direction: string) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth;

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

  return series && series.length > 0 ? (
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
          {series.map((show) => {
            const showLink = show.name
              ? `/tv/${show.id}-${show.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`
              : `/tv/${show.id}`;

            return (
              <div
                key={show.id}
                className="card shadow-sm bg-zinc-50 dark:bg-[#121212] mb-2 w-55 max-h-[65vh]"
              >
                <Link href={showLink} className="flex-none">
                  <Poster
                    alt={show.name}
                    path={show.poster_path ? show.poster_path : ""}
                    height={250}
                    width={200}
                    style="rounded-t-lg h-90 w-60 object-cover"
                    isMovie={true}
                  />
                </Link>

                <div className="flex flex-col gap-1 text-base font-normal m-3">
                  <div className="flex gap-4 items-center">
                    <MovieRating voteAverage={show.vote_average ?? 0} />
                    <AddToWatchListButton
                      movieId={`tv-${show.id}`}
                      movieTitle={show.name}
                    />
                  </div>
                  {show.name && (
                    <Link href={showLink} className="flex-none">
                      <p className="truncate hover:underline mb-2">
                        {show.name}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
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
    <p> No series to show. </p>
  );
}
