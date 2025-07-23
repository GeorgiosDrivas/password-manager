import z from "zod";

export const itemSchema = z.object({
  title: z.string().min(3, "Title is required"),
  username: z.string().optional(),
  password: z.string("Password is required"),
  url: z.url("Invalid URL format"),
});

export type ItemSchema = z.infer<typeof itemSchema>;
