import styled from "styled-components";
import LoginForm from "../features/auth/LoginForm";

const StyledLogin = styled.div`
  align-content: center;
  height: 100vh;
  background: var(--color-bg);
`;

export default function Login() {
  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
}
