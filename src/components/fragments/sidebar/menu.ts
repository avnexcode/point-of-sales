import { t as translator, type TFunction } from "i18next";
import type { icons } from "lucide-react";

export type SidebarSubMenuItemType = {
  title: string;
  url: string;
  icon: keyof typeof icons;
  active: string[];
};

export type SidebarMenuItemType = {
  type: "Single" | "Collapsible";
  title: string;
  url?: string;
  icon: keyof typeof icons;
  active: string[];
  subMenu?: SidebarSubMenuItemType[];
};

export type SidebarMenuType = {
  label: string;
  menu: SidebarMenuItemType[];
};

export const createSidebarMenu = (
  t: TFunction = translator,
): SidebarMenuType[] => {
  const sidebarGroups = "components.sidebar.groups";
  const sidebarItems = "components.sidebar.items";
  return [
    {
      label: t(`${sidebarGroups}.application`),
      menu: [
        {
          type: "Single",
          title: t(`${sidebarItems}.dashboard`),
          url: "/dashboard",
          icon: "LayoutDashboard",
          active: [""],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.store`),
          url: "/dashboard/store",
          icon: "Store",
          active: [
            "/dashboard/store/create",
            "/dashboard/store/:id/view",
            "/dashboard/store/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.warehouse`),
          url: "/dashboard/warehouse",
          icon: "Warehouse",
          active: [""],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.cashier`),
          url: "/dashboard/cashier",
          icon: "Computer",
          active: [
            "/dashboard/customer/create",
            "/dashboard/customer/:id/edit",
            "/dashboard/customer/:id/detail",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.member`),
          url: "/dashboard/member",
          icon: "User",
          active: [
            "/dashboard/member/create",
            "/dashboard/member/:id/edit",
            "/dashboard/member/:id/detail",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.order`),
          url: "/dashboard/order",
          icon: "ShoppingBag",
          active: [
            "/dashboard/order/create",
            "/dashboard/order/:id/edit",
            "/dashboard/order/:id/detail",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.transaction`),
          url: "/dashboard/transaction",
          icon: "ArrowLeftRight",
          active: [
            "/dashboard/transaction/:id/detail",
            "/dashboard/payment-record/:id/detail",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.return`),
          url: "/dashboard/return",
          icon: "RotateCcw",
          active: [
            "/dashboard/transaction/:id/detail",
            "/dashboard/payment-record/:id/detail",
          ],
        },
        {
          type: "Collapsible",
          title: t(`${sidebarItems}.tables`),
          icon: "Table2",
          active: [""],
          subMenu: [
            {
              title: t(`${sidebarItems}.category`),
              url: "#",
              icon: "Table",
              active: [""],
            },
            {
              title: t(`${sidebarItems}.product`),
              url: "#",
              icon: "Table",
              active: [""],
            },
            {
              title: t(`${sidebarItems}.prompt`),
              url: "#",
              icon: "Table",
              active: [""],
            },
            {
              title: t(`${sidebarItems}.supplier`),
              url: "#",
              icon: "Table",
              active: [""],
            },
          ],
        },
      ],
    },
    {
      label: "Settings",
      menu: [
        {
          type: "Single",
          title: t(`${sidebarItems}.profile`),
          url: "settings/profile",
          icon: "User",
          active: [""],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.resetPassword`),
          url: "/settings/reset-password",
          icon: "KeyRound",
          active: [""],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.employee`),
          url: "/settings/user",
          icon: "Users",
          active: ["/settings/user/create"],
        },
      ],
    },
  ];
};
