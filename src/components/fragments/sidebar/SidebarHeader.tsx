import {
  SidebarHeader as SidebarHeaderComponent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export const SidebarHeader = () => {
  return (
    <SidebarHeaderComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={"/"} className="ml-2 flex max-w-fit items-center pt-3.5">
            <Image
              src={
                "https://thpvradgzhfshaqgteqn.supabase.co/storage/v1/object/public/resource/avnexeed.ico"
              }
              alt="avnexsale-logo"
              width={30}
              height={30}
            />
            <h1 className="text-xl font-bold transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:translate-x-[-10px] group-data-[state=collapsed]:opacity-0">
              vnexsale
            </h1>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderComponent>
  );
};
