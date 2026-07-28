"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import MovieRating from "./movie-rating";
import AddToWatchListButton from "./add-to-watchlist-button";
import Poster from "./poster";
import { MoviesProps } from "../app/actions/movie/definitions";

function movieHref(id: number, title?: string) {
  if (!title) return `/movie/${id}`;
  return `/movie/${id}-${title.split(" ").join("-").toLowerCase()}`;
}

export default function MoviesCarousel({ movies }: MoviesProps) {
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
  }, [movies]);

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

  if (!movies || movies.length === 0) {
    return <p> No movies to show. </p>;
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
          {movies.map((movie) => {
            const href = movieHref(movie.id, movie.title);
            const year = movie.release_date?.split("-")[0];

            return (
              <li key={movie.id} className="flex w-40 shrink-0 flex-col">
                <Link href={href} className="block overflow-hidden rounded-lg">
                  <Poster
                    alt={movie.title}
                    path={movie.poster_path ? movie.poster_path : ""}
                    height={300}
                    width={200}
                    style="aspect-[2/3] w-full object-cover transition-opacity hover:opacity-90"
                    isMovie={true}
                  />
                </Link>

                <div className="mt-2 flex min-h-[5.5rem] flex-col gap-1.5">
                  {movie.title && (
                    <Link href={href} className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:underline">
                        {movie.title}
                      </h3>
                    </Link>
                  )}

                  {year && (
                    <p className="text-xs text-zinc-500 dark:text-[#c0bcbc]">
                      {year}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-1">
                    <MovieRating voteAverage={movie.vote_average} />
                    <AddToWatchListButton
                      movieId={movie.id}
                      movieTitle={movie.title}
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
