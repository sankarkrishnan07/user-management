import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loading = keyframes`
   20% {
      background-position:
        0% 0%,
        50% 50%,
        100% 50%;
    }
    40% {
      background-position:
        0% 100%,
        50% 0%,
        100% 50%;
    }
    60% {
      background-position:
        0% 50%,
        50% 100%,
        100% 0%;
    }
    80% {
      background-position:
        0% 50%,
        50% 50%,
        100% 100%;
    }`;

const StyledLoader = styled.div`
  width: 45px;
  aspect-ratio: 0.75;
  --c: no-repeat linear-gradient(#292524 0 0);
  background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
  background-size: 20% 50%;
  animation: ${loading} 1s infinite linear;
`;

export default function Loader() {
  return (
    <Wrapper>
      <StyledLoader />
    </Wrapper>
  );
}
