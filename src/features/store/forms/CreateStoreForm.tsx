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
import { useCreateStore } from "../hooks";
import { CreateStoreFormInner } from "./CreateStoreFormInner";

export const CreateStoreForm = () => {
  const { t } = useTranslation();
  const { form, onSubmit, isCreateStorePending } = useCreateStore();

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>
            {t("pages.store.forms.create.header.title")}
          </Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.store.forms.create.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <CreateStoreFormInner
            formId="create-store-form"
            onSubmit={onSubmit}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={"/dashboard/store"}>
            {t("pages.store.forms.create.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="create-store-form"
          className="w-full px-20 xl:w-fit"
          disabled={isCreateStorePending}
        >
          {isCreateStorePending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.store.forms.create.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.store.forms.create.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
