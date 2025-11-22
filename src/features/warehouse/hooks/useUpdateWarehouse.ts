import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { deleteImageByUrl, uploadImage } from "@/lib/supabase/image-upload";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateWarehouseFormSchema } from "../schemas";
import type { WarehouseResponse } from "../types";
import { type UpdateWarehouseFormSchema } from "./../types/index";

export const useUpdateWarehouse = (warehouse?: WarehouseResponse) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [hasWarehouseChanges, setHasWarehouseChanges] = useState(false);
  const [initialData, setInitialData] =
    useState<UpdateWarehouseFormSchema | null>(null);

  const form = useForm<UpdateWarehouseFormSchema>({
    resolver: zodResolver(updateWarehouseFormSchema()),
    defaultValues: {
      name: "",
      address: "",
      storeId: "",
    },
  });

  useEffect(() => {
    if (warehouse) {
      const initWarehouseValues = {
        name: warehouse.name,
        address: warehouse.address,
        storeId: warehouse.storeId,
      };

      form.reset(initWarehouseValues);

      setInitialData(initWarehouseValues);
    }
  }, [form, warehouse]);

  const watchedValues = form.watch();
  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasWarehouseChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiWarehouseUtils = api.useUtils().warehouse;

  const { mutateAsync: updateWarehouse, isPending: isUpdateWarehousePending } =
    api.warehouse.update.useMutation({
      onSuccess: () => {
        void apiWarehouseUtils.getAll.invalidate();
        void apiWarehouseUtils.getById.invalidate({ id: warehouse?.id });
        void router.replace(`/dashboard/warehouse/${warehouse?.id}/view`);
        toast.success(
          capitalizeSentence(
            t("successes.message.update", {
              field: t("models.warehouse.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.error(
          error.message ||
            capitalizeSentence(
              t("errors.messages.update", {
                field: t("models.warehouse.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = async (values: UpdateWarehouseFormSchema) => {
    if (warehouse) {
      let imageUrl = warehouse.image;
      try {
        if (values.image) {
          setIsUploadingImage(true);

          const fileName = `${warehouse.id}.jpeg`;

          imageUrl = await uploadImage(
            SUPABASE_BUCKET.Warehouse,
            fileName,
            values.image,
          );

          setIsUploadingImage(false);
        }

        await updateWarehouse({
          id: warehouse.id,
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
    }
  };

  return {
    form,
    updateWarehouse,
    onSubmit,
    hasWarehouseChanges,
    isUpdateWarehousePending: isUpdateWarehousePending || isUploadingImage,
  };
};
