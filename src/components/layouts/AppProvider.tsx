import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { Suspense, forwardRef } from "react";
import { Toaster as Sooner } from "sonner";
import { Loader } from "../elements";
import { Providers } from "./providers";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: "400",
// });

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

type AppProviderProps = React.ComponentProps<"main">;

export const AppProvider = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & AppProviderProps
>(({ children, className, ...props }, ref) => {
  return (
    <main ref={ref} className={cn(jetbrains.className, className)} {...props}>
      <Suspense fallback={<Loader />}>
        <Providers>{children}</Providers>
      </Suspense>
      <Sooner position="top-center" />
    </main>
  );
});

AppProvider.displayName = "AppProvider";
