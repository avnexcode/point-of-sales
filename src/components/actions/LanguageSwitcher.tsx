"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks";
import { renderElements } from "@/utils";
import * as Flag from "country-flag-icons/react/3x2";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { languages, handleLanguageChange } = useLanguage();
  const { i18n } = useTranslation();
  const flags = {
    en: <Flag.US />,
    id: <Flag.ID />,
  } as const;

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[170px] gap-2">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {renderElements({
          of: Object.entries(languages),
          keyExtractor: ([code]) => code,
          render: ([code, name]) => (
            <SelectItem value={code} className="cursor-pointer">
              {flags[code as keyof typeof flags] ?? <Globe />}
              {name}
            </SelectItem>
          ),
        })}
      </SelectContent>
    </Select>
  );
};
