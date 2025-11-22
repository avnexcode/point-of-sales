import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { inputHandle, removeNumberFormatting } from "@/utils";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

type InputStringNumberProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
};

export const InputStringNumber = <T extends FieldValues>({
  name,
  label,
  required,
  className,
}: InputStringNumberProps<T>) => {
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
            onChange={(e) => {
              inputHandle("onChange", "number", e);
              const cleanValue = removeNumberFormatting(e.target.value);
              field.onChange(cleanValue || "");
            }}
            onPaste={(e) => {
              inputHandle("onPaste", "number", e);
              const cleanValue = removeNumberFormatting(e.currentTarget.value);
              field.onChange(cleanValue || "");
            }}
            onBlur={field.onBlur}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const InputStringNumberSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
};
