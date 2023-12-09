export function dateToDocId(date: Date) {
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  return `${YYYY}-${MM}`;
}
