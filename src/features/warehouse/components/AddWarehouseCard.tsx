import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type AddWarehouseCardProps = {
  className?: string;
};

export const AddWarehouseCard = ({ className }: AddWarehouseCardProps) => {
  const { t } = useTranslation();

  return (
    <Link href={"/dashboard/warehouse/create"} className="w-full max-w-xs">
      <Card
        className={cn(
          "group border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-primary/20 relative h-full w-full cursor-pointer overflow-hidden border-2 border-dashed transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
          className,
        )}
      >
        <CardContent className="flex h-full min-h-[320px] flex-col items-center justify-center space-y-4 p-8">
          {/* Icon Circle with Animation */}
          <div className="relative">
            {/* Pulse Animation Ring */}
            <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full" />

            {/* Main Icon Container */}
            <div className="bg-primary/10 group-hover:bg-primary/20 relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <Icon
                name="CirclePlus"
                className="text-primary h-10 w-10 transition-transform duration-300 group-hover:rotate-90"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2 text-center">
            <h3 className="text-foreground text-lg font-semibold">
              {t("components.warehouse.addWarehouseCard.title")}
            </h3>
            <p className="text-muted-foreground max-w-[200px] text-sm">
              {t("components.warehouse.addWarehouseCard.caption")}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="bg-primary/5 absolute top-4 right-4 h-16 w-16 rounded-full blur-xl" />
          <div className="bg-primary/5 absolute bottom-4 left-4 h-16 w-16 rounded-full blur-xl" />
        </CardContent>
      </Card>
    </Link>
  );
};
