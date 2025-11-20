import {
  InputCurrency,
  InputImage,
  InputSelect,
  InputStringNumber,
  InputText,
} from "@/components/forms";
import { env } from "@/configs/env";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateStoreFormSchema } from "../types";
import { useAuth } from "@/hooks";

type EditStoreFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateStoreFormSchema) => void;
  image?: string | null;
};

export const EditStoreFormInner = ({
  formId,
  onSubmit,
  image,
}: EditStoreFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateStoreFormSchema>();
  const defaultImage = String(env.NEXT_PUBLIC_STORE_IMAGE);
  const { settings } = useAuth();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputText<UpdateStoreFormSchema>
        name="name"
        label={t("models.store.fields.name")}
        required
      />
      <InputText<UpdateStoreFormSchema>
        name="address"
        label={t("models.store.fields.address")}
        required
      />
      <InputImage<UpdateStoreFormSchema>
        name="image"
        label={t("models.store.fields.image")}
        image={image}
        defaultImage={defaultImage}
      />
      <div className="flex flex-col items-center gap-y-5 xl:flex-row xl:gap-x-2 xl:gap-y-0">
        <InputSelect<UpdateStoreFormSchema, "discount">
          name="discount"
          label={t("models.store.fields.discount")}
          options={[
            { label: "None", value: "NONE" },
            { label: "Nominal", value: "NOMINAL" },
            { label: "Percentage", value: "PERCENTAGE" },
          ]}
        />
        {form.watch("discount") === "NOMINAL" ? (
          <InputCurrency<UpdateStoreFormSchema>
            name="totalDiscount"
            label={t("models.store.fields.totalDiscount")}
            currency={settings?.currency}
          />
        ) : (
          <InputStringNumber<UpdateStoreFormSchema>
            name="totalDiscount"
            label={t("models.store.fields.totalDiscount")}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-y-5 xl:flex-row xl:gap-x-2 xl:gap-y-0">
        <InputSelect<UpdateStoreFormSchema, "tax">
          name="tax"
          label={t("models.store.fields.tax")}
          options={[
            { label: "None", value: "NONE" },
            { label: "Nominal", value: "NOMINAL" },
            { label: "Percentage", value: "PERCENTAGE" },
          ]}
        />
        {form.watch("tax") === "NOMINAL" ? (
          <InputCurrency<UpdateStoreFormSchema>
            name="totalTax"
            label={t("models.store.fields.totalTax")}
            currency={settings?.currency}
          />
        ) : (
          <InputStringNumber<UpdateStoreFormSchema>
            name="totalTax"
            label={t("models.store.fields.totalTax")}
          />
        )}
      </div>
    </form>
  );
};
