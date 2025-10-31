import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const createEmailValidation = (t: TFunction = translator) => {
  const emailField = t("models.auth.fields.email");
  return z
    .string({
      invalid_type_error: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: emailField }),
      ),
    })
    .min(
      1,
      capitalizeSentence(
        t("schemas.validation.common.required", { field: emailField }),
      ),
    )
    .email(capitalizeSentence(t("schemas.validation.string.email")))
    .max(
      150,
      capitalizeSentence(
        t("schemas.validation.string.max", { field: emailField, max: 150 }),
      ),
    )
    .trim()
    .toLowerCase();
};
