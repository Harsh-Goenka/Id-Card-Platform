import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .regex(
      /[A-Z]/,
      "Password must contain an uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain a lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain a number"
    )
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain a special character"
    ),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(
      1,
      "Password is required"
    ),
});