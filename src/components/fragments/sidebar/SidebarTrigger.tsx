import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type SidebarTriggerProps = {
  className?: string;
};

export const SidebarTrigger = ({ className }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      onClick={toggleSidebar}
      className={cn(
        "flex max-w-fit cursor-pointer items-center pt-3.5 pb-2",
        className,
      )}
    >
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
    </div>
  );
};
