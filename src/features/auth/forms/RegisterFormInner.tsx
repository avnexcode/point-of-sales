import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePasswordVisibility } from "../components";
import type { RegisterFormSchema } from "../types";
import { useTranslation } from "react-i18next";
import { capitalizeSentence } from "@/utils";

type RegisterFormInnerProps = {
  formId: string;
  onSubmit: (values: RegisterFormSchema) => void;
};

export const RegisterFormInner = ({
  formId,
  onSubmit,
}: RegisterFormInnerProps) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const form = useFormContext<RegisterFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.user.fields.name")}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder={t("forms.placeholders.input", {
                field: t("models.user.fields.name"),
              })}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.auth.fields.email")}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder={t("forms.placeholders.input", {
                field: t("models.auth.fields.email"),
              })}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.auth.fields.password")}
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={field.name}
                type={isPasswordVisible ? "text" : "password"}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder={t("forms.placeholders.input", {
                  field: t("models.auth.fields.password"),
                })}
              />
              <TogglePasswordVisibility
                isVisible={isPasswordVisible}
                setIsVisible={setIsPasswordVisible}
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.auth.fields.confirmPassword")}
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={field.name}
                type={isConfirmPasswordVisible ? "text" : "password"}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder={t("forms.placeholders.input", {
                  field: t("models.auth.fields.confirmPassword"),
                })}
              />
              <TogglePasswordVisibility
                isVisible={isConfirmPasswordVisible}
                setIsVisible={setIsConfirmPasswordVisible}
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
};
