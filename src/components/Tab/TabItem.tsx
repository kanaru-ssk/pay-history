import type { TabStatus } from "types/tabStatus";

import { useTabStatus } from "hooks/tabStatus";

type Props = {
  text: string;
  month: TabStatus;
};

const TabItem = ({ text, month }: Props) => {
  const { tabStatus, setTabStatus } = useTabStatus();

  return (
    <button
      onClick={() => {
        setTabStatus(month);
      }}
      className={
        (tabStatus === month ? "font-bold" : "text-dark-gray") +
        " mx-2 h-12 w-12 shrink-0 py-2"
      }
    >
      {text}
    </button>
  );
};

export default TabItem;
