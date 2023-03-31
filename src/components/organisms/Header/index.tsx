import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu";
import Tab from "./Tab";
import SettingIcon from "@/components/atoms/icons/SettingIcon";
import { useLocale } from "@/hooks/locale";
import { useTabStatus } from "@/hooks/tabStatus";
import { displayMonth } from "@/libs/displayMonth";

const Header = () => {
  const { locale } = useLocale();
  const { tabStatus } = useTabStatus();

  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white md:h-20">
        <div className="px-4">
          <Link href="/" title="go to top page">
            <Image
              src="/logo.svg"
              alt="logo"
              width={41}
              height={14}
              className="h-6 w-auto md:h-10"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <details>
            <summary
              onClick={() => {
                setIsTabOpen(!isTabOpen);
              }}
              className="cursor-pointer"
            >
              {displayMonth(tabStatus, locale)}
            </summary>
          </details>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} name="menu-open">
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
