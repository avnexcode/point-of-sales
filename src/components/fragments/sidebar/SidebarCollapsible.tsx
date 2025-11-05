import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { renderElements } from "@/utils";
import { ChevronDown, ChevronRight, type icons } from "lucide-react";
import { useState } from "react";
import { type SidebarMenuItemType } from "./menu";
import { isPathMatchingPattern } from "./sidebar-utils";
import { SidebarCollapsibleItem } from "./SidebarCollapsibleItem";

type SidebarCollapsibleProps = {
  pathname: string;
} & Omit<SidebarMenuItemType, "type" | "active" | "url">;

export const SidebarCollapsible = (props: SidebarCollapsibleProps) => {
  const isAnySubmenuActive = props.subMenu?.some(
    (submenu) =>
      props.pathname === submenu.url ||
      (Array.isArray(submenu.active) &&
        submenu.active.some((pattern) =>
          isPathMatchingPattern(props.pathname, pattern),
        )),
  );

  const [isCollapsibleOpen, setCollapsibleOpen] = useState<boolean>(
    isAnySubmenuActive ?? false,
  );

  return (
    <Collapsible
      defaultOpen={isCollapsibleOpen}
      onOpenChange={setCollapsibleOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild className="py-[22px]">
          <SidebarMenuButton>
            <Icon name={props.icon as keyof typeof icons} className="mr-2" />
            <span className="flex w-full items-center justify-between">
              {props.title}{" "}
              {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
            </span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {renderElements({
              of: props.subMenu,
              keyExtractor: (menu) => menu.title,
              render: (menu) => (
                <SidebarCollapsibleItem
                  setCollapsibleOpen={setCollapsibleOpen}
                  pathname={props.pathname}
                  title={menu.title}
                  url={menu.url}
                  icon={menu.icon}
                  active={menu.active}
                />
              ),
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
