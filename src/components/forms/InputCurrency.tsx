import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  formatCurrency,
  getCurrencySymbol,
  inputHandle,
  removeNumberFormatting,
  type CurrencyCode,
} from "@/utils";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type InputCurrencyProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  currency?: CurrencyCode;
  showSymbol?: boolean;
};

export const InputCurrency = <T extends FieldValues>({
  name,
  label,
  required,
  className,
  currency = "IDR",
  showSymbol = true,
}: InputCurrencyProps<T>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const numericValue = field.value ? parseFloat(field.value) : 0;

        const displayValue =
          numericValue > 0
            ? formatCurrency(numericValue, currency, false, false)
            : "";

        const currencySymbol = showSymbol ? getCurrencySymbol(currency) : "";

        return (
          <Field data-invalid={fieldState.invalid} className={cn(className)}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>

            <div className="relative">
              {showSymbol && currencySymbol && (
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium">
                  {currencySymbol}
                </span>
              )}

              <Input
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                value={displayValue}
                placeholder={t("forms.placeholders.input", {
                  field: label,
                })}
                className={cn(showSymbol && currencySymbol && "pl-12")}
                onChange={(e) => {
                  inputHandle("onChange", "number", e);

                  const cleanValue = removeNumberFormatting(e.target.value);

                  field.onChange(cleanValue || "");
                }}
                onPaste={(e) => {
                  inputHandle("onPaste", "number", e);

                  const cleanValue = removeNumberFormatting(
                    e.currentTarget.value,
                  );

                  field.onChange(cleanValue || "");
                }}
                onBlur={field.onBlur}
              />
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
