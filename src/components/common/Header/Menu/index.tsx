import { useEffect } from "react";

import AnonymousMenu from "./AnonymousMenu";
import LanguageMenu from "./LanguageMenu";
import SignedInMenu from "./SignedInMenu";

import CloseIcon from "components/common/icons/CloseIcon";
import { useAuth } from "hooks/auth";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
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

        <div className="m-8">
          {authUser?.isAnonymous ? (
            <AnonymousMenu onClick={() => setIsMenuOpen(false)} />
          ) : (
            <SignedInMenu onClick={() => setIsMenuOpen(false)} />
          )}
          <div className="mt-8">
            <LanguageMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
