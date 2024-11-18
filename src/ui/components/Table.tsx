import { useContext } from "react";
import styled from "styled-components";
import { createContext } from "react";

interface CommonRowProps {
  columns: string;
}

const CommonRow = styled.div.attrs({ role: "row" })<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  gap: 1rem;
  align-items: center;
`;

const StyledHeader = styled(CommonRow)`
  background: var(--color-grey-200);
  border-top: 1px solid var(--color-grey-300);
  border-bottom: 1px solid var(--color-grey-300);
  padding: 1rem;
`;

const StyledBody = styled.section`
  background: var(--color-base-white);
`;

const StyledRow = styled(CommonRow)`
  background: var(--color-base-white);
  border-top: 1px solid var(--color-grey-300);
  border-bottom: 1px solid var(--color-grey-300);
  padding: 1rem;
`;

const Empty = styled.div`
  font-size: 1rem;
  font-weight: 500;
  min-height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--color-base-white);
  justify-content: center;
`;
interface ContextType {
  columns: string;
}

const TableContext = createContext<ContextType>({ columns: "" });

interface TableProps {
  children: any;
  columns: string;
}

function Table({ children, columns }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div role="table">{children}</div>
    </TableContext.Provider>
  );
}

interface RowProps {
  children: any;
}

function Header({ children }: RowProps) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
}

interface BodyProps {
  data: any;
  render: CallableFunction;
}

function Body({ data, render }: BodyProps) {
  if (!data.length) return <Empty>No data to show at the moment!</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Row({ children }: RowProps) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
