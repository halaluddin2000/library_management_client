import { z } from "zod";

export const genreOptions = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
] as const;

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  author: z.string().min(1, "Author is required").trim(),
  genre: z.enum(genreOptions, {
    errorMap: () => ({
      message: `Genre must be one of: ${genreOptions.join(", ")}`,
    }),
  }),
  isbn: z.string().min(1, "ISBN is required").trim(),
  description: z
    .string()
    .optional()
    .transform((s) => (s ? s.trim() : s)),
  copies: z.coerce
    .number()
    .int()
    .min(0, { message: "Copies cannot be negative" }),
  available: z.boolean().optional().default(true),
});

export type BookFormData = z.infer<typeof bookSchema>;
