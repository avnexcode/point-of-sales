"use client";
import { AuthContext, type AuthContextProps } from "@/context";
import { api } from "@/utils";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: user, isLoading: isUserLoading } =
    api.auth.getProfile.useQuery();
  const { data: settings, isLoading: isSettingsLoading } =
    api.settings.getByUser.useQuery();

  const context: AuthContextProps = {
    isLogin: !!user,
    isLoading: isUserLoading || isSettingsLoading,
    user,
    settings,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
