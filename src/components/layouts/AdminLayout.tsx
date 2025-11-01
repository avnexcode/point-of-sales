import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { forwardRef } from "react";
import { AppSidebar } from "../fragments/sidebar";

type AdminLayoutProps = {
  sidebarDefaultOpen?: boolean;
};

export const AdminLayout = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & AdminLayoutProps
>(({ children, className, sidebarDefaultOpen = false, ...props }, ref) => {
  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen}>
      <AppSidebar />
      <main ref={ref} className={cn("h-full w-full", className)} {...props}>
        {children}
      </main>
    </SidebarProvider>
  );
});

AdminLayout.displayName = "AdminLayout";
