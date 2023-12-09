"use client";

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

type ModalContextProps = {
  setModalContents: Dispatch<SetStateAction<ReactNode>>;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalContents, setModalContents] = useState<ReactNode>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        setModalContents(null);
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
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-trans-black p-4"
          data-cy="modal"
        >
          <div
            ref={modalRef}
            className="max-w-md overflow-hidden rounded bg-white p-4 shadow-xl dark:bg-gray-950"
          >
            <div className="text-right">
              <button
                className="p-2"
                onClick={() => setModalContents(null)}
                aria-label="close modal"
              >
                <CloseIcon />
              </button>
            </div>
            {modalContents}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
