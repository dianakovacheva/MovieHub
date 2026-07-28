"use client";

import { Trash2, UserCircle } from "lucide-react";
import { deleteComment } from "../../app/actions/comment/comment-data";
import { CommentWithAuthor } from "../../app/actions/comment/definitions";
import { useAlert } from "../../app/utils/use-alert";

type CommentItemProps = {
  comment: CommentWithAuthor;
  movieId: string;
  currentUserId: string | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CommentItem({
  comment,
  movieId,
  currentUserId,
}: CommentItemProps) {
  const { showAlert } = useAlert();
  const isOwner = currentUserId === comment.userId;
  const author = comment.authorName || comment.authorEmail || "Anonymous";

  return (
    <li className="flex gap-3 p-4 rounded-box bg-zinc-50 dark:bg-[#121212]">
      <UserCircle className="shrink-0 text-zinc-400" width="32" height="32" />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">{author}</span>
            <span className="text-xs text-zinc-500 dark:text-[#c0bcbc]">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          {isOwner && (
            <form
              action={async function () {
                const result = await deleteComment(comment.id, movieId);

                if (result?.success) {
                  showAlert("alert-info", "Your comment was deleted.");
                } else {
                  showAlert("alert-error", "Could not delete comment.");
                }
              }}
            >
              <button
                type="submit"
                aria-label="Delete comment"
                title="Delete comment"
                className="btn btn-ghost btn-xs text-error"
              >
                <Trash2 width="16" height="16" />
              </button>
            </form>
          )}
        </div>

        <p className="whitespace-pre-wrap break-words">{comment.content}</p>
      </div>
    </li>
  );
}
