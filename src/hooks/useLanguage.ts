"use client";
import { useAuth } from "@/hooks";
import { supportedLngs } from "@/lib/i18n/resources";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useLanguage = () => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const { isLogin } = useAuth();

  const languages = Object.fromEntries(
    supportedLngs.map((lng) => [lng, t(`languages.${lng}`)]),
  ) as Record<(typeof supportedLngs)[number], string>;

  const handleLanguageChange = async (newLocale: string) => {
    try {
      await i18n.changeLanguage(newLocale);

      void router.push(router.pathname, router.asPath, {
        locale: newLocale,
        shallow: !isLogin,
      });

      // if (isLogin) {
      //   await updateUserSettings({ language: newLocale.toUpperCase() });
      //   document.cookie = `i18next=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      // }
    } catch {
      toast.error("Failed to save language preference");
    }
  };

  return { languages, handleLanguageChange };
};
