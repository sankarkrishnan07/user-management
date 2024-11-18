import styled from "styled-components";
import Button from "../elements/Button";
import { ReactComponent as IconLogout } from "./../../assets/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../features/auth/authSlice";

const StyledHeader = styled.header`
  background: var(--color-blue-200);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: var(--color-base-white);
  font-weight: 500;
`;

const UserName = styled.span`
  text-transform: capitalize;
`;

export default function Header() {
  const { email } = useSelector((state: any) => state.auth);
  const { status } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<any>();

  const [firstName, lastName] = email.split("@")[0].split(".");
  const userName = `${firstName} ${lastName}`;

  function handleLogout() {
    dispatch(logoutThunk());
  }

  return (
    <StyledHeader>
      <UserName>{userName}</UserName>
      <Button
        type="button"
        variant="secondary"
        size="small"
        onClick={handleLogout}
        disabled={status === "loading"}
      >
        <IconLogout />
      </Button>
    </StyledHeader>
  );
}
