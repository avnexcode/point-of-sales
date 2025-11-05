"use client";
import { useForm } from "react-hook-form";
import type { EmployeeLoginFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeeLoginFormSchema } from "../schemas";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { SupabaseAuthErrorCode } from "@/lib/supabase/auth-error-code";
import type { AuthError } from "@supabase/supabase-js";

export const useLoginEmployee = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const login = async (values: EmployeeLoginFormSchema) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "",
        password: "",
      });

      if (error) {
        form.setValue("password", "");
        throw error;
      }

      toast.success(t("successes.message.login"));

      if (data.session) {
        void router.replace("/");
        router.reload();
      }
    } catch (error) {
      const code = (error as AuthError).code;
      switch (code) {
        case SupabaseAuthErrorCode.invalid_credentials:
          toast.error(t("errors.messages.supabase.auth.invalidCredentials"));
          break;
        case SupabaseAuthErrorCode.user_banned:
          toast.error(t("errors.messages.supabase.auth.userBanned"));
          break;
        case SupabaseAuthErrorCode.over_request_rate_limit:
          toast.error(t("errors.messages.supabase.auth.overRequestRateLimit"));
          break;
        case SupabaseAuthErrorCode.request_timeout:
          toast.error(t("errors.messages.supabase.auth.requestTimeout"));
          break;
        case SupabaseAuthErrorCode.unexpected_failure:
          toast.error(t("errors.messages.supabase.auth.unexpectedFailure"));
          break;
        default:
          toast.error(t("errors.messages.supabase.auth.default"));
      }
    }
  };

  const form = useForm<EmployeeLoginFormSchema>({
    resolver: zodResolver(createEmployeeLoginFormSchema()),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: EmployeeLoginFormSchema) => {
    await login(values);
  };

  const isLoginPending = form.formState.isSubmitting;

  return { form, login, isLoginPending, onSubmit };
};
