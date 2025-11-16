"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/features/settings/hooks";
import { renderElements } from "@/utils";
import getSymbolFromCurrency from "currency-symbol-map";

export const CurrencySwitcher = () => {
  const {
    defaultCurrency,
    currencies,
    handleCurrencyChange,
    isUpdateSettingsPending,
  } = useCurrency();

  return (
    <Select
      value={defaultCurrency ?? ""}
      onValueChange={handleCurrencyChange}
      disabled={isUpdateSettingsPending}
    >
      <SelectTrigger className="w-[170px] gap-2">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {renderElements({
          of: currencies,
          keyExtractor: (currency) => currency,
          render: (currency) => {
            return (
              <SelectItem value={currency} className="cursor-pointer">
                ({getSymbolFromCurrency(currency)}) {currency}
              </SelectItem>
            );
          },
        })}
      </SelectContent>
    </Select>
  );
};
