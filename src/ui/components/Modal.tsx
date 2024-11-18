import styled from "styled-components";
import {
  cloneElement,
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import CloseButton from "../elements/CloseButton";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-base-white);
  padding: 2rem 2.5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-backdrop);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

interface ModalContextType {
  control: any;
  open: SetStateAction<any>;
  close: MouseEventHandler;
}

const ModalContext = createContext<ModalContextType>({
  control: "",
  open: () => {},
  close: () => {},
});

function Modal({ children }: { children: ReactNode }) {
  const [control, setControl] = useState("");

  const close = () => setControl("");
  const open = setControl;

  return (
    <ModalContext.Provider value={{ open, close, control }}>
      {children}
    </ModalContext.Provider>
  );
}

function Control({ children, id }: { children: ReactElement; id: any }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(id) });
}

function Window({ children, id }: { children: ReactNode; id: any }) {
  const { close, control } = useContext(ModalContext);

  if (control !== id) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <CloseButton onClick={close} />
        {cloneElement(children as ReactElement, { onClose: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Control = Control;
Modal.Window = Window;

export default Modal;
