import { z } from "zod";

export const createProjectSchema = z.object({

  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .default(""),

  card: z.object({

    width: z
      .number()
      .positive("Width must be greater than 0"),

    height: z
      .number()
      .positive("Height must be greater than 0"),

    dpi: z
      .number()
      .int()
      .min(72)
      .max(1200)
      .default(300),

    unit: z
      .enum(["mm", "inch"])
      .default("mm"),

  }),

});