"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import MovieRating from "./movie-rating";
import AddToWatchListButton from "./add-to-watchlist-button";
import Poster from "./poster";
import { SeriesProps } from "../app/actions/series/definitions";

function seriesHref(id: number, name?: string) {
  if (!name) return `/tv/${id}`;
  return `/tv/${id}-${name.split(" ").join("-").toLowerCase()}`;
}

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

  if (!series || series.length === 0) {
    return <p> No series to show. </p>;
  }

  return (
    <div className="relative group">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[35%] -translate-y-1/2 bg-black/40 p-2 rounded-full z-10 hover:bg-black/60 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      <div
        ref={carouselRef}
        className="overflow-x-auto scroll-smooth hide-scrollbar"
        onScroll={updateArrowVisibility}
      >
        <ul className="flex gap-4 pb-2">
          {series.map((show) => {
            const href = seriesHref(show.id, show.name);
            const year = show.first_air_date?.split("-")[0];

            return (
              <li key={show.id} className="flex w-40 shrink-0 flex-col">
                <Link href={href} className="block overflow-hidden rounded-lg">
                  <Poster
                    alt={show.name}
                    path={show.poster_path ? show.poster_path : ""}
                    height={300}
                    width={200}
                    style="aspect-[2/3] w-full object-cover transition-opacity hover:opacity-90"
                    isMovie={true}
                  />
                </Link>

                <div className="mt-2 flex h-[6.25rem] flex-col gap-1.5">
                  {show.name ? (
                    <Link href={href} className="min-w-0">
                      <h3 className="h-10 text-sm font-semibold leading-5 line-clamp-2 hover:underline">
                        {show.name}
                      </h3>
                    </Link>
                  ) : (
                    <div className="h-10" aria-hidden />
                  )}

                  <p className="h-4 text-xs text-zinc-500 dark:text-[#c0bcbc]">
                    {year ?? "\u00A0"}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-1">
                    <MovieRating voteAverage={show.vote_average ?? 0} />
                    <AddToWatchListButton
                      movieId={`tv-${show.id}`}
                      movieTitle={show.name}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[35%] -translate-y-1/2 bg-black/40 p-2 rounded-full z-10 hover:bg-black/60 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
