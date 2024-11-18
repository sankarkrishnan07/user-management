import { useForm } from "react-hook-form";
import FormRow from "../../ui/components/FormRow";
import Input from "../../ui/elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, updateUserThunk } from "./userSlice";
import styled from "styled-components";
import Button from "../../ui/elements/Button";
import toast from "react-hot-toast";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex: 1;

  label {
    padding-left: 0.75rem;
    position: relative;

    &::before {
      content: "*";
      color: #ff4b4d;
      position: absolute;
      left: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const InputWrap = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1rem 0;
  border-top: 1px solid var(--color-grey-100);
`;

export default function UserForm({
  onClose,
  userToUpdate = {},
}: {
  onClose?: () => {};
  userToUpdate?: any;
}) {
  const dispatch = useDispatch<any>();
  const { status, error } = useSelector((store: any) => store.user);

  const { id: updateId, ...updatedValues } = userToUpdate;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: updateId ? updatedValues : {},
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    if (updateId) await dispatch(updateUserThunk({ id: updateId, ...data }));
    else await dispatch(createUserThunk(data));

    onClose && onClose();

    if (status === "idle")
      toast.success(
        `User ${data.first_name} ${data.last_name} ${
          updateId ? "updated" : "created"
        } successfully!`
      );

    if (status === "error") toast.error(error);
  }

  return (
    <Wrapper>
      <Header>{updateId ? "Edit User" : "Create New User"}</Header>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrap>
          <FormRow label="First Name" error={errors?.first_name?.message}>
            <Input
              type="text"
              id="first-name"
              {...register("first_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Last Name" error={errors?.last_name?.message}>
            <Input
              type="text"
              id="last-name"
              {...register("last_name", { required: "This field is required" })}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please input a valid email address",
                },
              })}
            />
          </FormRow>
          <FormRow label="Profile Image Link" error={errors?.avatar?.message}>
            <Input
              type="url"
              id="img-url"
              {...register("avatar", {
                required: "This field is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[^\s]*)?$/,
                  message: "Please input a valid URL",
                },
              })}
            />
          </FormRow>
        </InputWrap>
        <Actions>
          <Button
            type="reset"
            variant="tertiary"
            onClick={reset}
            disabled={status === "loading"}
          >
            Cancel
          </Button>
          <Button disabled={status === "loading"}>Submit</Button>
        </Actions>
      </StyledForm>
    </Wrapper>
  );
}
