import Link from "next/link";
import { useState } from "react";

import Menu from "./Menu";
import Tab from "./Tab";

import LogoIcon from "components/atoms/icons/LogoIcon";
import SettingIcon from "components/atoms/icons/SettingIcon";
import { useLocale } from "hooks/locale";
import { useTabStatus } from "hooks/tabStatus";
import { displayMonth } from "libs/displayMonth";

const Header = () => {
  const { locale } = useLocale();
  const { tabStatus } = useTabStatus();

  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white md:h-20">
        <div className="px-4">
          <Link href="/">
            <a title="go to top page">
              <LogoIcon />
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsTabOpen(!isTabOpen);
            }}
          >
            {displayMonth(tabStatus, locale)}
            {isTabOpen ? "▲" : "▼"}
          </button>
          <button className="p-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <SettingIcon />
          </button>
        </div>
      </header>

      {isTabOpen && <Tab />}

      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
