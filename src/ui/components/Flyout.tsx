import React, {
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
import styled from "styled-components";
import CloseButton from "../elements/CloseButton";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-backdrop);
  backdrop-filter: blur(0.25rem);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledFlyout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20rem;
  background: var(--color-base-white);
`;

interface FlyoutContextType {
  control: any;
  open: SetStateAction<any>;
  close: MouseEventHandler;
}

const FlyoutContext = createContext<FlyoutContextType>({
  control: "",
  open: () => {},
  close: () => {},
});

function Flyout({ children }: { children: ReactNode }) {
  const [control, setControl] = useState("");

  const open = setControl;
  const close = () => setControl("");

  return (
    <FlyoutContext.Provider value={{ control, open, close }}>
      {children}
    </FlyoutContext.Provider>
  );
}

function Control({ children, id }: { children: ReactElement; id: any }) {
  const { open } = useContext(FlyoutContext);

  return cloneElement(children, {
    onClick: () => open(id),
  });
}

function Window({ children, id }: { children: ReactElement; id: any }) {
  const { close, control } = useContext(FlyoutContext);

  if (control !== id) return null;

  return createPortal(
    <Overlay>
      <CloseButton onClick={close} />
      <StyledFlyout>{cloneElement(children, { onClose: close })}</StyledFlyout>
    </Overlay>,
    document.body
  );
}

Flyout.Control = Control;
Flyout.Window = Window;

export default Flyout;
