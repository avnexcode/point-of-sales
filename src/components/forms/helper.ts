import {
  InputCurrency as BaseInputCurrency,
  InputImage as BaseInputImage,
  InputStringNumber as BaseInputStringNumber,
  InputText as BaseInputText,
} from "@/components/forms";
import { useFormContext, type FieldValues } from "react-hook-form";

export const useFormInput = <T extends FieldValues>() => {
  useFormContext<T>();

  return {
    InputText: BaseInputText<T>,
    InputCurrency: BaseInputCurrency<T>,
    InputImage: BaseInputImage<T>,
    InputStringNumber: BaseInputStringNumber<T>,
  };
};
