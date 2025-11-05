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
import { OAuthSignIn } from "../components";
import { useLoginAdmin } from "../hooks";
import { AdminLoginFormInner } from "./AdminLoginFormInner";

export const AdminLoginForm = () => {
  const { t } = useTranslation();
  const { form, isLoginPending, onSubmit } = useLoginAdmin();

  return (
    <Card className="sm:bg-card w-full rounded-none border-0 bg-transparent shadow-none sm:rounded-xl sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>{t("pages.auth.login.header.title")}</Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.auth.login.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthSignIn />
        <div className="flex w-full items-center gap-2 pt-8 pb-5 text-xs text-nowrap">
          <div className="bg-secondary h-0.5 w-full rounded-xl" />
          OR LOGIN WITH
          <div className="bg-secondary h-0.5 w-full rounded-xl" />
        </div>
        <FormProvider {...form}>
          <AdminLoginFormInner formId="admin-login-form" onSubmit={onSubmit} />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col place-content-between gap-y-5 pt-5">
        <Button
          form="admin-login-form"
          className="w-full"
          disabled={isLoginPending}
        >
          {isLoginPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.auth.login.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.auth.login.footer.submitButton")
          )}
        </Button>
        <span className="text-muted-foreground text-sm">
          {t("pages.auth.login.footer.caption")}{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 underline hover:underline"
          >
            {t("pages.auth.login.footer.captionRedirect")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
