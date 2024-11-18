import styled from "styled-components";
import Input from "../elements/Input";
import { ReactComponent as IconSearch } from "./../../assets/icons/search.svg";
import { ChangeEventHandler } from "react";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;

  input {
    background: transparent;
  }

  svg {
    border: 1px solid var(--color-grey-100);
    height: 2rem;
    width: 2rem;
    padding: 0.375rem;
  }
`;

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <StyledSearch>
      <Input
        placeholder="input search text"
        value={value}
        onChange={onChange}
      />
        <IconSearch />
    </StyledSearch>
  );
}
