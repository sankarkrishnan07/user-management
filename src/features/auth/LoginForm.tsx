import styled from "styled-components";
import Button from "../../ui/elements/Button";
import CheckBox from "../../ui/elements/CheckBox";
import Input from "../../ui/elements/Input";
import FormRow from "../../ui/components/FormRow";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, loginThunk } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconUser } from "./../../assets/icons/user.svg";
import { ReactComponent as IconLock } from "./../../assets/icons/lock.svg";
import { useEffect } from "react";
import Loader from "../../ui/components/Loader";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 450px;
  margin: auto;
  padding: 2rem 2rem 2.5rem;
  border-radius: 0.5rem;
  background: var(--color-base-white);

  & > div {
    position: relative;

    input {
      background-color: #e7f0fe;
      background-clip: content-box;
      padding: 0.25rem 0.5rem 0.25rem 1.5rem;
    }

    svg {
      position: absolute;
      top: 4px;
      left: 4px;
    }
  }
`;

export default function LoginForm() {
  const dispatch = useDispatch<any>();
  const { status } = useSelector((state: any) => state.auth);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: { email: "eve.holt@reqres.in", password: "cityslicka" },
  });
  const navigate = useNavigate();

  const { errors } = formState;

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo") as string);

    if (loginInfo) {
      dispatch(autoLogin(loginInfo));
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  async function onSubmit(data: any) {
    await dispatch(loginThunk(data));
    navigate("/", { replace: true });
  }

  if (status === "loading") return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.email?.message}>
        <IconUser />
        <Input
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please input a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow error={errors?.password?.message}>
        <IconLock />
        <Input
          type="password"
          {...register("password", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <CheckBox label="Remember Me" register={register} />
      </FormRow>
      <Button type="submit" disabled={status === "loading"}>
        Login
      </Button>
    </Form>
  );
}
