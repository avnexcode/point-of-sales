import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export const GoHomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    void router.push("/");
  };

  return (
    <Button variant="default" onClick={handleGoHome} className="cursor-pointer">
      Back to Home
    </Button>
  );
};
