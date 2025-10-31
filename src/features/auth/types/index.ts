import type z from "zod";
import type {
  createLoginFormSchema,
  createRegisterFormSchema,
} from "../schemas";

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;

export type LoginFormSchema = z.infer<ReturnType<typeof createLoginFormSchema>>;
