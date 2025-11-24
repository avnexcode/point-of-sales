import { cn } from "@/lib/utils";
import { formatDate, formatTime } from "@/utils";
import { useEffect, useState } from "react";

type DateTimeDisplayProps = {
  className?: string;
};

export const DateTimeDisplay = ({ className }: DateTimeDisplayProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("flex items-center gap-2 text-nowrap", className)}>
      <div className="text-muted-foreground text-lg">
        {formatTime(currentDateTime, "24h")}
      </div>
      <div className="text-muted-foreground text-lg">
        {formatDate(currentDateTime, "full")}
      </div>
    </div>
  );
};
