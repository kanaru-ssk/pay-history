import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/constants/languages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => {
    return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
  });

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
