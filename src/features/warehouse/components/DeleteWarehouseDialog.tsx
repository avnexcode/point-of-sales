import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteWarehouse } from "../hooks";

type DeleteWarehouseDialogProps = {
  warehouseId: string;
  disabled: boolean;
  className?: string;
};

export const DeleteWarehouseDialog = ({
  warehouseId,
  disabled = false,
  className,
}: DeleteWarehouseDialogProps) => {
  const { t } = useTranslation();
  const { handleDeleteWarehouse, isDeleteWarehousePending } =
    useDeleteWarehouse();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className={cn("w-full", className)}
          disabled={disabled || isDeleteWarehousePending}
        >
          {isDeleteWarehousePending ? (
            <>
              <Loader2 className="animate-spin" />
              {t(
                "components.warehouse.deleteWarehouseDialog.deleteButtonLoading",
              )}
            </>
          ) : (
            t("components.warehouse.deleteWarehouseDialog.deleteButton")
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("components.warehouse.deleteWarehouseDialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("components.warehouse.deleteWarehouseDialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("components.warehouse.deleteWarehouseDialog.cancelButton")}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              onClick={() => handleDeleteWarehouse(warehouseId)}
              disabled={isDeleteWarehousePending}
            >
              {isDeleteWarehousePending ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t(
                    "components.warehouse.deleteWarehouseDialog.deleteButtonLoading",
                  )}
                </>
              ) : (
                t("components.warehouse.deleteWarehouseDialog.deleteButton")
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
