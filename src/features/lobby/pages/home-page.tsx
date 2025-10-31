import { LanguageSwitcher, ThemeToggle } from "@/components/actions";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Heading } from "@/components/ui/heading";
import { LogoutButton } from "@/features/auth/components";
import { useAuth } from "@/hooks";
import {
  capitalizeWords,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatTime,
  getTimePeriod,
} from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type HomePageProps = {
  sidebarDefaultOpen: boolean;
};

export const HomePage = () => {
  const { t } = useTranslation();
  const { isLoading, isLogin, user, settings } = useAuth();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    if (isLoading) return String(t("common.loading"));
    if (isLogin && user) {
      return String(
        t("greeting.welcomeBack", {
          name: capitalizeWords(user.username),
        }),
      );
    }
    return String(t("greeting.guest"));
  };
  const now = new Date(Date.now() - 2 * 60 * 60 * 1);
  const minutes = new Date(Date.now() - 2 * 60 * 60 * 100);
  const hours = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const weeks = new Date(Date.now() - 2 * 60 * 60 * 100000);
  const months = new Date(Date.now() - 2 * 60 * 60 * 1000000);
  const years = new Date(Date.now() - 2 * 60 * 60 * 10000000);

  return (
    <PageContainer withFooter suppressHydrationWarning>
      <SectionContainer padded className="min-h-screen">
        <div className="flex items-center justify-center gap-x-5 p-5">
          {isLogin ? (
            <LogoutButton />
          ) : (
            <>
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex items-center gap-x-5">
            <div suppressHydrationWarning>{formatTime(currentTime, "24h")}</div>
            <div>{getTimePeriod(currentTime)}</div>
          </div>
          <Heading size="h1">
            {t("home.title", { highlight: t("home.highlight") })}
          </Heading>
          <LanguageSwitcher />
          <p>{formatCurrency(1000000, settings?.currency)}</p>
          <p>{formatDate(new Date(), "full")}</p>
          <p>{formatRelativeTime(now)}</p>
          <p>{formatRelativeTime(minutes)}</p>
          <p>{formatRelativeTime(hours)}</p>
          <p>{formatRelativeTime(weeks)}</p>
          <p>{formatRelativeTime(months)}</p>
          <p>{formatRelativeTime(years)}</p>
          <p className="text-xl">{t("hello")}</p>
          <p className="text-primary text-2xl">{getGreeting()}</p>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

HomePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as HomePageProps;
  return <main>{page}</main>;
};
