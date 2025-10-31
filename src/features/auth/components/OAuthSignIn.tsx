"use client";
import { GoogleIcon } from "@/components/elements/icons";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const googleOAuth = async (redirectUrl: string): Promise<string> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  return data?.url ?? "";
};

type OAuthSignInProps = {
  className?: string;
};

export const OAuthSignIn = ({ className }: OAuthSignInProps) => {
  const router = useRouter();
  const authWindowRef = useRef<Window | null>(null);
  const loginCompleteRef = useRef(false);

  useEffect(() => {
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;
    if (!isPWA) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          loginCompleteRef.current = true;

          if (authWindowRef.current && !authWindowRef.current.closed) {
            setTimeout(() => {
              if (authWindowRef.current && !authWindowRef.current.closed) {
                authWindowRef.current.close();
              }
              authWindowRef.current = null;
            }, 500);
          }

          setTimeout(() => router.replace("/dashboard"), 500);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      const isPWA = window.matchMedia("(display-mode: standalone)").matches;
      const redirectUrl = `${window.location.origin}/oauth/callback`;

      if (isPWA) {
        loginCompleteRef.current = false;
        const oauthUrl = await googleOAuth(redirectUrl);
        const authWindow = window.open(oauthUrl, "_blank", "popup");

        if (!authWindow) {
          throw new Error("Failed to open OAuth window. Please enable popups.");
        }

        authWindowRef.current = authWindow;

        const checkWindowInterval = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(checkWindowInterval);
            authWindowRef.current = null;
          }
        }, 1000);
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: redirectUrl,
          },
        });

        if (error) throw error;
      }
    } catch (error) {
      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon width={25} height={25} />
        Google
      </Button>
    </div>
  );
};
