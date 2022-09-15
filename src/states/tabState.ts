import { atom } from "recoil";

import type { TabState } from "types/tabState";

export const tabStateKey = "tabState";

const getDefaultValue = (): TabState => {
  const value =
    typeof window !== "undefined" ? sessionStorage.getItem(tabStateKey) : null;
  const thisMonth = new Date().getMonth() + 1;
  return value ? JSON.parse(value) : thisMonth;
};

export const tabState = atom<TabState>({
  key: tabStateKey,
  default: getDefaultValue(),
});
