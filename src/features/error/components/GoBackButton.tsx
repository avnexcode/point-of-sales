import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoBack}
      className="flex cursor-pointer items-center gap-2"
    >
      <ArrowLeft size={16} />
      Back to Previous Page
    </Button>
  );
};
