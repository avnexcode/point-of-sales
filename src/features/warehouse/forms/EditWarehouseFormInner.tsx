import { useFormInput } from "@/components/forms";
import { env } from "@/configs/env";
import { StoreSelect } from "@/features/store/components";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateWarehouseFormSchema } from "../types";

type EditWarehouseFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateWarehouseFormSchema) => void;
  image?: string | null;
};

export const EditWarehouseFormInner = ({
  formId,
  onSubmit,
  image,
}: EditWarehouseFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateWarehouseFormSchema>();
  const defaultImage = env.NEXT_PUBLIC_WAREHOUSE_IMAGE;
  const { InputText, InputImage } = useFormInput<UpdateWarehouseFormSchema>();

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
        image={image}
        defaultImage={defaultImage}
      />
      <StoreSelect<UpdateWarehouseFormSchema>
        name="storeId"
        label={t("models.store.title")}
        required
      />
    </form>
  );
};
