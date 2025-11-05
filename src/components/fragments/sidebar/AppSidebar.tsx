import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { renderElements } from "@/utils";
import { usePathname } from "next/navigation";
import { createSidebarMenu } from "./menu";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarHeader } from "./SidebarHeader";

export const AppSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader />
      <SidebarContent className="overflow-x-hidden">
        {renderElements({
          of: createSidebarMenu(),
          keyExtractor: (sidebar) => sidebar.label,
          render: (sidebar) => (
            <SidebarGroup
              label={sidebar.label}
              menu={sidebar.menu}
              pathname={pathname}
            />
          ),
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
