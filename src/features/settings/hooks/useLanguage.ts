"use client";
import { useAuth } from "@/hooks";
import { supportedLngs } from "@/lib/i18n/resources";
import { api } from "@/utils";
import type { Language } from "@prisma/client";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useLanguage = () => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const { isLogin, settings } = useAuth();

  const languages = Object.fromEntries(
    supportedLngs.map((lng) => [lng, t(`languages.${lng}`)]),
  ) as Record<(typeof supportedLngs)[number], string>;

  const apiSettingsUtils = api.useUtils().settings;

  const { mutate: updateSettings, isPending: isUpdateSettingsPending } =
    api.settings.update.useMutation({
      onSuccess: async (data) => {
        await apiSettingsUtils.invalidate();
        await i18n.changeLanguage(data.language.toLowerCase());
        toast.success("Settings update successfully");
      },
    });

  const handleLanguageChange = (newLocale: Language) => {
    if (!isLogin) {
      void router.push(router.pathname, router.asPath, {
        locale: newLocale,
        shallow: !isLogin,
      });
    } else {
      updateSettings({
        id: settings?.id ?? "",
        request: {
          language: newLocale.toUpperCase() as Language,
        },
      });
      // document.cookie = `language=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    }
  };

  return {
    defaultlanguage: settings?.language.toLowerCase(),
    languages,
    handleLanguageChange,
    isUpdateSettingsPending,
  };
};
