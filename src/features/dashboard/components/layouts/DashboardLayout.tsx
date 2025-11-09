import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { DashboardFooter } from "../DashboardFooter";
import { DashboardHeader } from "../DashboardHeader";

type DashboardLayoutProps = {
  withHeader?: boolean;
  withFooter?: boolean;
  title: string;
};

export const DashboardLayout = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & DashboardLayoutProps
>(
  (
    {
      children,
      className,
      withHeader = true,
      withFooter = false,
      title,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("h-full w-full")}>
        {withHeader && <DashboardHeader title={title} />}
        <main
          ref={ref}
          className={cn("flex flex-col xl:my-5", className)}
          {...props}
        >
          {children}
        </main>
        {withFooter && <DashboardFooter />}
      </div>
    );
  },
);

DashboardLayout.displayName = "DashboardLayout";
