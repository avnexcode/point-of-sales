import { useSidebar } from "@/components/ui/sidebar";
import { TextAlignJustify } from "lucide-react";

export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="py-2">
      <TextAlignJustify size={30} />
    </button>
  );
};
