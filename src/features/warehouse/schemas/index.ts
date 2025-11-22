import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const createWarehouseFormSchema = (t: TFunction = translator) => {
  const nameField = t("models.warehouse.fields.name");
  const addressField = t("models.warehouse.fields.address");
  const imageField = t("models.warehouse.fields.image");
  const storeField = t("models.store.title");

  return z.object({
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

    address: z
      .string({
        invalid_type_error: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: addressField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: addressField }),
        ),
      )
      .max(
        255,
        capitalizeSentence(
          t("schemas.validation.string.max", { field: addressField, max: 255 }),
        ),
      )
      .trim(),

    image: z
      .instanceof(File, {
        message: capitalizeSentence(
          t("schemas.validation.file.invalidType", {
            field: imageField,
            allowedTypes: "image/*",
          }),
        ),
      })
      .refine(
        (file) => file === null || file.size <= 10 * 1024 * 1024, // max 10 MB
        {
          message: capitalizeSentence(
            t("schemas.validation.file.maxSize", {
              field: imageField,
              maxSize: 10,
            }),
          ),
        },
      )
      .refine(
        (file) =>
          file === null ||
          ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        {
          message: capitalizeSentence(
            t("schemas.validation.file.invalidType", {
              field: imageField,
              allowedTypes: "JPEG, PNG, or WEBP",
            }),
          ),
        },
      )
      .nullable()
      .optional(),

    storeId: z
      .string({
        invalid_type_error: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: storeField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: storeField }),
        ),
      )
      .uuid(
        capitalizeSentence(
          t("schemas.validation.string.uuid", { field: storeField }),
        ),
      ),
  });
};

export const updateWarehouseFormSchema = (t: TFunction = translator) => {
  return createWarehouseFormSchema(t);
};
