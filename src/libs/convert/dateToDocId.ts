export const dateToDocId = (date: Date) => {
  const YYYY = date.getFullYear();
  const MM = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${YYYY}-${MM}`;
};
