import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SettingsSectionProps = {
  title: string;
  caption: string;
  className?: string;
  children: React.ReactNode;
};

export const SettingsSection = ({
  children,
  className,
  title,
  caption,
}: SettingsSectionProps) => {
  return (
    <Card
      className={cn("border-none bg-transparent p-0 shadow-none", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {title}
        </CardTitle>
        <CardDescription>{caption}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-10">{children}</CardContent>
    </Card>
  );
};
