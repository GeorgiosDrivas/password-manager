import z from "zod";

export const itemSchema = z.object({
  id: z.number(),
  title: z.string().min(3, "Title is required"),
  username: z.string().optional(),
  password: z.string("Password is required"),
  url: z.url("Invalid URL format"),
});

export const noIdItemSchema = itemSchema.omit({ id: true });

export type ItemSchemaType = z.infer<typeof itemSchema>;

export type noIdItemSchemaType = z.infer<typeof noIdItemSchema>;
