import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const createPasswordValidation = (t: TFunction = translator) => {
  const passwordField = t("models.auth.fields.password");
  return z
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
    )
    .min(
      8,
      capitalizeSentence(
        t("schemas.validation.string.min", { field: passwordField, min: 8 }),
      ),
    )
    .max(
      150,
      capitalizeSentence(
        t("schemas.validation.string.max", { field: passwordField, max: 150 }),
      ),
    )
    .regex(
      /[a-z]/,
      capitalizeSentence(
        t("schemas.validation.string.regex", {
          field: passwordField,
          regex: t("regex.lowercase"),
        }),
      ),
    )
    .regex(
      /[A-Z]/,
      capitalizeSentence(
        t("schemas.validation.string.regex", {
          field: passwordField,
          regex: t("regex.uppercase"),
        }),
      ),
    )
    .regex(
      /\d/,
      capitalizeSentence(
        t("schemas.validation.string.regex", {
          field: passwordField,
          regex: t("regex.number"),
        }),
      ),
    )
    .regex(
      /[@$!%*?&]/,
      capitalizeSentence(
        t("schemas.validation.string.regex", {
          field: passwordField,
          regex: t("regex.specialCharacter"),
        }),
      ),
    );
};
