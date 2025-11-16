"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "../hooks";
import { renderElements } from "@/utils";
import * as Flag from "country-flag-icons/react/3x2";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const {
    defaultlanguage,
    languages,
    handleLanguageChange,
    isUpdateSettingsPending,
  } = useLanguage();

  const flags = {
    en: <Flag.US />,
    id: <Flag.ID />,
  } as const;

  return (
    <Select
      value={defaultlanguage ?? ""}
      onValueChange={handleLanguageChange}
      disabled={isUpdateSettingsPending}
    >
      <SelectTrigger className="w-[170px] gap-2 capitalize">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {renderElements({
          of: Object.entries(languages),
          keyExtractor: ([code]) => code,
          render: ([code, name]) => (
            <SelectItem value={code} className="cursor-pointer capitalize">
              {flags[code as keyof typeof flags] ?? <Globe />}
              {name}
            </SelectItem>
          ),
        })}
      </SelectContent>
    </Select>
  );
};
