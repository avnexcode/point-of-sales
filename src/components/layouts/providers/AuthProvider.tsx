"use client";
import { AuthContext, type AuthContextProps } from "@/context";
import { api } from "@/utils";
import { useCallback, useMemo, useState } from "react";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  const { data: user, isLoading: isUserLoading } = api.auth.getProfile.useQuery(
    undefined,
    useMemo(
      () => ({
        enabled: checkingAuth,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: (failureCount, error) => {
          if (
            error.data?.httpStatus === 401 &&
            error.data.code === "UNAUTHORIZED"
          )
            return false;
          return failureCount < 2;
        },
      }),
      [checkingAuth],
    ),
  );

  const { data: settings, isLoading: isSettingsLoading } =
    api.settings.getByUser.useQuery(
      undefined,
      useMemo(
        () => ({
          enabled: checkingAuth,
          staleTime: 5 * 60 * 1000,
          cacheTime: 10 * 60 * 1000,
          retry: (failureCount, error) => {
            if (
              error.data?.httpStatus === 401 &&
              error.data.code === "UNAUTHORIZED"
            )
              return false;
            return failureCount < 2;
          },
        }),
        [checkingAuth],
      ),
    );

  const startAuthCheck = useCallback(() => {
    setCheckingAuth(true);
  }, []);

  const stopAuthCheck = useCallback(() => {
    setCheckingAuth(false);
  }, []);

  const context: AuthContextProps = useMemo(
    () => ({
      isLogin: !!user,
      isLoading: isUserLoading || isSettingsLoading,
      user,
      settings,
      startAuthCheck,
      stopAuthCheck,
    }),
    [
      isSettingsLoading,
      isUserLoading,
      settings,
      startAuthCheck,
      stopAuthCheck,
      user,
    ],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
