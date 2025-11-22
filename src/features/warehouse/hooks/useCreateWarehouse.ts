import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { deleteImageByUrl, uploadImage } from "@/lib/supabase/image-upload";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createWarehouseFormSchema } from "../schemas";
import type { CreateWarehouseFormSchema } from "../types";

export const useCreateWarehouse = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<CreateWarehouseFormSchema>({
    resolver: zodResolver(createWarehouseFormSchema()),
    defaultValues: {
      name: "",
      address: "",
      storeId: "",
    },
  });

  const apiWarehouseUtils = api.useUtils().warehouse;

  const { mutateAsync: createWarehouse, isPending: isCreateWarehousePending } =
    api.warehouse.create.useMutation({
      onSuccess: () => {
        form.reset();
        void apiWarehouseUtils.getAll.invalidate();
        void router.push("/dashboard/warehouse");
        toast.success(
          capitalizeSentence(
            t("successes.message.create", {
              field: t("models.warehouse.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.create", {
                field: t("models.warehouse.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = async (values: CreateWarehouseFormSchema) => {
    let imageUrl = null;
    const warehouseId = crypto.randomUUID();

    try {
      if (values.image) {
        setIsUploadingImage(true);

        const fileName = `${warehouseId}.jpeg`;

        imageUrl = await uploadImage(
          SUPABASE_BUCKET.Warehouse,
          fileName,
          values.image,
        );

        setIsUploadingImage(false);
      }

      await createWarehouse({
        id: warehouseId,
        request: {
          ...values,
          image: imageUrl,
        },
      });
    } catch {
      setIsUploadingImage(false);

      if (imageUrl) {
        await deleteImageByUrl(SUPABASE_BUCKET.Warehouse, imageUrl);
      }
    }
  };

  return {
    form,
    createWarehouse,
    onSubmit,
    isCreateWarehousePending: isCreateWarehousePending || isUploadingImage,
  };
};
