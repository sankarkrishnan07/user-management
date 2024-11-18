import styled from "styled-components";
import { ReactComponent as IconClose } from "./../../assets/icons/close.svg";
import { MouseEventHandler } from "react";

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5;
  display: inline-flex;
  z-index: 1;
  border: none;
  background: transparent;
`;

export default function CloseButton({
  onClick,
}: {
  onClick: MouseEventHandler;
}) {
  return (
    <Button type="button" onClick={onClick}>
      <IconClose />
    </Button>
  );
}
