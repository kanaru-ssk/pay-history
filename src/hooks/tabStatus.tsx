// share tabStatus with useContext

import { createContext, useContext, useState, useEffect } from "react";
import { TabStatus, isTabStatus } from "types/tabStatus";

type TabStatusContextProps = {
  tabStatus: TabStatus;
  setTabStatus: (tab: TabStatus) => void;
};

const TabStatusContext = createContext<TabStatusContextProps>(
  {} as TabStatusContextProps
);

type Node = {
  children: React.ReactNode;
};

const TabStatusProvider = ({ children }: Node) => {
  const key = "tabStatus";
  const [tabStatus, setTabStatus] = useState<TabStatus>(() => {
    // set to initial value if tabStatus is saved in sessionStorage
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : new Date().getMonth() + 1;
  });

  useEffect(() => {
    const value = sessionStorage.getItem(key);
    if (value) {
      setTabStatus(JSON.parse(value));
    } else {
      const date = new Date();
      const thisMonth = date.getMonth() + 1;
      if (isTabStatus(thisMonth)) {
        setTabStatus(thisMonth);
      }
    }
  }, []);

  // extend setTabStatus to also save to sessionStorage
  const expandedSetTabStatus = (tab: TabStatus) => {
    setTabStatus(tab);
    sessionStorage.setItem(key, JSON.stringify(tab));
  };

  return (
    <TabStatusContext.Provider
      value={{ tabStatus: tabStatus, setTabStatus: expandedSetTabStatus }}
    >
      {children}
    </TabStatusContext.Provider>
  );
};
export default TabStatusProvider;

export const useTabStatus = () => useContext(TabStatusContext);
