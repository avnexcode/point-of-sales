import type { Settings, User } from "@prisma/client";
import { createContext } from "react";

export type AuthContextProps = {
  isLogin: boolean;
  isLoading: boolean;
  user?: User;
  settings?: Settings;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
