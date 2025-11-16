import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/configs/env";
import { useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateStoreFormSchema } from "../types";

type CreateStoreFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateStoreFormSchema) => void;
};

export const CreateStoreFormInner = ({
  formId,
  onSubmit,
}: CreateStoreFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<CreateStoreFormSchema>();
  const defaultImage = String(env.NEXT_PUBLIC_STORE_IMAGE);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const selectedImage = form.watch("image");

  const selectedImagePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return null;
  }, [selectedImage]);

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
              {t("models.store.fields.name")}
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder={t("forms.placeholders.input", {
                field: t("models.store.fields.name"),
              })}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {t("models.store.fields.address")}
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder={t("forms.placeholders.input", {
                field: t("models.store.fields.address"),
              })}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex flex-col gap-2">
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="capitalize">
                {t("models.store.fields.image")}{" "}
                <span className="text-red-500">*</span>
              </FieldLabel>

              {/* Preview Gambar */}
              <div className="relative mt-2 max-h-[400px] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-md border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImagePreview ?? defaultImage}
                  alt="store-image-preview"
                  className="h-auto w-full object-contain"
                />
              </div>

              {/* Tombol Pilih/Ganti File */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleOpenFileExplorer}
                  className="px-10"
                >
                  {!!selectedImage
                    ? t("forms.actions.changeFile")
                    : t("forms.actions.chooseFile")}
                </Button>

                {selectedImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      form.setValue("image", null);
                    }}
                    className="px-10"
                  >
                    {t("forms.actions.removeFile")}
                  </Button>
                )}
              </div>

              {/* Input File Tersembunyi */}
              <input
                id={field.name}
                type="file"
                accept="image/*"
                ref={inputFileRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-y-5 xl:flex-row xl:gap-x-2 xl:gap-y-0">
        <Controller
          name="discount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="w-full xl:max-w-[180px]"
            >
              <FieldLabel htmlFor={field.name} className="capitalize">
                {t("models.store.fields.discount")}
              </FieldLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={t("forms.placeholders.select", {
                      field: t("models.store.fields.discount"),
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="NOMINAL">Nominal</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="totalDiscount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="capitalize">
                {t("models.store.fields.totalDiscount")}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t("forms.placeholders.input", {
                  field: t("models.store.fields.totalDiscount"),
                })}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-y-5 xl:flex-row xl:gap-x-2 xl:gap-y-0">
        <Controller
          name="tax"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="w-full xl:max-w-[180px]"
            >
              <FieldLabel htmlFor={field.name} className="capitalize">
                {t("models.store.fields.tax")}
              </FieldLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={t("forms.placeholders.select", {
                      field: t("models.store.fields.tax"),
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="NOMINAL">Nominal</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="totalTax"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="capitalize">
                {t("models.store.fields.totalTax")}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={t("forms.placeholders.input", {
                  field: t("models.store.fields.totalTax"),
                })}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
};
