"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { addComment } from "../../app/actions/comment/comment-data";
import { CommentWithAuthor } from "../../app/actions/comment/definitions";
import CommentItem from "../comments/comment-item";
import HeaderSection from "../movie-details/header-section";

type CommentSectionProps = {
  movieId: string;
  comments: CommentWithAuthor[];
  currentUserId: string | null;
};

export default function CommentSection({
  movieId,
  comments,
  currentUserId,
}: CommentSectionProps) {
  const addCommentWithMovie = addComment.bind(null, movieId);
  const [state, formAction, isPending] = useActionState(
    addCommentWithMovie,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the textarea once a comment is successfully posted
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="flex flex-col gap-4 mt-6 sm:w-[60vw]">
      <HeaderSection sectionName="Comments" count={comments.length} />

      {currentUserId ? (
        <form ref={formRef} action={formAction} className="flex flex-col gap-2">
          <textarea
            name="content"
            rows={3}
            placeholder="Share your thoughts about this movie..."
            className="textarea w-full"
          />

          {state?.errors?.content && (
            <p className="text-error text-sm">{state.errors.content[0]}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="btn bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full"
            >
              <MessageSquare width="16" height="16" />
              {isPending ? "Posting..." : "Post comment"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-zinc-500 dark:text-[#c0bcbc]">
          <Link href="/login" className="text-brand-blue hover:underline">
            Log in
          </Link>{" "}
          to join the conversation.
        </p>
      )}

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-4 mt-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              movieId={movieId}
              currentUserId={currentUserId}
            />
          ))}
        </ul>
      ) : (
        <p className="italic text-zinc-500 dark:text-[#c0bcbc]">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </section>
  );
}
