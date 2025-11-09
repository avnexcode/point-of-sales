import { env } from "@/configs/env";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import serverI18n from "../i18n/server";

const PATHS = {
  DEFAULT_REDIRECT: "/dashboard",
  AUTH_REDIRECT: "/login",
  EMPLOYEE_DEFAULT_REDIRECT: "/cashier",
  PUBLIC_ROUTES: ["/", "/login", "/register"],
};

export type UserRole = "admin" | "employee";

const getRoutes = (request: NextRequest, routes: string[]) => {
  const pathname = request.nextUrl.pathname;
  return routes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });
};

export const updateSession = async (
  request: NextRequest,
  protectedRoutes: string[],
  adminRoutes: string[],
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

  const language =
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ??
    request.cookies.get("i18next")?.value ??
    "en";

  await serverI18n.changeLanguage(language);

  const isPublicRoute = PATHS.PUBLIC_ROUTES.includes(request.nextUrl.pathname);
  const isProtectedRoute = getRoutes(request, protectedRoutes);
  const isAdminRoute = getRoutes(request, adminRoutes);

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

  if (user && role !== "admin" && isAdminRoute) {
    // console.log({ diEwe: "bukan admin" });
    const url = request.nextUrl.clone();
    url.pathname = PATHS.EMPLOYEE_DEFAULT_REDIRECT;
    return NextResponse.redirect(url);
  } else {
    // console.log({ diEwe: "admin" });
  }

  return supabaseResponse;
};
