import styled from "styled-components";
import Flyout from "../../ui/components/Flyout";
import Button from "../../ui/elements/Button";
import UserForm from "./UserForm";
import Modal from "../../ui/components/Modal";
import ConfirmDelete from "../../ui/components/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk } from "./userSlice";
import { ReactComponent as IconEdit } from "./../../assets/icons/edit.svg";
import { ReactComponent as IconDelete } from "./../../assets/icons/delete.svg";
import toast from "react-hot-toast";

const CardActions = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: var(--color-backdrop);

  button {
    border-radius: 100%;
    padding: 8px;

    svg * {
      fill: var(--color-base-white);
      stroke: var(--color-base-white);
    }
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--color-base-white);
  box-shadow: 0 0 5px 0 #0000003e;
  position: relative;

  &:hover {
    ${CardActions} {
      display: flex;
    }
  }
`;

const ImgContainer = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 100%;
  overflow: hidden;
  margin-bottom: 0.5rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.span`
  font-size: var(--fs-16);
  color: #222;
`;

const Mail = styled.span`
  color: #858585;
`;

interface UserRowProps {
  user: any;
}

export default function UserCard({ user }: UserRowProps) {
  const { status, error } = useSelector((state: any) => state.user);

  const {
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    avatar,
  } = user;

  const dispatch = useDispatch<any>();

  async function handleDelete(id: any) {
    await dispatch(deleteUserThunk(id));

    if (status === "idle")
      toast.success(`User ${firstName} ${lastName} deleted successfully`);
    if (status === "error") toast.error(error);
  }

  return (
    <StyledCard>
      <ImgContainer>
        <img src={avatar} alt="" />
      </ImgContainer>
      <Name>
        {firstName} {lastName}
      </Name>
      <Mail>{email}</Mail>
      <CardActions>
        <Flyout>
          <Flyout.Control id="editUser">
            <Button type="button">
              <IconEdit />
            </Button>
          </Flyout.Control>
          <Flyout.Window id="editUser">
            <UserForm userToUpdate={user} />
          </Flyout.Window>
        </Flyout>
        <Modal>
          <Modal.Control id="deleteUser">
            <Button type="button" variant="secondary">
              <IconDelete />
            </Button>
          </Modal.Control>
          <Modal.Window id="deleteUser">
            <ConfirmDelete
              resource={`${firstName} ${lastName}`}
              onConfirm={() => handleDelete(id)}
              disabled={status === "loading"}
            />
          </Modal.Window>
        </Modal>
      </CardActions>
    </StyledCard>
  );
}
