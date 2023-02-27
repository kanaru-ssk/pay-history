import Link from "next/link";
import { useEffect } from "react";

import MenuItem from "./MenuItem";

import { colors } from "constants/colors";
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
            <svg width="15" height="16">
              <path
                d="M8.64394 7.64062L14.7963 0.307031C14.8994 0.185156 14.8127 0 14.6533 0H12.783C12.6728 0 12.5674 0.0492187 12.4947 0.133594L7.4205 6.18281L2.34628 0.133594C2.27597 0.0492187 2.1705 0 2.058 0H0.187688C0.0283129 0 -0.058406 0.185156 0.044719 0.307031L6.19706 7.64062L0.044719 14.9742C0.021618 15.0014 0.0067979 15.0346 0.0020175 15.0699C-0.00276289 15.1053 0.00269726 15.1413 0.0177503 15.1736C0.0328033 15.2059 0.0568169 15.2332 0.0869395 15.2523C0.117062 15.2714 0.152029 15.2814 0.187688 15.2812H2.058C2.16816 15.2812 2.27363 15.232 2.34628 15.1477L7.4205 9.09844L12.4947 15.1477C12.565 15.232 12.6705 15.2812 12.783 15.2812H14.6533C14.8127 15.2812 14.8994 15.0961 14.7963 14.9742L8.64394 7.64062Z"
                fill={colors.DARK_GRAY}
              />
            </svg>
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
            <summary className="font-bold p-1">
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
                      <div className="m-1">{language.name}</div>
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
