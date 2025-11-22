import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { WarehouseResponse } from "../types";
import {
  WarehouseViewCollapsible,
  WarehouseViewCollapsibleSkeleton,
} from "./WarehouseViewCollapsible";
import {
  WarehouseViewItem,
  WarehouseViewItemSkeleton,
} from "./WarehouseViewItem";

type WarehouseViewProps = {
  warehouse: WarehouseResponse;
  store: string;
};

export const WarehouseView = ({ warehouse, store }: WarehouseViewProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Warehouse Image */}
        <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-lg border">
          {warehouse.image ? (
            <Image
              src={warehouse.image}
              alt={warehouse.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="text-muted-foreground/40 h-16 w-16" />
            </div>
          )}
        </div>

        <Card className="rounded-none border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="space-y-4">
              <WarehouseViewCollapsible
                icon="MapPin"
                label={t("models.warehouse.fields.address")}
                value={warehouse.address}
                className="max-w-3xl"
              />
              <WarehouseViewItem
                icon="Store"
                label={t("models.store.title")}
                value={store}
              />
              <WarehouseViewItem
                icon="Calendar"
                label={t("models.warehouse.fields.createdAt")}
                value={formatDate(new Date(warehouse.createdAt))}
              />
              <WarehouseViewItem
                icon="Calendar"
                label={t("models.warehouse.fields.updatedAt")}
                value={formatDate(new Date(warehouse.updatedAt))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const WarehouseViewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-lg border">
          <Skeleton className="h-full w-full" />
        </div>
        <Card className="rounded-none border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="space-y-4">
              <WarehouseViewCollapsibleSkeleton />

              <WarehouseViewItemSkeleton />
              <WarehouseViewItemSkeleton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
