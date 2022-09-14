import { useEffect, useRef } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import type { TabState } from "types/tabState";

import { tabState, tabStateKey } from "states/tabState";

type Props = {
  text: string;
  month: TabState;
};

const TabItem = ({ text, month }: Props) => {
  const tab = useRecoilValue(tabState);
  const setTab = useSetRecoilState(tabState);

  const ref = useRef<HTMLButtonElement>(null);

  // 選択された月まで自動スクロール
  useEffect(() => {
    if (tab === month && ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  }, [ref, tab, month]);

  return (
    <button
      ref={ref}
      onClick={() => {
        setTab(month);
        if (typeof window !== "undefined")
          sessionStorage.setItem(tabStateKey, JSON.stringify(month));
      }}
      className={
        (tab === month ? "font-bold" : "text-dark-gray") + " h-16 w-16 shrink-0"
      }
    >
      {text}
    </button>
  );
};

export default TabItem;
