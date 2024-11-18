import styled from "styled-components";
import Button from "../../ui/elements/Button";
import Table from "../../ui/components/Table";
import Flyout from "../../ui/components/Flyout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk } from "./userSlice";
import Modal from "../../ui/components/Modal";
import ConfirmDelete from "../../ui/components/ConfirmDelete";
import UserForm from "./UserForm";
import toast from "react-hot-toast";

interface UserRowProps {
  user: any;
}

const ImgContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  overflow: hidden;
  justify-self: center;

  img {
    height: 100%;
    width: 100%;
  }
`;

const Email = styled.span`
  color: var(--color-primary);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function UserRow({ user }: UserRowProps) {
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
    <Table.Row>
      <ImgContainer>
        <img src={avatar} alt="" />
      </ImgContainer>
      <Email>{email}</Email>
      <span>{firstName}</span>
      <span>{lastName}</span>
      <Actions>
        <Flyout>
          <Flyout.Control id="editUser">
            <Button type="button">Edit</Button>
          </Flyout.Control>
          <Flyout.Window id="editUser">
            <UserForm userToUpdate={user} />
          </Flyout.Window>
        </Flyout>
        <Modal>
          <Modal.Control id="deleteUser">
            <Button type="button" variant="secondary">
              Delete
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
      </Actions>
    </Table.Row>
  );
}
