import Link from "next/link";

import { useAuth } from "hooks/auth";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { authUser } = useAuth();

  return (
    <div
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
            <svg width="16" height="16">
              <path
                d="M13.7125 15.6167L8.00895 9.91316L2.30538 15.6167C2.04949 15.8495 1.71378 15.9749 1.36792 15.9667C1.02207 15.9585 0.692644 15.8175 0.448021 15.5729C0.203398 15.3283 0.0623694 14.9988 0.054208 14.653C0.0460466 14.3071 0.17138 13.9714 0.404192 13.7155L6.10776 8.01197L0.404192 2.30841C0.17138 2.05252 0.0460466 1.71681 0.054208 1.37095C0.0623694 1.0251 0.203398 0.695673 0.448021 0.45105C0.692644 0.206427 1.02207 0.0653982 1.36792 0.0572368C1.71378 0.0490755 2.04949 0.174409 2.30538 0.40722L8.00895 6.11078L13.7125 0.40722C13.9684 0.174409 14.3041 0.0490755 14.65 0.0572368C14.9958 0.0653982 15.3252 0.206427 15.5699 0.45105C15.8145 0.695673 15.9555 1.0251 15.9637 1.37095C15.9718 1.71681 15.8465 2.05252 15.6137 2.30841L9.91013 8.01197L15.6137 13.7155C15.7484 13.8381 15.8568 13.9867 15.9324 14.1523C16.008 14.318 16.0492 14.4972 16.0535 14.6793C16.0578 14.8613 16.0251 15.0423 15.9574 15.2113C15.8897 15.3804 15.7884 15.5339 15.6596 15.6627C15.5309 15.7914 15.3774 15.8927 15.2083 15.9604C15.0393 16.0281 14.8583 16.0608 14.6762 16.0565C14.4942 16.0522 14.3149 16.011 14.1493 15.9354C13.9836 15.8598 13.835 15.7514 13.7125 15.6167V15.6167Z"
                fill="#888"
              />
            </svg>
          </button>
        </header>

        <div className="mt-4 flex h-8 items-center justify-center font-bold">
          <Link href="/">
            <a>ホーム</a>
          </Link>
        </div>

        {authUser?.isAnonymous && (
          <>
            <div className="mt-4 flex h-8 items-center justify-center font-bold">
              <Link href="/signup">
                <a>新規登録</a>
              </Link>
            </div>

            <div className="mt-4 flex h-8 items-center justify-center font-bold">
              <Link href="/signin">
                <a>サインイン</a>
              </Link>
            </div>
          </>
        )}

        {!authUser?.isAnonymous && (
          <div className="mt-4 flex h-8 items-center justify-center font-bold">
            <Link href="/my">
              <a>マイページ</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
