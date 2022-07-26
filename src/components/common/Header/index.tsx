import { useState } from "react";

import { useRecoilValue } from "recoil";

import Logo from "./Logo";
import Menu from "./Menu";
import Tab from "./Tab";

import { tabState } from "states/tabState";

const Header = () => {
  const tab = useRecoilValue(tabState);

  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white md:h-20">
        <div className="px-4">
          <Logo />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsTabOpen(!isTabOpen);
            }}
          >
            {tab}月{isTabOpen ? "▲" : "▼"}
          </button>
          <button className="p-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg width="20" height="12">
              <path
                d="M0.833984 11.667C0.613301 11.6665 0.401351 11.5787 0.245117 11.4229C0.0888831 11.267 0.00105528 11.0556 0 10.835C0.000526948 10.6138 0.0888545 10.4016 0.245117 10.2451C0.40138 10.0887 0.612864 10.0008 0.833984 10H19.168C19.3889 10.0008 19.6009 10.0896 19.7568 10.2461C19.9128 10.4026 20 10.614 20 10.835C19.9995 11.0555 19.9118 11.2669 19.7559 11.4229C19.5999 11.5788 19.3885 11.6665 19.168 11.667H0.833984ZM0.833984 6.66699C0.61314 6.66699 0.401465 6.5798 0.245117 6.42383C0.0887692 6.26786 0.000529603 6.0558 0 5.83496C0.000529603 5.61412 0.0887692 5.40207 0.245117 5.24609C0.401465 5.09012 0.61314 5.00293 0.833984 5.00293H19.168C19.3886 5.00293 19.5998 5.09104 19.7559 5.24707C19.9119 5.4031 20 5.6143 20 5.83496C19.9997 6.05554 19.9118 6.26688 19.7559 6.42285C19.5999 6.57882 19.3885 6.66673 19.168 6.66699H0.833984ZM0.833984 1.66699C0.612864 1.6662 0.40138 1.57833 0.245117 1.42188C0.0888545 1.26542 0.000526948 1.05315 0 0.832031C0.00105528 0.61135 0.0888831 0.4 0.245117 0.244141C0.401351 0.0882812 0.613301 0.000525428 0.833984 0H19.168C19.3884 0.000790504 19.6 0.0882814 19.7559 0.244141C19.9117 0.4 19.9992 0.611614 20 0.832031C20 1.05297 19.9128 1.26439 19.7568 1.4209C19.6009 1.57741 19.3889 1.6662 19.168 1.66699H0.833984Z"
                fill="#888"
              />
            </svg>
          </button>
        </div>
      </header>

      {isTabOpen && <Tab />}

      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
