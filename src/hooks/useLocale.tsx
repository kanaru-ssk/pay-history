"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { englishText, japaneseText } from "@/constants/texts";

export const languages = [
  { locale: "en", name: "English" },
  { locale: "ja", name: "日本語" },
] as const;

export const locales = ["en", "ja"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export function isLocale(arg: unknown): arg is Locale {
  return locales.some((locale) => locale === arg);
}

export function useLocale() {
  const params = useParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const text = locale === "ja" ? japaneseText : englishText;

  function setLocale(newLocale: Locale) {
    push(`/${newLocale}${pathname.slice(3)}`);
  }

  return { locale, text, setLocale };
}
