import { z } from "zod";

export const registerSchema = z
  .object({
    entity: z.string().min(1, "Email / Phone is required"),  // 🔥 UPDATED

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirm: z
      .string()
      .min(1, "Confirm password is required"),

    referral: z.string().optional(),

    agreeTerms: z
      .boolean()
      .refine((v) => v === true, {
        message: "You must accept Terms & Conditions",
      }),

    agreePromo: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
