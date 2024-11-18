import styled from "styled-components";
const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Icon = styled.span`
  height: 1.25rem;
  width: 1.25rem;
  border: 1px solid var(--color-grey-100);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  ${StyledCheckBox}:checked + ${Icon} {
    background: var(--color-primary);

    &:after {
      content: "";
      transform: translateX(10%) translateY(-25%);
      height: 6px;
      width: 10px;
      border-left: 2px solid var(--color-base-white);
      border-bottom: 2px solid var(--color-base-white);
      rotate: -45deg;
    }
  }
`;

interface CheckBoxProps {
  label?: string;
  register?: any;
}

export default function CheckBox({ label = "Label", register }: CheckBoxProps) {
  return (
    <Label>
      <StyledCheckBox {...register("rememberMe")} />
      <Icon />
      {label}
    </Label>
  );
}
