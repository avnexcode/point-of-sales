import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { icons } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type StoreViewCollapsibleProps = {
  icon: keyof typeof icons;
  label: string;
  value: string;
  className?: string;
};

export const StoreViewCollapsible = ({
  icon,
  label,
  value,
  className,
}: StoreViewCollapsibleProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = value && value.length > 100;
  const truncated = value ? value.substring(0, 100) : "";

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-muted-foreground flex items-center gap-x-2 text-sm font-medium capitalize">
        <Icon name={icon} className="h-5 w-5" />
        {label}
      </p>
      <div className="relative">
        {shouldCollapse && !isExpanded ? (
          <div className="relative">
            <span className="block text-justify text-sm break-words sm:text-base">
              {truncated}...
            </span>
            <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t to-transparent" />
          </div>
        ) : (
          <span className="block text-justify text-sm break-words sm:text-base">
            {value}
          </span>
        )}
        {shouldCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground mt-2 h-auto p-0 text-xs font-normal sm:text-sm"
          >
            {isExpanded ? (
              <>
                <Icon name="ChevronUp" className="mr-1 h-3 w-3" />
                {t("common.showLess")}
              </>
            ) : (
              <>
                <Icon name="ChevronDown" className="mr-1 h-3 w-3" />
                {t("common.showMore")}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const StoreViewCollapsibleSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Icon + Label */}
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-4 w-20" />
      </div>
      {/* Value - Multiple lines to simulate text */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      {/* Show More/Less Button */}
      <div className="mt-2 flex items-center gap-x-1">
        <Skeleton className="h-3 w-3 rounded" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
