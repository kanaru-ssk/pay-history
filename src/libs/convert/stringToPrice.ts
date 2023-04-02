const stringToHalfWidth = (value: string): string => {
  if (!value) return value;

  return String(value).replace(/[！-～]/g, (all: string): string => {
    return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
  });
};

export const stringToPrice = (value: string): number => {
  const half = stringToHalfWidth(value);
  const removed = half.replace(/,/g, "");
  const pattern = /^\d*$/;
  if (pattern.test(removed)) {
    const toNum = Number(removed);
    if (0 < toNum) {
      return toNum;
    }
  }
  return 0;
};
