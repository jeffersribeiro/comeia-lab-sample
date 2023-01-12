import { z } from "zod";

export const createSchema = z.object({
  date: z.date().optional(),
  description: z.string(),
});

export const updateSchema = z.object({
  done: z.boolean().optional(),
  description: z.string().optional(),
});
