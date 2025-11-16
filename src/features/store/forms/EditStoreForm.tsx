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
import { useUpdateStore } from "../hooks";
import type { StoreResponse } from "../types";
import { EditStoreFormInner } from "./EditStoreFormInner";

type EditStoreFormProps = {
  store: StoreResponse;
};

export const EditStoreForm = ({ store }: EditStoreFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit, hasStoreChanges, isUpdateStorePending } =
    useUpdateStore(store);

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>
            {t("pages.store.forms.update.header.title")}
          </Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.store.forms.update.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <EditStoreFormInner
            formId="update-store-form"
            onSubmit={onSubmit}
            image={store.image}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={`/dashboard/store/${store.id}/view`}>
            {t("pages.store.forms.update.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="update-store-form"
          className="w-full px-20 xl:w-fit"
          disabled={isUpdateStorePending || !hasStoreChanges}
        >
          {isUpdateStorePending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.store.forms.update.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.store.forms.update.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
