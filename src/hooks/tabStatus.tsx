// tabStatusをuseContextで共有

import { createContext, useContext, useState, useEffect } from "react";

import { TabStatus, isTabStatus } from "types/tabStatus";

type node = {
  children: React.ReactNode;
};

type TabStatusContextProps = {
  tabStatus: TabStatus;
  setTabStatus: (tab: TabStatus) => void;
};

const TabStatusContext = createContext<TabStatusContextProps>({
  tabStatus: 1,
  setTabStatus: () => {},
});

export const TabStatusProvider = ({ children }: node) => {
  const [tabStatus, _setTabStatus] = useState<TabStatus>(1);

  // localStorageにtabStatusが保存されている場合は初期値に設定
  useEffect(() => {
    const keyValue = localStorage.getItem("TAB_STATUS");
    if (keyValue) {
      _setTabStatus(JSON.parse(keyValue));
    } else {
      const date = new Date();
      const thisMonth = date.getMonth() + 1;
      if (isTabStatus(thisMonth)) {
        _setTabStatus(thisMonth);
      }
    }
  }, []);

  // localStorageにも保存するようsetTabStatusを拡張
  const setTabStatus = (tab: TabStatus) => {
    _setTabStatus(tab);
    localStorage.setItem("TAB_STATUS", JSON.stringify(tab));
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
