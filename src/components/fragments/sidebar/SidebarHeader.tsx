import {
  SidebarHeader as SidebarHeaderComponent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "./SidebarTrigger";

export const SidebarHeader = () => {
  return (
    <SidebarHeaderComponent>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-x-3">
          <SidebarTrigger />
          <h1 className="text-xl font-bold transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:translate-x-[-10px] group-data-[state=collapsed]:opacity-0">
            Avnexsale
          </h1>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderComponent>
  );
};
