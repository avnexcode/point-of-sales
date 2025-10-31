import { useAuth } from "@/hooks";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const ThemeSync = () => {
  const { isLogin, settings } = useAuth();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isLogin && settings?.theme) {
      const theme = settings.theme.toLowerCase().trim();
      setTheme(theme);
    }
  }, [isLogin, settings?.theme, setTheme]);

  return null;
};

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => setMount(true), []);

  if (!mount) return <>{children}</>;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={"system"}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
};
