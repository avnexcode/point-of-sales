import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { renderElements } from "@/utils";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

type InputSelectProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: string;
  required?: boolean;
  options: { label: string; value: PathValue<T, TName> }[];
  className?: string;
};

export const InputSelect = <T extends FieldValues, TName extends Path<T>>({
  name,
  label,
  required = false,
  className,
  options,
}: InputSelectProps<T, TName>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn("w-full xl:max-w-[180px]", className)}
        >
          <FieldLabel htmlFor={field.name} className="capitalize">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue
                placeholder={t("forms.placeholders.select", {
                  field: label,
                })}
              />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
              {renderElements({
                of: options,
                keyExtractor: (option, index) => `${option.value}-${index}`,
                render: (option) => (
                  <SelectItem
                    value={String(option.value)}
                    className="capitalize"
                  >
                    {option.label}
                  </SelectItem>
                ),
              })}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const InputSelectSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
};
