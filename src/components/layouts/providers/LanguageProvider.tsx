"use client";
import { useAuth } from "@/hooks";
import i18n from "@/lib/i18n/client";
import { defaultNS } from "@/lib/i18n/resources";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { settings, isLogin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentLocale = router.locale ?? router.defaultLocale;

  useEffect(() => {
    if (mounted && currentLocale !== i18n.language) {
      void i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, mounted]);

  useEffect(() => {
    if (!mounted || !isLogin || !settings?.language) return;

    const userLanguage = settings.language.toLowerCase();

    if (userLanguage !== currentLocale) {
      void router.push(router.pathname, router.asPath, {
        locale: userLanguage,
        shallow: true,
      });
    }
  }, [isLogin, settings?.language, currentLocale, router, mounted]);

  if (!mounted) return <>{children}</>;

  return (
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
      {children}
    </I18nextProvider>
  );
};
