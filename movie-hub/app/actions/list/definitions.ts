import { z } from "zod";

export const CreateListFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }).max(255),
  description: z.string().trim().max(10000).optional(),
});

export type CreateListFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
