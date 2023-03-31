import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import CloseIcon from "@/components/atoms/icons/CloseIcon";

type ModalContextProps = {
  setModalContents: Dispatch<SetStateAction<ReactNode>>;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

type Props = {
  children: ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [modalContents, setModalContents] = useState<ReactNode>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalContents(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ setModalContents }}>
      {children}
      {modalContents && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-trans-black p-4">
          <div
            ref={modalRef}
            className="max-w-md overflow-hidden rounded-xl bg-white p-4 shadow-xl"
          >
            <div className="text-right">
              <button className="p-2" onClick={() => setModalContents(null)}>
                <CloseIcon />
              </button>
            </div>
            {modalContents}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext);