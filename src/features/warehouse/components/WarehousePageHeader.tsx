import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DeleteWarehouseDialog } from "./DeleteWarehouseDialog";

type WarehousePageHeaderProps = {
  title: string;
  warehouseId: string;
  withAction?: boolean;
};

export const WarehousePageHeader = ({
  title,
  warehouseId,
  withAction = false,
}: WarehousePageHeaderProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start justify-between gap-y-2 border-b pb-6 lg:flex-row lg:items-center">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex aspect-square h-12 w-12 items-center justify-center rounded-lg">
          <Icon name="Warehouse" className="text-primary h-6 w-6" />
        </div>
        <div>
          <Heading
            size={"h3"}
            className="line-clamp-1 tracking-tight capitalize"
          >
            {title}
          </Heading>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("components.warehouse.warehousePageHeader.caption")}
          </p>
        </div>
      </div>
      {withAction ? (
        <div className="flex w-full flex-col items-center gap-2 lg:w-fit lg:flex-row">
          <Button
            onClick={() =>
              router.push(`/dashboard/warehouse/${warehouseId}/edit`)
            }
            className="w-full px-20 lg:max-w-fit"
            disabled={!warehouseId}
          >
            {t("components.warehouse.warehousePageHeader.editButton")}
          </Button>
          <DeleteWarehouseDialog
            warehouseId={warehouseId}
            className="w-full px-20 lg:max-w-fit"
            disabled={!warehouseId}
          />
        </div>
      ) : null}
    </div>
  );
};

type WarehousePageHeaderSkeletonProps = {
  withAction?: boolean;
  className?: string;
};

export const WarehousePageHeaderSkeleton = ({
  withAction = false,
  className,
}: WarehousePageHeaderSkeletonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-y-2 border-b pb-6 lg:flex-row lg:items-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon Container Skeleton */}
        <Skeleton className="h-12 w-12 rounded-lg" />

        <div className="space-y-2">
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-72" />
          {/* Description Skeleton */}
          <Skeleton className="mt-1 h-3 w-36" />
        </div>
      </div>

      {withAction ? (
        <div className="flex w-full flex-col items-center gap-2 lg:w-fit lg:flex-row">
          {/* Edit Button Skeleton */}
          <Skeleton className="h-9 w-full lg:w-[200px]" />
          {/* Delete Button Skeleton */}
          <Skeleton className="h-9 w-full lg:w-[200px]" />
        </div>
      ) : null}
    </div>
  );
};
