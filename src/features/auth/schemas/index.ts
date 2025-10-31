import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";
import { createEmailValidation } from "./email-schema";
import { createPasswordValidation } from "./password-schema";

export const createRegisterFormSchema = (t: TFunction = translator) => {
  const nameField = t("models.user.fields.name");
  return z
    .object({
      name: z
        .string({
          invalid_type_error: capitalizeSentence(
            t("schemas.validation.common.invalid", { field: nameField }),
          ),
        })
        .min(
          1,
          capitalizeSentence(
            t("schemas.validation.common.required", { field: nameField }),
          ),
        )
        .max(
          100,
          capitalizeSentence(
            t("schemas.validation.string.max", { field: nameField, max: 100 }),
          ),
        )
        .trim()
        .toLowerCase(),
      email: createEmailValidation(t),
      password: createPasswordValidation(t),
      confirmPassword: z
        .string()
        .min(
          1,
          capitalizeSentence(
            t("schemas.validation.password.confirmPassword.required"),
          ),
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: capitalizeSentence(
        t("schemas.validation.password.confirmPassword.doNotMatch"),
      ),
      path: ["confirmPassword"],
    });
};

export const createLoginFormSchema = (t: TFunction = translator) => {
  const passwordField = t("models.auth.fields.password");
  return z.object({
    email: createEmailValidation(t),
    password: z.string().min(
      1,
      capitalizeSentence(
        t("schemas.validation.common.required", {
          field: passwordField,
        }),
      ),
    ),
  });
};

export const createUpdateEmailFormSchema = (t: TFunction = translator) => {
  const passwordField = t("models.auth.fields.password");
  return z.object({
    email: createEmailValidation(t),
    password: z.string().min(
      1,
      capitalizeSentence(
        t("schemas.validation.common.required", {
          field: passwordField,
        }),
      ),
    ),
  });
};

export const createUpdatePasswordFormSchema = (t: TFunction = translator) => {
  const currentPasswordField = t("models.auth.fields.currentPassword");
  return z
    .object({
      currentPassword: z.string().min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", {
            field: currentPasswordField,
          }),
        ),
      ),
      password: createPasswordValidation(t),
      confirmPassword: z
        .string()
        .min(
          1,
          capitalizeSentence(
            t("schemas.validation.password.confirmPassword.required"),
          ),
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: capitalizeSentence(
        t("schemas.validation.password.confirmPassword.doNotMatch"),
      ),
      path: ["confirmPassword"],
    });
};

export const createResetPasswordFormSchema = (t: TFunction = translator) => {
  return z
    .object({
      password: createPasswordValidation(t),
      confirmPassword: z
        .string()
        .min(
          1,
          capitalizeSentence(
            t("schemas.validation.password.confirmPassword.required"),
          ),
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: capitalizeSentence(
        t("schemas.validation.password.confirmPassword.doNotMatch"),
      ),
      path: ["confirmPassword"],
    });
};

export const createDeleteAccountFormSchema = (t: TFunction = translator) => {
  const passwordField = t("models.auth.fields.password");
  return z.object({
    password: z
      .string({
        invalid_type_error: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: passwordField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: passwordField }),
        ),
      ),
  });
};
