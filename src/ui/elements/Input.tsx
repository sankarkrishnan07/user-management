import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-100);
  border-radius: 0.125rem;
  padding: 0.325rem 1rem;
  outline: none;

  &:focus-within {
    border-color: var(--color-blue-400);
    box-shadow: var(--box-shadow);
  }
`;
export default Input;
