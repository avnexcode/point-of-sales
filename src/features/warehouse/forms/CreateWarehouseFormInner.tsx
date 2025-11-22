import { useFormInput } from "@/components/forms";
import { env } from "@/configs/env";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateWarehouseFormSchema } from "../types";
import { StoreSelect } from "@/features/store/components";

type CreateWarehouseFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateWarehouseFormSchema) => void;
};

export const CreateWarehouseFormInner = ({
  formId,
  onSubmit,
}: CreateWarehouseFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<CreateWarehouseFormSchema>();
  const defaultImage = env.NEXT_PUBLIC_WAREHOUSE_IMAGE;
  const { InputText, InputImage } = useFormInput<CreateWarehouseFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputText
        name="name"
        label={t("models.warehouse.fields.name")}
        required
      />
      <InputText
        name="address"
        label={t("models.warehouse.fields.address")}
        required
      />
      <InputImage
        name="image"
        label={t("models.warehouse.fields.image")}
        defaultImage={defaultImage}
      />
      <StoreSelect<CreateWarehouseFormSchema>
        name="storeId"
        label={t("models.store.title")}
        required
      />
    </form>
  );
};
