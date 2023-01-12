import { z } from "zod";

export const createSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
});
