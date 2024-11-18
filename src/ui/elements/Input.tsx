import styled from "styled-components";

const Input = styled.input`
    border: 1px solid var(--color-grey-100);
    border-radius: 0.125rem;
    padding: 0.325rem 1rem;
    outline: none;

    &:focus-within {
       border-color: #69bbff;
       box-shadow: 0 0 3px 0 #d437ff;
    }
`
export default Input;