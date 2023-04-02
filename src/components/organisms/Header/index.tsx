import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";
import { SettingIcon } from "@/components/atoms/icons/SettingIcon";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white md:h-20 md:px-16">
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            name="menu-open"
            className="px-4 py-3"
          >
            <SettingIcon />
          </button>
        </div>
      </header>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
