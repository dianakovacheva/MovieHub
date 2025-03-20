import { MouseEventHandler } from "react";
import { z } from "zod";

export const CreateListFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }).max(255),
  description: z.string().trim().max(10000).optional(),
  isPublic: z.boolean({ required_error: "isPublic is required" }),
});

export type CreateListFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        isPublic?: boolean | string[];
      };
      message?: string;
      success?: boolean;
      id?: string;
    }
  | undefined;

export type ListsProps = {
  lists: {
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }[];
};

export type EmptyListProps = {
  listTitle: string;
  listParagraph?: string;
  buttonText?: string;
  buttonAction?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
