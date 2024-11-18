import styled, { css } from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "medium" | "small";
}

const variations = {
  primary: css`
    background: var(--color-primary);
    border-color: var(--color-primary);

    &:hover {
      color: var(--color-primary);
      background: var(--color-base-white);
    }
  `,

  secondary: css`
    background: var(--color-secondary);
    border-color: var(--color-secondary);

    &:hover {
      color: var(--color-secondary);
      background: var(--color-base-white);
    }
  `,

  tertiary: css`
    background: var(--color-base-white);
    color: var(--color-base-black);
    border-color: var(--color-grey-100);

    &:hover,
    &.-active {
      color: var(--color-blue-300);
      border-color: currentColor;
    }
  `,
};

const sizes = {
  medium: css`
    padding: 0.3375rem 1rem;
  `,

  small: css`
    padding: 0.325rem;
    height: 1.5rem;
    width: 1.5rem;
  `,
};

const Button = styled.button<ButtonProps>`
  border: 1px solid;
  border-radius: 0.125rem;
  color: var(--color-base-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  ${(props) => variations[props.variant ?? "primary"]};
  ${(props) => sizes[props.size ?? "medium"]};

  &:hover,
  &.-active {
    svg * {
      stroke: currentColor;
    }
  }

  &:disabled {
    color: var(--color-grey-500);
    border-color: currentColor;

    svg path {
      stroke: currentColor;
    }
  }
`;

export default Button;
