"use client";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createRegisterFormSchema } from "../schemas";
import type { RegisterFormSchema } from "../types";

export const useRegister = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate: register, isPending: isRegisterPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        toast.success(t("successes.message.register"));
        void router.push("/login");
      },
      onError: (error) => {
        form.setValue("password", "");
        form.setValue("confirmPassword", "");
        toast.error(error.message || t("errors.messages.register"));
      },
    });

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(createRegisterFormSchema()),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormSchema) => {
    register({ request: values });
  };

  return { form, register, isRegisterPending, onSubmit };
};
