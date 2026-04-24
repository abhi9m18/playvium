import { z } from "zod";

export const forgotSchema = z.object({
  email: z.string().min(1, "Email or Phone is required"),
});

export type ForgotSchema = z.infer<typeof forgotSchema>;
