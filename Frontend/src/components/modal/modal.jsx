import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "./modal.css";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("DIV");
  }

  useEffect(() => {
    const modalNode = document.getElementById("modal");
    modalNode.appendChild(elRef.current);

    return () => {
      modalNode.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
