"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleWatchlist } from "../app/actions/watchlist/watchlist-data";
import { useAlert } from "../app/utils/use-alert";

type AddToWatchListButtonProps = {
  movieId: string | number;
  movieTitle?: string;
  initialInWatchlist?: boolean;
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

  const title = movieTitle ?? "This movie";

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
      {showLabel && (
        <span className="text-sm">
          {inWatchlist ? "In watchlist" : "Watchlist"}
        </span>
      )}
    </button>
  );
}
