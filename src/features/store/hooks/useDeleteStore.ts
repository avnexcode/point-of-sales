import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteStore = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const apiStoreUtils = api.useUtils().store;

  const { mutate: deleteStore, isPending: isDeleteStorePending } =
    api.store.delete.useMutation({
      onSuccess: () => {
        void apiStoreUtils.getAll.invalidate();
        void router.replace("/dashboard/store");
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", { field: t("models.store.title") }),
          ),
        );
      },
      onError: (error) => {
        toast.error(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.store.title"),
              }),
            ),
        );
      },
    });

  const handleDeleteStore = (id: string) => {
    deleteStore({ request: { id } });
  };

  return { deleteStore, handleDeleteStore, isDeleteStorePending };
};
