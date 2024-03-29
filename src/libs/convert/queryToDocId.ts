import { dateToDocId } from "./dateToDocId";

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime());
}

export function queryToDocId(query: string | string[] | undefined) {
  if (typeof query === "string") {
    const queryDate = new Date(query);

    if (isValidDate(queryDate)) {
      return dateToDocId(queryDate);
    }
  }
  const today = new Date();
  return dateToDocId(today);
}
