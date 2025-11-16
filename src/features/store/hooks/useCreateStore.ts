import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { deleteImageByUrl, uploadImage } from "@/lib/supabase/image-upload";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createStoreFormSchema } from "../schemas";
import type { CreateStoreFormSchema } from "../types";

export const useCreateStore = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<CreateStoreFormSchema>({
    resolver: zodResolver(createStoreFormSchema()),
    defaultValues: {
      name: "",
      address: "",
      discount: "NONE",
      totalDiscount: "",
      tax: "NONE",
      totalTax: "",
    },
  });

  const apiStoreUtils = api.useUtils().store;

  const { mutateAsync: createStore, isPending: isCreateStorePending } =
    api.store.create.useMutation({
      onSuccess: () => {
        form.reset();
        void apiStoreUtils.getAll.invalidate();
        void router.push("/dashboard/store");
        toast.success(
          capitalizeSentence(
            t("successes.message.create", { field: t("models.store.title") }),
          ),
        );
      },
      onError: (error) => {
        toast.success(error.message || "Success create store");
      },
    });

  const onSubmit = async (values: CreateStoreFormSchema) => {
    let imageUrl = null;
    const storeId = crypto.randomUUID();

    try {
      if (values.image) {
        setIsUploadingImage(true);

        const fileName = `${storeId}.jpeg`;
        console.log({ storeId });

        imageUrl = await uploadImage(
          SUPABASE_BUCKET.Store,
          fileName,
          values.image,
        );

        setIsUploadingImage(false);
      }
      await createStore({
        id: storeId,
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
    createStore,
    onSubmit,
    isCreateStorePending: isCreateStorePending || isUploadingImage,
  };
};

// const reader = new FileReader();
// reader.onload = () => {
//   const result = reader.result as string;
//   const imageBase64 = result.substring(result.indexOf(",") + 1);
//   createStore({
//     request: {
//       ...values,
//       image: imageBase64,
//       totalDiscount: Number(values.totalDiscount),
//       totalTax: Number(values.totalTax),
//     },
//   });
// };

// reader.readAsDataURL(values.image);
