import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { CloseIcon } from "@/components/ui/icon/CloseIcon";

type SlideInContextProps = {
  setSlideInContents: Dispatch<SetStateAction<ReactNode>>;
};

const SlideInContext = createContext<SlideInContextProps>(
  {} as SlideInContextProps
);

type SlideInProviderProps = {
  children: ReactNode;
};

export const SlideInProvider = ({ children }: SlideInProviderProps) => {
  const [slideInContents, setSlideInContents] = useState<ReactNode>(null);
  const slideInRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        slideInRef.current &&
        !slideInRef.current.contains(event.target as Node)
      )
        setSlideInContents(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SlideInContext.Provider value={{ setSlideInContents }}>
      {children}
      <div
        className={`${
          slideInContents === null
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        } fixed left-0 top-0 z-20 h-screen w-screen bg-trans-black duration-300`}
      >
        <div
          ref={slideInRef}
          className={`${
            slideInContents === null ? "translate-x-full" : ""
          } absolute right-0 top-0 z-20 h-screen w-[80%] bg-white duration-300`}
        >
          <header className="flex h-12 flex-row-reverse items-center border-b border-gray-200 bg-white md:h-20 md:px-16">
            <button
              className="p-4"
              onClick={() => setSlideInContents(null)}
              aria-label="close menu"
            >
              <CloseIcon />
            </button>
          </header>
          {slideInContents}
        </div>
      </div>
    </SlideInContext.Provider>
  );
};

export const useSlideIn = () => useContext(SlideInContext);
