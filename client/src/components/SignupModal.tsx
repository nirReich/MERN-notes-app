import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

type Props = {
  onDismiss: () => void;
  onSignUpSuccesses: (user: User) => void;
};

function SignupModal({ onDismiss, onSignUpSuccesses: onSignupSuccesses }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotesApi.SignUpCredentials>();

  async function onSubmit(credentials: NotesApi.SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignupSuccesses(newUser);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="userName"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignupModal;
