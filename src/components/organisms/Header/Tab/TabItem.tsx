import { useEffect, useRef } from "react";
import { useLocale } from "hooks/locale";
import { useTabStatus } from "hooks/tabStatus";
import { displayMonth } from "libs/displayMonth";
import type { TabStatus } from "types/tabStatus";

type Props = {
  month: TabStatus;
};

const TabItem = ({ month }: Props) => {
  const { locale } = useLocale();
  const { tabStatus, setTabStatus } = useTabStatus();

  const ref = useRef<HTMLButtonElement>(null);

  // auto scroll to selected month
  useEffect(() => {
    if (tabStatus === month && ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
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
      {displayMonth(month, locale)}
    </button>
  );
};

export default TabItem;
