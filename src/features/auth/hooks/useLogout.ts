import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("You have logged out successfully.");
      void router.push("/login");
    } catch (error) {
      if (error) {
        toast.error("An error occurred while logging out. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return { logout, handleLogout };
};
