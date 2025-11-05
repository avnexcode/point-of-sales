import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TogglePasswordVisibility } from "../components";
import type { EmployeeLoginFormSchema } from "../types";

type EmployeeLoginFormInnerProps = {
  formId: string;
  onSubmit: (values: EmployeeLoginFormSchema) => void;
};

export const EmployeeLoginFormInner = ({
  formId,
  onSubmit,
}: EmployeeLoginFormInnerProps) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const form = useFormContext<EmployeeLoginFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.auth.fields.username")}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder={t("forms.placeholders.input", {
                field: t("models.auth.fields.username"),
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
    </form>
  );
};
