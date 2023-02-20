import { useRouter } from "next/router";

import englishText from "constants/englishText";
import japaneseText from "constants/japaneseText";

export const useLocale = () => {
  const { locale } = useRouter();
  const text = locale === "en" ? englishText : japaneseText;
  return { locale, text };
};
