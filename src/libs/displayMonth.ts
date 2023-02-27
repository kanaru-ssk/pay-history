import { englishMonths, japaneseMonths } from "constants/months";
import { isTabStatus } from "types/tabStatus";

export const displayMonth = (month: number, locale?: string): string => {
  if (!isTabStatus(month)) return "";

  if (locale === "en") {
    return englishMonths[month - 1];
  }
  return japaneseMonths[month - 1];
};
