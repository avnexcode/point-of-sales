import { SegmentsNavigation } from "@/components/elements";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks";

type DashboardHeaderProps = {
  title: string;
};
export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const { user } = useAuth();
  return (
    <header className="space-y-3 py-5">
      <div className="flex w-full items-center justify-between">
        <Heading size={"h3"}>{title}</Heading>
        <h1 className="capitalize">{user?.name}</h1>
      </div>
      <Separator />
      <SegmentsNavigation />
    </header>
  );
};
