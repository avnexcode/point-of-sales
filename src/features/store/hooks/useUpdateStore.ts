import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { deleteImageByUrl, uploadImage } from "@/lib/supabase/image-upload";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateStoreFormSchema } from "../schemas";
import type { StoreResponse, UpdateStoreFormSchema } from "../types";

export const useUpdateStore = (store: StoreResponse) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [hasStoreChanges, setHasStoreChanges] = useState(false);
  const [initialData, setInitialData] = useState<UpdateStoreFormSchema | null>(
    null,
  );

  const form = useForm<UpdateStoreFormSchema>({
    resolver: zodResolver(updateStoreFormSchema()),
    defaultValues: {
      name: store.name,
      address: store.address,
      discount: store.discount,
      totalDiscount: String(store.totalDiscount),
      tax: store.tax,
      totalTax: String(store.totalTax),
    },
  });

  useEffect(() => {
    const initStoreValues = {
      name: store.name,
      address: store.address,
      discount: store.discount,
      totalDiscount: String(store.totalDiscount),
      tax: store.tax,
      totalTax: String(store.totalTax),
    };

    form.reset(initStoreValues);
    setInitialData(initStoreValues);
  }, [store, form]);

  const watchedValues = form.watch();
  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasStoreChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiStoreUtils = api.useUtils().store;

  const { mutateAsync: updateStore, isPending: isUpdateStorePending } =
    api.store.update.useMutation({
      onSuccess: () => {
        void apiStoreUtils.getAll.invalidate();
        void router.replace("/dashboard/store");
        toast.success(
          capitalizeSentence(
            t("successes.message.update", { field: t("models.store.title") }),
          ),
        );
      },
    });

  const onSubmit = async (values: UpdateStoreFormSchema) => {
    let imageUrl = store.image;
    try {
      if (values.image) {
        setIsUploadingImage(true);

        const fileName = `${store.id}.jpeg`;

        imageUrl = await uploadImage(
          SUPABASE_BUCKET.Store,
          fileName,
          values.image,
        );

        setIsUploadingImage(false);
      }
      await updateStore({
        id: store.id,
        request: {
          ...values,
          image: imageUrl,
          totalDiscount: Number(values.totalDiscount),
          totalTax: Number(values.totalTax),
        },
      });
    } catch (error) {
      setIsUploadingImage(false);

      if (imageUrl) {
        await deleteImageByUrl(SUPABASE_BUCKET.Store, imageUrl);
      }
      throw error;
    }
  };

  return {
    form,
    updateStore,
    onSubmit,
    hasStoreChanges,
    isUpdateStorePending: isUpdateStorePending || isUploadingImage,
  };
};
