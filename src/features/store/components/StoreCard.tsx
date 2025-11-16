import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type StoreCardProps = {
  className?: string;
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const StoreCard = ({
  className,
  id,
  name,
  description,
  imageUrl,
}: StoreCardProps) => {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        "border-border bg-card hover:shadow-primary/20 w-full max-w-xs gap-5 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <CardHeader className="p-0">
        <div className="bg-muted relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 384px) 100vw, 384px"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle className="text-foreground flex items-center gap-x-2 text-xl">
          <div className="bg-primary/10 mt-0.5 rounded-lg p-1.5">
            <Icon name="Store" className="text-primary h-6 w-6" />
          </div>
          <span className="line-clamp-1 capitalize">
            {t("models.store.title")} {name}
          </span>
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-1">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pb-6">
        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          asChild
        >
          <Link href={`/dashboard/store/${id}/view`}>
            {t("components.store.storeCard.detailButton")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

type StoreCardSkeletonProps = {
  className?: string;
};

export const StoreCardSkeleton = ({ className }: StoreCardSkeletonProps) => {
  return (
    <Card
      className={cn(
        "border-border bg-card w-full max-w-xs gap-5 overflow-hidden p-0",
        className,
      )}
    >
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full rounded-none" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="mt-0.5 h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 flex-1" />
        </div>
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="pb-6">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
