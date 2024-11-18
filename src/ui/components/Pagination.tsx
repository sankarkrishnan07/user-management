import Button from "../elements/Button";
import { ReactComponent as IconPrevious } from "./../../assets/icons/chevron-left.svg";
import { ReactComponent as IconNext } from "./../../assets/icons/chevron-right.svg";
import styled from "styled-components";
import { MouseEventHandler } from "react";

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 1rem;
`;

interface PaginationProps {
  handlePrevious: MouseEventHandler;
  handleClick: CallableFunction;
  handleNext: MouseEventHandler;
  totalPages: number;
  curPage: number;
}

export default function Pagination({
  handlePrevious,
  handleClick,
  handleNext,
  totalPages,
  curPage,
}: PaginationProps) {
  return (
    <StyledPagination>
      <Button
        type="button"
        size="small"
        variant="tertiary"
        onClick={handlePrevious}
        disabled={curPage === 1}
      >
        <IconPrevious />
      </Button>
      {Array.from({ length: totalPages }).map((_, i: any) => (
        <Button
          key={i}
          type="button"
          size="small"
          variant="tertiary"
          className={curPage === i + 1 ? "-active" : ""}
          onClick={() => handleClick(i + 1)}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        type="button"
        size="small"
        variant="tertiary"
        onClick={handleNext}
        disabled={curPage === totalPages}
      >
        <IconNext />
      </Button>
    </StyledPagination>
  );
}
