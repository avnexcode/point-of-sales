import { useAuth } from "@/hooks";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const { isLogin, settings } = useAuth();
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => setMount(true), []);

  const defaultTheme = useMemo(() => {
    if (!mount || !isLogin || !settings?.theme) return "system";

    const theme = settings.theme.toLowerCase().trim();

    return theme;
  }, [mount, isLogin, settings?.theme]);

  if (!mount) return <>{children}</>;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};
