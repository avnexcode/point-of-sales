import type { SettingsResponse } from "@/features/settings/types";
import type { UserResponse } from "@/features/user/types";
import { createContext } from "react";

export type AuthContextProps = {
  isLogin: boolean;
  isLoading: boolean;
  user?: UserResponse;
  settings?: SettingsResponse;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
