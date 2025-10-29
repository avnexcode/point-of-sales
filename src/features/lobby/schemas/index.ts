import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const createProductSchema = (t: TFunction = translator) => {
  return z.object({
    name: z
      .string({
        invalid_type_error: capitalizeSentence(
          t("schemas.validation.invalid", {
            field: t("models.product.fields.name"),
          }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.tooShort", {
            field: t("models.product.fields.name"),
            min: 1,
          }),
        ),
      )
      .max(
        10,
        capitalizeSentence(
          t("schemas.validation.tooLong", {
            field: t("models.product.fields.name"),
            max: 10,
          }),
        ),
      ),
  });
};

export type ProductSchema = z.infer<ReturnType<typeof createProductSchema>>;
