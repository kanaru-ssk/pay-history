import { useEffect, useRef } from "react";

import type { TabStatus } from "types/tabStatus";

import { useTabStatus } from "hooks/tabStatus";

type Props = {
  text: string;
  month: TabStatus;
};

const TabItem = ({ text, month }: Props) => {
  const { tabStatus, setTabStatus } = useTabStatus();
  const ref = useRef<HTMLButtonElement>(null);

  // 選択された月まで自動スクロール
  useEffect(() => {
    if (tabStatus === month && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [ref, tabStatus, month]);

  return (
    <button
      ref={ref}
      onClick={() => {
        setTabStatus(month);
      }}
      className={
        (tabStatus === month ? "font-bold" : "text-dark-gray") +
        " h-16 w-16 shrink-0"
      }
    >
      {text}
    </button>
  );
};

export default TabItem;
