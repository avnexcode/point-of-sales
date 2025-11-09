import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/dashboard"];

const middleware = async (request: NextRequest) => {
  return await updateSession(request, protectedRoutes, adminRoutes);
};

export default middleware;

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
