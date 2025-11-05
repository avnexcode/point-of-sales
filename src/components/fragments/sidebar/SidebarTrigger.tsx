import { useSidebar } from "@/components/ui/sidebar";
import { TextAlignJustify } from "lucide-react";

export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="pt-3.5 pb-2">
      <TextAlignJustify size={30} />
    </button>
  );
};
