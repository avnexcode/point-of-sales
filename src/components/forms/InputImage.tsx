import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type InputImageprops<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  image?: string | null;
  defaultImage: string;
};

export const InputImage = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
  image,
  defaultImage,
}: InputImageprops<T>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const selectedImage = form.watch(name);

  const selectedImagePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return null;
  }, [selectedImage]);
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

          {/* Preview Gambar */}
          <div className="relative mt-2 max-h-[400px] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-md border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImagePreview ?? image ?? defaultImage}
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
                onClick={() => form.resetField(name)}
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
  );
};
