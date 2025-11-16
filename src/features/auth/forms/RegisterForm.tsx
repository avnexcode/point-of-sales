"use client";
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
import { useRegister } from "../hooks";
import { RegisterFormInner } from "./RegisterFormInner";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const { form, isRegisterPending, onSubmit } = useRegister();

  return (
    <Card className="sm:bg-card w-full max-w-2xl rounded-none border-0 bg-transparent shadow-none sm:rounded-xl sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>
            {t("pages.auth.forms.register.header.title")}
          </Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.auth.forms.register.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <RegisterFormInner formId="register-form" onSubmit={onSubmit} />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col place-content-between gap-y-5 pt-5">
        <Button
          form="register-form"
          className="w-full"
          disabled={isRegisterPending}
        >
          {isRegisterPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.auth.forms.register.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.auth.forms.register.footer.submitButton")
          )}
        </Button>
        <span className="text-muted-foreground text-sm">
          {t("pages.auth.forms.register.footer.caption")}{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 underline hover:underline"
          >
            {t("pages.auth.forms.register.footer.captionRedirect")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
