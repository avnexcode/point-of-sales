import { SegmentsNavigation } from "@/components/elements";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

type DashboardHeaderProps = {
  title: string;
};
export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <header className="space-y-3 py-5">
      <div className="flex w-full items-center justify-between">
        <Heading size={"h3"}>{title}</Heading>
      </div>
      <Separator />
      <SegmentsNavigation />
    </header>
  );
};
