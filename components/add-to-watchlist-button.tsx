"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";
import { toggleWatchlist } from "../app/actions/watchlist/watchlist-data";
import { useAlert } from "../app/utils/use-alert";

type AddToWatchListButtonProps = {
  movieId: string | number;
  movieTitle?: string;
  initialInWatchlist?: boolean;
  /** Detail-page style: matches Rate button (icon + short label) */
  showLabel?: boolean;
};

export default function AddToWatchListButton({
  movieId,
  movieTitle,
  initialInWatchlist = false,
  showLabel = false,
}: AddToWatchListButtonProps) {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [isPending, startTransition] = useTransition();
  const { showAlert } = useAlert();

  const title = movieTitle ?? "This title";

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleWatchlist(movieId.toString());

      if (result?.errors) {
        showAlert("alert-error", "Please log in to use your watchlist.");
        return;
      }

      if (result?.success) {
        setInWatchlist(!!result.inWatchlist);
        showAlert(
          result.inWatchlist ? "alert-success" : "alert-info",
          result.inWatchlist
            ? `"${title}" was added to your watchlist.`
            : `"${title}" was removed from your watchlist.`,
        );
      }
    });
  };

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        className="btn-ghost text-[#5799ef] disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          {inWatchlist ? (
            <Check width="24" height="24" strokeWidth={2.5} />
          ) : (
            <Plus width="24" height="24" strokeWidth={2.5} />
          )}
          <p className="text-xl font-normal">
            {inWatchlist ? "Added" : "Add"}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      className="btn btn-ghost btn-sm text-[#5799ef]"
    >
      {inWatchlist ? (
        <BookmarkCheck width="18" height="18" fill="currentColor" />
      ) : (
        <Bookmark width="18" height="18" />
      )}
    </button>
  );
}
