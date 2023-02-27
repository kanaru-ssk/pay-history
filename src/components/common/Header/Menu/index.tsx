import Link from "next/link";
import { useEffect } from "react";

import MenuItem from "./MenuItem";

import CloseIcon from "components/common/icons/CloseIcon";
import LanguageIcon from "components/common/icons/LanguageIcon";
import { languages } from "constants/languages";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { locale } = useLocale();
  const { authUser } = useAuth();

  // click out of the slider to close
  useEffect(() => {
    const onClickOverlay = (e: any) => {
      if (e.target.id === "menu-overlay") setIsMenuOpen(false);
    };
    addEventListener("click", onClickOverlay, { passive: false });
    return () => {
      removeEventListener("click", onClickOverlay);
    };
  }, [setIsMenuOpen]);

  return (
    <div
      id="menu-overlay"
      className={
        (isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0") +
        " fixed top-0 left-0 z-20 h-screen w-screen bg-trans-black duration-300"
      }
    >
      <div
        className={
          (isMenuOpen ? "" : "translate-x-full") +
          " absolute top-0 right-0 z-20 h-screen w-[80%] bg-white duration-300"
        }
      >
        <header className="flex h-12 flex-row-reverse items-center border-b border-gray bg-white md:h-20">
          <button className="p-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <CloseIcon />
          </button>
        </header>

        <MenuItem>
          <Link href="/">
            <a onClick={() => setIsMenuOpen(false)}>Home</a>
          </Link>
        </MenuItem>

        {authUser?.isAnonymous && (
          <>
            <MenuItem>
              <Link href="/signUp">
                <a onClick={() => setIsMenuOpen(false)}>Sign Up</a>
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href="/signIn">
                <a onClick={() => setIsMenuOpen(false)}>Sign In</a>
              </Link>
            </MenuItem>
          </>
        )}

        {!authUser?.isAnonymous && (
          <MenuItem>
            <Link href="/my">
              <a onClick={() => setIsMenuOpen(false)}>My Page</a>
            </Link>
          </MenuItem>
        )}

        <MenuItem>
          <details className="border rounded-lg border-gray px-8">
            <summary className="font-bold p-1 cursor-pointer">
              <span className="mx-1">
                <LanguageIcon />
              </span>
              {languages.find((language) => language.locale === locale)?.name}
            </summary>
            <div className="mt-2">
              {languages.map((language) => {
                return (
                  <Link
                    href="/"
                    locale={language.locale}
                    passHref
                    key={language.locale}
                  >
                    <a>
                      <div className="m-1 text-center">{language.name}</div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </details>
        </MenuItem>
      </div>
    </div>
  );
};

export default Menu;
