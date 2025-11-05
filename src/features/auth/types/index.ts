import type z from "zod";
import type {
  createAdminLoginFormSchema,
  createEmployeeLoginFormSchema,
  createRegisterFormSchema,
} from "../schemas";

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;

export type AdminLoginFormSchema = z.infer<
  ReturnType<typeof createAdminLoginFormSchema>
>;

export type EmployeeLoginFormSchema = z.infer<
  ReturnType<typeof createEmployeeLoginFormSchema>
>;
