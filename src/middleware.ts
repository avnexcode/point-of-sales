import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

const protectedRoutes = ["/9WGQpC2YU2S23vJceAGVYg=="];

const middleware = async (request: NextRequest) => {
  return await updateSession(request, protectedRoutes);
};

export default middleware;

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
