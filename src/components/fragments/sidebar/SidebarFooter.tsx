import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/features/auth/hooks";
import { useAuth } from "@/hooks";
import Link from "next/link";

export const SidebarFooter = () => {
  const { handleLogout } = useLogout();
  const { user } = useAuth();
  return (
    <SidebarFooterComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-nowrap">
                <Icon name={"User"} />
                <span className="transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:translate-x-[-10px] group-data-[state=collapsed]:opacity-0">
                  {user?.username}
                </span>
                <Icon
                  name={"ChevronUp"}
                  className="ml-auto transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:translate-x-[-10px] group-data-[state=collapsed]:opacity-0"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
            >
              <DropdownMenuItem>
                <Icon name={"User"} className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/settings"}>
                  <Icon name={"Settings"} className="mr-2" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <Icon name={"LogOut"} className="mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterComponent>
  );
};
