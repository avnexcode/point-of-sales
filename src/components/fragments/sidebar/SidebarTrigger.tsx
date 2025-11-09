import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TextAlignJustify } from "lucide-react";

type SidebarTriggerProps = {
  className?: string;
};

export const SidebarTrigger = ({ className }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className={cn("pt-3.5 pb-2", className)}>
      <TextAlignJustify size={30} />
    </button>
  );
};
