import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Comment cannot be empty." })
    .max(2000, { message: "Comment is too long (max 2000 characters)." }),
});

export type CommentWithAuthor = {
  id: string;
  movieId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorName: string | null;
  authorEmail: string | null;
};

export type UserComment = CommentWithAuthor & {
  mediaTitle: string;
  mediaHref: string;
  mediaType: "movie" | "tv";
};

export type CommentFormState =
  | {
      errors?: {
        content?: string[];
        auth?: string[];
      };
      success?: boolean;
    }
  | undefined;
