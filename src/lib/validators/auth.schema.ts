import { z } from "zod";

export const loginSchema = z.object({
  entity: z
    .string()
    .min(1, "Email / Phone is required*"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
