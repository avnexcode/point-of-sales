import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { icons } from "lucide-react";

type WarehouseViewItemProps = {
  icon: keyof typeof icons;
  label: string;
  value: string;
  className?: string;
};

export const WarehouseViewItem = ({
  icon,
  label,
  value,
  className,
}: WarehouseViewItemProps) => (
  <div
    className={cn(
      "flex max-w-full flex-col gap-y-2 overflow-hidden",
      className,
    )}
  >
    <p className="text-muted-foreground flex max-w-fit items-center gap-x-2 text-sm font-medium capitalize">
      <Icon name={icon} className="h-5 w-5" />
      {label}
    </p>
    <p className="truncate text-base font-semibold capitalize">{value}</p>
  </div>
);

export const WarehouseViewItemSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex max-w-full flex-col gap-y-2 overflow-hidden",
        className,
      )}
    >
      {/* Icon + Label */}
      <div className="flex max-w-fit items-center gap-x-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
      {/* Value */}
      <Skeleton className="h-6 w-32" />
    </div>
  );
};
