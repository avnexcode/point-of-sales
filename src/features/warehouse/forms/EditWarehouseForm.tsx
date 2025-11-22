import { InputImageSkeleton, InputTextSkeleton } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateWarehouse } from "../hooks";
import type { WarehouseResponse } from "../types";
import { EditWarehouseFormInner } from "./EditWarehouseFormInner";

type EditWarehouseFormProps = {
  warehouse?: WarehouseResponse;
  isWarehouseLoading: boolean;
};

export const EditWarehouseForm = ({
  warehouse,
  isWarehouseLoading,
}: EditWarehouseFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit, hasWarehouseChanges, isUpdateWarehousePending } =
    useUpdateWarehouse(warehouse);

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>
            {t("pages.warehouse.forms.update.header.title")}
          </Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.warehouse.forms.update.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          {isWarehouseLoading ? (
            <div className="space-y-5">
              {[...new Array<undefined>(2)].map((_, index) => {
                return <InputTextSkeleton key={index} />;
              })}
              <InputImageSkeleton />
              <InputTextSkeleton />
            </div>
          ) : (
            <EditWarehouseFormInner
              formId="update-warehouse-form"
              onSubmit={onSubmit}
              image={warehouse?.image}
            />
          )}
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={`/dashboard/warehouse`}>
            {t("pages.warehouse.forms.update.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="update-warehouse-form"
          className="w-full px-20 xl:w-fit"
          disabled={isUpdateWarehousePending || !hasWarehouseChanges}
        >
          {isUpdateWarehousePending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.warehouse.forms.update.footer.submitButtonLoading")} . .
              .
            </>
          ) : (
            t("pages.warehouse.forms.update.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
