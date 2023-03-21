import { ReactNode, useRef, useEffect } from "react";
import CloseIcon from "components/atoms/icons/CloseIcon";

type Props = {
  children: ReactNode;
  isShown: boolean;
  onHide: () => void;
};

const SlideIn = ({ children, isShown, onHide }: Props) => {
  const slideInRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      slideInRef.current &&
      !slideInRef.current.contains(event.target as Node)
    ) {
      onHide();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      className={`${
        isShown ? "opacity-100" : "pointer-events-none opacity-0"
      } fixed top-0 left-0 z-20 h-screen w-screen bg-trans-black duration-300`}
    >
      <div
        ref={slideInRef}
        className={`absolute top-0 right-0 z-20 h-screen w-[80%] bg-white duration-300 ${
          !isShown && "translate-x-full"
        }`}
      >
        <header className="flex h-12 flex-row-reverse items-center border-b border-gray bg-white md:h-20">
          <button className="p-4" onClick={onHide}>
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default SlideIn;
