// tabStatusをuseContextで共有

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

export const TabStatusProvider = ({ children }: Node) => {
  const key = "TAB_STATUS";
  const [tabStatus, _setTabStatus] = useState<TabStatus>(1);

  // sessionStorageにtabStatusが保存されている場合は初期値に設定
  useEffect(() => {
    const value = sessionStorage.getItem(key);
    if (value) {
      _setTabStatus(JSON.parse(value));
    } else {
      const date = new Date();
      const thisMonth = date.getMonth() + 1;
      if (isTabStatus(thisMonth)) {
        _setTabStatus(thisMonth);
      }
    }
  }, []);

  // sessionStorageにも保存するようsetTabStatusを拡張
  const setTabStatus = (tab: TabStatus) => {
    _setTabStatus(tab);
    sessionStorage.setItem(key, JSON.stringify(tab));
  };

  return (
    <TabStatusContext.Provider
      value={{ tabStatus: tabStatus, setTabStatus: setTabStatus }}
    >
      {children}
    </TabStatusContext.Provider>
  );
};

export const useTabStatus = () => useContext(TabStatusContext);
