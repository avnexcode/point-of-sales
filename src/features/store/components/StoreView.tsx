import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SettingsResponse } from "@/features/settings/types";
import { formatCurrency, formatDate } from "@/utils";
import type { AmountType } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { StoreResponse } from "../types";
import {
  StoreViewCollapsible,
  StoreViewCollapsibleSkeleton,
} from "./StoreViewCollapsible";
import { StoreViewItem, StoreViewItemSkeleton } from "./StoreViewItem";

type StoreViewProps = {
  store: StoreResponse;
  settings?: SettingsResponse;
};

export const StoreView = ({ store, settings }: StoreViewProps) => {
  const { t } = useTranslation();

  const getAmounValue = (amountType: AmountType, value: number) => {
    switch (amountType) {
      case "NOMINAL":
        return formatCurrency(value, settings?.currency);
      default:
        return `${value}%`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Store Image */}
        <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-lg border">
          {store.image ? (
            <Image
              src={store.image}
              alt={store.name}
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
              <StoreViewCollapsible
                icon="MapPin"
                label={t("models.store.fields.address")}
                value={store.address}
                className="max-w-3xl"
              />
              <StoreViewItem
                icon="Tag"
                label={t("models.store.fields.discount")}
                value={getAmounValue(store.discount, store.totalDiscount)}
              />
              <StoreViewItem
                icon="Receipt"
                label={t("models.store.fields.tax")}
                value={getAmounValue(store.tax, store.totalTax)}
              />
              <StoreViewItem
                icon="Calendar"
                label={t("models.store.fields.createdAt")}
                value={formatDate(new Date(store.createdAt))}
              />
              <StoreViewItem
                icon="Calendar"
                label={t("models.store.fields.updatedAt")}
                value={formatDate(new Date(store.updatedAt))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const StoreViewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-lg border">
          <Skeleton className="h-full w-full" />
        </div>
        <Card className="rounded-none border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="space-y-4">
              <StoreViewCollapsibleSkeleton />
              <StoreViewItemSkeleton />
              <StoreViewItemSkeleton />
              <StoreViewItemSkeleton />
              <StoreViewItemSkeleton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
