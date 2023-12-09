"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, defaultLocale } from "@/constants/languages";
import { englishText, japaneseText } from "@/constants/texts";

export function useLocale() {
  const { locale } = useParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const text = locale === "ja" ? japaneseText : englishText;

  function setLocale(newLocale: "ja" | "en") {
    const hasLocale = locales.some((locale) =>
      pathname.startsWith(`/${locale}`),
    );

    if (hasLocale) {
      const newPath = `/${newLocale}${pathname.slice(
        pathname.indexOf("/", 1),
      )}`;
      push(newPath);
    } else {
      const newPath = `/${newLocale}${pathname}`;
      push(newPath);
    }
  }

  return { locale, text, setLocale };
}
