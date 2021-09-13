import React, { useState, useContext } from "react";
import "./LoginForm.css";
import InputFieldVariation from "./InputFieldVariation"
import { setInStorage } from "../utils/storage";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { LoginFormValidation } from "../utils/FormValidation"

const LoginForm = () => {
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
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginFormValidation}
        onSubmit={onSignIn}
      >
        <Form>
          {signInError ? <p className="tool_tip">{signInError}</p> : null}
          <InputFieldVariation label="Correo" name="email" type="text" />
          <InputFieldVariation label="Contraseña" name="password" type="password" />
          <button className="mt-3">Entrar</button>
        </Form>

      </Formik>
      <a href="#" className="a_hover_form_login_registro mt-4">
        ¿Olvidaste tu contraseña?
      </a>
      <a href="/signup" className="a_hover_form_login_registro">
        ¿No tienes una cuenta?{" "}
        <strong
          className="a_hover_registrarse"
        >
          Registrarse
        </strong>
      </a>
    </div>
  );
};

export default LoginForm