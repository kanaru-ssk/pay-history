import { useRouter } from "next/router";
import { englishText, japaneseText } from "@/constants/texts";

export const useLocale = () => {
  const { locale } = useRouter();
  const text = locale === "en" ? englishText : japaneseText;
  return { locale, text };
};
