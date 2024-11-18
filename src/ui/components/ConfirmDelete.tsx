import { MouseEventHandler } from "react";
import Button from "../elements/Button";
import styled from "styled-components";
import { ReactComponent as IconWarning } from "./../../assets/icons/warning.svg";

interface confirmDeleteProps {
  resource: string;
  onConfirm: MouseEventHandler;
  onClose?: MouseEventHandler;
  disabled?:boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-end;
  margin-top: 0.5rem;
`;

const Title = styled.h3`
  font-size: var(--fs-16);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function ConfirmDelete({
  resource,
  onConfirm,
  onClose,
  disabled
}: confirmDeleteProps) {
  return (
    <Wrapper>
      <Title>
        <IconWarning /> Delete {resource}
      </Title>
      <p>
        Are you sure you want to delete {resource}? This Action cannot be
        undone.
      </p>
      <Actions>
        <Button type="button" variant="tertiary" onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button type="button" variant="secondary" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </Actions>
    </Wrapper>
  );
}
