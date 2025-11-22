import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteWarehouse = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const apiWarehouseUtils = api.useUtils().warehouse;

  const { mutate: deleteWarehouse, isPending: isDeleteWarehousePending } =
    api.warehouse.delete.useMutation({
      onSuccess: () => {
        void apiWarehouseUtils.getAll.invalidate();
        void router.replace("/dashboard/warehouse");
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", {
              field: t("models.warehouse.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.error(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.warehouse.title"),
              }),
            ),
        );
      },
    });

  const handleDeleteWarehouse = (id: string) => {
    deleteWarehouse({ request: { id } });
  };

  return { deleteWarehouse, handleDeleteWarehouse, isDeleteWarehousePending };
};
