"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useLogout } from "../hooks";

type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { handleLogout } = useLogout();

  return (
    <Button onClick={handleLogout} className={cn("justify-start", className)}>
      <LogOut />
      Logout
    </Button>
  );
};
