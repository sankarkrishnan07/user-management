import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledError = styled.span`
    color: red;
`

interface FormRowProps {
  label?: string;
  children: ReactNode;
  error?: any;
}

export default function FormRow({ label, children, error }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && (
        <label htmlFor={(children as ReactElement).props.id}>{label}</label>
      )}
      {children}
      {error && <StyledError>{error}</StyledError>}
    </StyledFormRow>
  );
}
