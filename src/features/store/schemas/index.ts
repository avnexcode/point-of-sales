import { capitalizeSentence } from "@/utils";
import { AmountType } from "@prisma/client";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const amountTypes = Object.values(AmountType) as [
  AmountType,
  ...AmountType[],
];

export const baseStoreFormSchema = (t: TFunction = translator) => {
  const nameField = t("models.store.fields.name");
  const addressField = t("models.store.fields.address");
  const imageField = t("models.store.fields.image");
  const discountField = t("models.store.fields.discount");
  const totalDiscountField = t("models.store.fields.totalDiscount");
  const taxField = t("models.store.fields.tax");
  const totalTaxField = t("models.store.fields.totalTax");

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

    discount: z.enum(amountTypes, {
      invalid_type_error: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: discountField }),
      ),
    }),

    totalDiscount: z
      .string()
      .refine(
        (value) => value === undefined || value === "" || /^\d+$/.test(value),
        {
          message: capitalizeSentence(
            t("schemas.validation.number.int", { field: totalDiscountField }),
          ),
        },
      )
      .optional(),

    tax: z.enum(amountTypes, {
      invalid_type_error: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: taxField }),
      ),
    }),

    totalTax: z
      .string()
      .refine(
        (value) => value === undefined || value === "" || /^\d+$/.test(value),
        {
          message: capitalizeSentence(
            t("schemas.validation.number.int", { field: totalTaxField }),
          ),
        },
      )
      .optional(),
  });
};

export const createStoreFormSchema = (t: TFunction = translator) => {
  const totalDiscountField = t("models.store.fields.totalDiscount");
  const totalTaxField = t("models.store.fields.totalTax");
  return baseStoreFormSchema(t)
    .refine(
      (data) => {
        if (data.discount !== AmountType.NONE && !data.totalDiscount) {
          return false;
        }
        return true;
      },
      {
        message: capitalizeSentence(
          t("schemas.validation.common.required", {
            field: totalDiscountField,
          }),
        ),
        path: ["totalDiscount"],
      },
    )
    .refine(
      (data) => {
        if (data.tax !== AmountType.NONE && !data.totalTax) {
          return false;
        }
        return true;
      },
      {
        message: capitalizeSentence(
          t("schemas.validation.common.required", {
            field: totalTaxField,
          }),
        ),
        path: ["totalTax"],
      },
    );
};

export const updateStoreFormSchema = (t: TFunction = translator) => {
  const totalDiscountField = t("models.store.fields.totalDiscount");
  const totalTaxField = t("models.store.fields.totalTax");
  return baseStoreFormSchema(t)
    .refine(
      (data) => {
        if (data.discount !== AmountType.NONE && !data.totalDiscount) {
          return false;
        }
        return true;
      },
      {
        message: capitalizeSentence(
          t("schemas.validation.common.required", {
            field: totalDiscountField,
          }),
        ),
        path: ["totalDiscount"],
      },
    )
    .refine(
      (data) => {
        if (data.tax !== AmountType.NONE && !data.totalTax) {
          return false;
        }
        return true;
      },
      {
        message: capitalizeSentence(
          t("schemas.validation.common.required", {
            field: totalTaxField,
          }),
        ),
        path: ["totalTax"],
      },
    );
};
