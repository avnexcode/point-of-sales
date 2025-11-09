import { Icon } from "@/components/ui/icon";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { type SidebarSubMenuItemType } from "./menu";
import { isPathMatchingPattern } from "./sidebar-utils";

type SidebarCollapsibleItemProps = {
  pathname: string;
  setCollapsibleOpen: (isCollapsibleOpen: boolean) => void;
} & SidebarSubMenuItemType;

export const SidebarCollapsibleItem = ({
  ...props
}: SidebarCollapsibleItemProps) => {
  const isExactMatch = props.pathname === props.url;

  const isActivePatternMatch =
    Array.isArray(props.active) &&
    props.active.some((activePattern) =>
      isPathMatchingPattern(props.pathname, activePattern),
    );

  const activeLink = isExactMatch || isActivePatternMatch;

  return (
    <SidebarMenuButton asChild isActive={activeLink} className="capitalize">
      <Link href={props.url}>
        <Icon name={props.icon} className="mr-1" />
        <span>{props.title}</span>
      </Link>
    </SidebarMenuButton>
  );
};
