"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "../hooks";
import { renderElements } from "@/utils";
import { Globe } from "lucide-react";
import { Icon } from "../../../components/ui/icon";

export const ThemeSwitcher = () => {
  const { defaultTheme, themes, handleThemeChange, isUpdateSettingsPending } =
    useTheme();

  const icons = {
    light: <Icon name="Sun" />,
    dark: <Icon name="Moon" />,
    system: <Icon name="Computer" />,
  } as const;

  return (
    <Select
      value={defaultTheme}
      onValueChange={handleThemeChange}
      disabled={isUpdateSettingsPending}
    >
      <SelectTrigger className="w-[170px] gap-2 capitalize">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {renderElements({
          of: themes,
          keyExtractor: (theme) => theme,
          render: (theme) => {
            return (
              <SelectItem value={theme} className="cursor-pointer capitalize">
                {icons[theme as keyof typeof icons] ?? <Globe />}
                {theme}
              </SelectItem>
            );
          },
        })}
      </SelectContent>
    </Select>
  );
};
