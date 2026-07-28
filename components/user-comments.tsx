"use client";

import Link from "next/link";
import { Film, Trash2, Tv } from "lucide-react";
import { deleteComment } from "../app/actions/comment/comment-data";
import { UserComment } from "../app/actions/comment/definitions";
import { useAlert } from "../app/utils/use-alert";
import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";

type UserCommentsProps = {
  comments: UserComment[];
  currentUserId: string;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function UserComments({
  comments,
  currentUserId,
}: UserCommentsProps) {
  const { showAlert } = useAlert();
  const sectionName = "Comments";

  return (
    <section className="flex flex-col gap-4">
      <HeaderSection sectionName={sectionName} count={comments.length} />

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => {
            const MediaIcon = comment.mediaType === "tv" ? Tv : Film;

            return (
              <li
                key={comment.id}
                className="flex flex-col gap-2 p-4 rounded-box bg-zinc-50 dark:bg-[#121212]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <Link
                      href={comment.mediaHref}
                      className="inline-flex items-center gap-2 font-bold text-[#5799ef] hover:underline"
                    >
                      <MediaIcon width="16" height="16" className="shrink-0" />
                      <span className="truncate">{comment.mediaTitle}</span>
                    </Link>
                    <span className="text-xs text-zinc-500 dark:text-[#c0bcbc]">
                      {formatDate(comment.createdAt)}
                      <span className="mx-1">·</span>
                      {comment.mediaType === "tv" ? "Series" : "Movie"}
                    </span>
                  </div>

                  {currentUserId === comment.userId && (
                    <form
                      action={async function () {
                        const result = await deleteComment(
                          comment.id,
                          comment.movieId,
                        );

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

                <p className="whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyList
          listTitle="No comments yet"
          listParagraph="Comments you leave on movies and series will show up here."
          buttonText="Browse popular movies"
          buttonAction="/"
          className="flex flex-col items-center gap-2 flex-wrap"
        />
      )}
    </section>
  );
}
