import { type ReactNode, useRef, useEffect } from "react";
import { CloseIcon } from "@/components/atoms/icons/CloseIcon";

type Props = {
  children: ReactNode;
  isShown: boolean;
  onHide: () => void;
};

export const SlideIn = ({ children, isShown, onHide }: Props) => {
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
      } fixed left-0 top-0 z-20 h-screen w-screen bg-trans-black duration-300`}
    >
      <div
        ref={slideInRef}
        className={`${
          !isShown && "translate-x-full"
        } absolute right-0 top-0 z-20 h-screen w-[80%] bg-white duration-300`}
      >
        <header className="flex h-12 flex-row-reverse items-center border-b border-gray-200 bg-white md:h-20 md:px-16">
          <button className="p-4" onClick={onHide} aria-label="close menu">
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};
