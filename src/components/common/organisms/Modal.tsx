import { ReactNode, useRef, useEffect } from "react";

import CloseIcon from "components/common/atoms/icons/CloseIcon";

type Props = {
  children: ReactNode;
  isShown: boolean;
  onHide: () => void;
};

const Modal = ({ children, isShown, onHide }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onHide();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!isShown) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-trans-black">
      <div
        ref={modalRef}
        className="max-w-md p-4 overflow-hidden bg-white shadow-xl rounded-xl"
      >
        <div className="text-right">
          <button type="button" onClick={onHide}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
