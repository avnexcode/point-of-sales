import { useAuth } from "@/hooks/useAuth";
import { api } from "@/utils";
import type { Theme } from "@prisma/client";
import { useTheme as useDefaultTheme } from "next-themes";
import { toast } from "sonner";

export const useTheme = () => {
  const { theme: defaultTheme, themes, setTheme } = useDefaultTheme();
  const { isLogin, settings } = useAuth();

  const apiSettingsUtils = api.useUtils().settings;

  const { mutate: updateSettings, isPending: isUpdateSettingsPending } =
    api.settings.update.useMutation({
      onSuccess: async (data) => {
        await apiSettingsUtils.invalidate();
        setTheme(data.theme);
        toast.success("Settings update successfully");
      },
    });

  const handleThemeChange = (theme: Theme) => {
    if (isLogin) {
      updateSettings({
        id: settings?.id ?? "",
        request: { theme: theme.toUpperCase() as Theme },
      });
    } else {
      setTheme(theme);
    }
  };

  return { defaultTheme, themes, handleThemeChange, isUpdateSettingsPending };
};
