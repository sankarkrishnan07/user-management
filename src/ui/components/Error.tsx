import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

const StyledError = styled.div`
position: fixed;
inset: 0;
display: flex;
flex-direction: column;
align-tracks: center;
justify-content: center;
gap: 1rem;
font-size: 20px;
max-width: 400px;
margin: auto;

button {
    align-self: flex-end;
}
`

export default function Error() {
  const error:any = useRouteError();
  const navigate = useNavigate();

  return (
    <StyledError>
      <span>Something went wrong!</span>
      <p>{error.data || error.message}</p>
      <Button variant="tertiary" type="button" onClick={()=>navigate(-1)}>&larr; Go Back</Button>
    </StyledError>
  );
}
