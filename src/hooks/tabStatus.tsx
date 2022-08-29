// tabStatus

// react取得
import { createContext, useContext, useState, useEffect } from "react";

import { TabStatus, isTabStatus } from "types/tabStatus";

type node = {
  children: React.ReactNode;
};

type TabStatusContextProps = {
  tabStatus: TabStatus;
  setTabStatus: React.Dispatch<React.SetStateAction<TabStatus>>;
};

const TabStatusContext = createContext<TabStatusContextProps>({
  tabStatus: 1,
  setTabStatus: () => {},
});

export const TabStatusProvider = ({ children }: node) => {
  const [tabStatus, setTabStatus] = useState<TabStatus>(1);

  useEffect(() => {
    const date = new Date();
    const thisMonth = date.getMonth() + 1;
    if (isTabStatus(thisMonth)) {
      setTabStatus(thisMonth);
    }
  }, []);

  return (
    <TabStatusContext.Provider
      value={{ tabStatus: tabStatus, setTabStatus: setTabStatus }}
    >
      {children}
    </TabStatusContext.Provider>
  );
};

export const useTabStatus = () => useContext(TabStatusContext);
