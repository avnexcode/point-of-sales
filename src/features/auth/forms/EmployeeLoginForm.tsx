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
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLoginEmployee } from "../hooks";
import { EmployeeLoginFormInner } from "./EmployeeLoginFormInner";

export const EmployeeLoginForm = () => {
  const { t } = useTranslation();
  const { form, isLoginPending, onSubmit } = useLoginEmployee();
  return (
    <Card className="sm:bg-card w-full rounded-none border-0 bg-transparent shadow-none sm:rounded-xl sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle>
          <Heading size={"h3"}>
            {t("pages.auth.forms.login.header.title")}
          </Heading>
        </CardTitle>
        <CardDescription>
          {t("pages.auth.forms.login.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <EmployeeLoginFormInner
            formId="employee-login-form"
            onSubmit={onSubmit}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="py-5">
        <Button
          form="employee-login-form"
          className="w-full"
          disabled={isLoginPending}
        >
          {isLoginPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.auth.forms.login.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.auth.forms.login.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
