import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  email: z.string().email().trim(),
  refreshToken: z.string(),
});
