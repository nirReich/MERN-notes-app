import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { loginCredentials } from "../network/notes_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

type Props = {
  onDismiss: () => void;
  onLoginSuccesses: (user: User) => void;
};

function LoginModal({ onDismiss, onLoginSuccesses }: Props) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginCredentials>();
  async function onSubmit(credentials: loginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccesses(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
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
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
