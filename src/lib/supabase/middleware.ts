import { env } from "@/configs/env";
import type { UserRole } from "@prisma/client";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import serverI18n from "../i18n/server";

const PATHS = {
  DEFAULT_REDIRECT: "/dashboard",
  AUTH_REDIRECT: "/login",
  PUBLIC_ROUTES: ["/", "/login", "/register"],
  EMPLOYEE_ROUTES: ["/cashier"],
  ADMIN_ROUTES: ["/dashboard"],
};

export const updateSession = async (
  request: NextRequest,
  protectedRoutes: string[],
) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.app_metadata.role as UserRole;
  console.log({ role });

  const language =
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ??
    request.cookies.get("i18next")?.value ??
    "en";

  await serverI18n.changeLanguage(language);

  const isPublicRoute = PATHS.PUBLIC_ROUTES.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`),
  );

  if (user && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = PATHS.DEFAULT_REDIRECT;
    return NextResponse.redirect(url);
  }

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = PATHS.AUTH_REDIRECT;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
