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
import { useDeleteStore } from "../hooks";
import { useTranslation } from "react-i18next";

type DeleteStoreDialogProps = {
  storeId: string;
  disabled: boolean;
  className?: string;
};

export const DeleteStoreDialog = ({
  storeId,
  disabled = false,
  className,
}: DeleteStoreDialogProps) => {
  const { t } = useTranslation();
  const { handleDeleteStore, isDeleteStorePending } = useDeleteStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className={cn("w-full", className)}
          disabled={disabled || isDeleteStorePending}
        >
          {isDeleteStorePending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("components.store.deleteStoreDialog.deleteButtonLoading")}
            </>
          ) : (
            t("components.store.deleteStoreDialog.deleteButton")
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("components.store.deleteStoreDialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("components.store.deleteStoreDialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("components.store.deleteStoreDialog.cancelButton")}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              onClick={() => handleDeleteStore(storeId)}
              disabled={isDeleteStorePending}
            >
              {isDeleteStorePending ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("components.store.deleteStoreDialog.deleteButtonLoading")}
                </>
              ) : (
                t("components.store.deleteStoreDialog.deleteButton")
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
