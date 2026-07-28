"use client";

import { Trash2 } from "lucide-react";
import { removeMovieFromList } from "../../app/actions/list/list-data";
import { useAlert } from "../../app/utils/use-alert";

type RemoveMovieButtonProps = {
  listId: string;
  movieId: string;
  movieTitle: string;
};

export default function RemoveMovieButton({
  listId,
  movieId,
  movieTitle,
}: RemoveMovieButtonProps) {
  const { showAlert } = useAlert();

  return (
    <form
      action={async function () {
        const result = await removeMovieFromList(listId, movieId);

        if (result?.success) {
          showAlert(
            "alert-info",
            `"${movieTitle}" was removed from your list.`,
          );
        } else {
          showAlert("alert-error", `Could not remove "${movieTitle}".`);
        }
      }}
    >
      <button
        type="submit"
        aria-label={`Remove ${movieTitle} from list`}
        title="Remove from list"
        className="btn btn-ghost btn-sm text-error hover:text-error"
      >
        <Trash2 width="18" height="18" />
      </button>
    </form>
  );
}
