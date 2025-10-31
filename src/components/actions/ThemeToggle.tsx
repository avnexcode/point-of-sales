"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="max-w-fit min-w-fit justify-start"
    >
      <div className="flex dark:hidden">
        <Moon className="size-5" />
      </div>

      <div className="hidden dark:flex">
        <Sun className="size-5" />
      </div>

      <span className="sr-only">Change theme</span>
    </Button>
  );
};
