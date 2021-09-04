import React, { useState, useContext } from "react";
import "./LoginForm.css";
import InputFieldVariation from "./InputFieldVariation"
import {
  BoldLink,
  BoxContainer,
  // Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { setInStorage } from "../../utils/storage";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { LoginFormValidation } from "../../utils/FormValidation"

export const LoginForm = () => {
  const { switchToSignup } = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página
  const [signInError, setSignInError] = useState("");

  // Función para loguearse y crear un token en el LocalStorage

  const onSignIn = (values) => {
    setIsLoading(true);

    axios.post('http://localhost:4000/app/signin/', values)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          setInStorage("the_main_app", {
            token: response.data.token,
            idUser: response.data.id_user,
          })
          setSignInError("");
          window.location = '/home'
          setIsLoading(false);
        } else {
          setSignInError(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <BoxContainer>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginFormValidation}
        onSubmit={onSignIn}
      >
        <Form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {signInError ? <p className="tool_tip">{signInError}</p> : null}
          <InputFieldVariation label="Correo" name="email" type="text" />
          <InputFieldVariation label="Contraseña" name="password" type="password" />
          <SubmitButton className="mt-3">Entrar</SubmitButton>
        </Form>

      </Formik>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" className="a_hover_form_login_registro mt-4">
        ¿Olvidaste tu contraseña?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#" className="a_hover_form_login_registro">
        ¿No tienes una cuenta?{" "}
        <BoldLink
          className="a_hover_registrarse"
          href="#"
          onClick={switchToSignup}
        >
          Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
