"use client";
import { useForm } from "react-hook-form";
import type { AdminLoginFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminLoginFormSchema } from "../schemas";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { SupabaseAuthErrorCode } from "@/lib/supabase/auth-error-code";
import type { AuthError } from "@supabase/supabase-js";

export const useLoginAdmin = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const login = async (values: AdminLoginFormSchema) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(values);

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
        case SupabaseAuthErrorCode.email_not_confirmed:
          form.setError("email", {
            message: t("errors.messages.supabase.auth.emailNotConfirmed"),
          });
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

  const form = useForm<AdminLoginFormSchema>({
    resolver: zodResolver(createAdminLoginFormSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AdminLoginFormSchema) => {
    await login(values);
  };

  const isLoginPending = form.formState.isSubmitting;

  return { form, login, isLoginPending, onSubmit };
};
