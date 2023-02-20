import { isTabStatus } from "types/tabStatus";

const japaneseMonths = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

const englishMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const displayMonth = (month: number, locale?: string): string => {
  if (!isTabStatus(month)) return "";

  if (locale === "en") {
    return englishMonths[month - 1];
  }
  return japaneseMonths[month - 1];
};
