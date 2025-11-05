import { t as translator, type TFunction } from "i18next";

export type SidebarSubMenuItemType = {
  title: string;
  url: string;
  icon: string;
  active: string[];
};

export type SidebarMenuItemType = {
  type: "Single" | "Collapsible";
  title: string;
  url?: string;
  icon: string;
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
  return [
    {
      label: "Application",
      menu: [
        {
          type: "Single",
          title: "Dashboard",
          url: "/dashboard",
          icon: "LayoutDashboard",
          active: [""],
        },
        {
          type: "Single",
          title: "Store",
          url: "/dashboard/store",
          icon: "Store",
          active: [""],
        },
        {
          type: "Single",
          title: "Warehouse",
          url: "/dashboard/warehouse",
          icon: "Warehouse",
          active: [""],
        },
        {
          type: "Single",
          title: "Cashier",
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
          title: "Member",
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
          title: "Pesanan",
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
          title: "Transaksi",
          url: "/dashboard/transaction",
          icon: "ArrowLeftRight",
          active: [
            "/dashboard/transaction/:id/detail",
            "/dashboard/payment-record/:id/detail",
          ],
        },
        {
          type: "Single",
          title: "Return",
          url: "/dashboard/return",
          icon: "RotateCcw",
          active: [
            "/dashboard/transaction/:id/detail",
            "/dashboard/payment-record/:id/detail",
          ],
        },
        {
          type: "Collapsible",
          title: "Table",
          icon: "Table2",
          active: [""],
          subMenu: [
            {
              title: "Category",
              url: "#",
              icon: "Table",
              active: [""],
            },
            {
              title: "Product",
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
          title: "Profile",
          url: "settings/profile",
          icon: "User",
          active: [""],
        },
        {
          type: "Single",
          title: "Reset Password",
          url: "/settings/reset-password",
          icon: "KeyRound",
          active: [""],
        },
        {
          type: "Single",
          title: "Employee",
          url: "/settings/user",
          icon: "Users",
          active: ["/settings/user/create"],
        },
      ],
    },
  ];
};
