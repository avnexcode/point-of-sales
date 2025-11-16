import { LoginProvider, UserRole } from "@prisma/client";
import z from "zod";
import { emailValidation } from "./auth.validation";

export const loginProviders = Object.values(LoginProvider) as [
  LoginProvider,
  ...LoginProvider[],
];

export const role = Object.values(UserRole) as [UserRole, ...UserRole[]];

export const createUserRequest = z.object({
  name: z.string().min(1).max(50).trim().toLowerCase(),
  email: emailValidation,
  avatarUrl: z.string().url().optional(),
  provider: z.enum(loginProviders).default("EMAIL"),
  role: z.enum(role).default("ADMIN"),
});

export const updateUserRequest = z.object({
  username: z.string().min(1).max(50).optional(),
  name: z.string().min(1).max(50).optional(),
  email: emailValidation.optional(),
  phone: z
    .string()
    .min(1)
    .min(8)
    .max(15)
    .regex(/^[0-9+\-() ]+$/)
    .or(z.literal(""))
    .optional()
    .nullable(),
  avatar: z.string().url().optional(),
  image: z.string().url().optional(),
  provider: z.enum(loginProviders).optional(),
});
