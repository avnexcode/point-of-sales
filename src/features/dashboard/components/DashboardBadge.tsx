import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import type { icons } from "lucide-react";

type DashboardBadgeProps = {
  header: {
    title: string;
    icon: keyof typeof icons;
  };
  content: string;
  footer: string;
};

export const DashboardBadge = ({
  header,
  content,
  footer,
}: DashboardBadgeProps) => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="capitalize">{header.title}</CardTitle>
        <Icon name={header.icon} size={25} />
      </CardHeader>
      <CardContent className="capitalize">{content}</CardContent>
      <CardFooter className="flex flex-col items-start">
        <Separator />
        <span className="mt-2 capitalize">{footer}</span>
      </CardFooter>
    </Card>
  );
};
