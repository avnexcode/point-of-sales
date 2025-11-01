import type { SettingsResponse } from "@/features/settings/types";
import type { UserResponse } from "@/features/user/types";
import { createContext } from "react";

export type AuthContextProps = {
  isLogin: boolean;
  isLoading: boolean;
  user?: UserResponse;
  settings?: SettingsResponse;
  startAuthCheck: () => void;
  stopAuthCheck: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
