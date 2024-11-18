import styled from "styled-components";
import Button from "../../ui/elements/Button";
import Search from "../../ui/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { changeView, setSearchBy } from "./userSlice";
import Flyout from "../../ui/components/Flyout";
import UserForm from "./UserForm";
import { ChangeEvent } from "react";
import { ReactComponent as IconTable } from "./../../assets/icons/table.svg";
import { ReactComponent as IconCard } from "./../../assets/icons/card.svg";

const Header = styled.header`
  background: var(--color-base-white);
  padding: 1.5rem 1.5rem 0;

  h1 {
    font-size: var(--fs-20);
    font-weight: 500;
  }

  div::nth-child(2) {
    button {
      padding: 10px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;

  &:first-child {
    margin-bottom: 0.5rem;
  }
`;

const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default function UsersHeader() {
  const users: any = useSelector((store) => (store as any).user);
  const { searchBy, view } = users;
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchBy(e.target.value));
  }

  function handleClick(view: string) {
    dispatch(changeView(view));
  }

  return (
    <Header>
      <Row>
        <h1>Users</h1>
        <ActionWrap>
          <Search value={searchBy} onChange={handleChange} />
          <Flyout>
            <Flyout.Control id="createUser">
              <Button>Create User</Button>
            </Flyout.Control>
            <Flyout.Window id="createUser">
              <UserForm />
            </Flyout.Window>
          </Flyout>
        </ActionWrap>
      </Row>
      <Row>
        <div>
          <Button
            type="button"
            variant="tertiary"
            className={view === "table" ? "-active" : ""}
            onClick={() => handleClick("table")}
          >
            <IconTable />
            Table
          </Button>
          <Button
            type="button"
            variant="tertiary"
            className={view === "card" ? "-active" : ""}
            onClick={() => handleClick("card")}
          >
            <IconCard />
            Card
          </Button>
        </div>
      </Row>
    </Header>
  );
}
