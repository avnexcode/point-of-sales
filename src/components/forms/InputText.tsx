import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

type InputTextProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
};

export const InputText = <T extends FieldValues>({
  name,
  label,
  required,
  className,
}: InputTextProps<T>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(className)}>
          <FieldLabel htmlFor={field.name} className="capitalize">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            type="text"
            aria-invalid={fieldState.invalid}
            placeholder={t("forms.placeholders.input", {
              field: label,
            })}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const InputTextSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
};
