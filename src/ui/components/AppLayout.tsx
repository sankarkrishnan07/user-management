import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
const StyledAppLayout = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
`;


export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
}
