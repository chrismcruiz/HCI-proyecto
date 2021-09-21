import React, { useState, useContext } from "react";
import "./LoginForm.css";
import InputFieldVariation from "./InputFieldVariation"
import { setInStorage } from "../utils/storage";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { LoginFormValidation } from "../utils/FormValidation"
import './Forms.css'

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
        <section className="sign-in">
          <div class="container">
            <div class="signin-content">
              <div class="signin-image">
                <figure><img src="images/signin-image.jpg" alt="sing up image" /></figure>
                <a href="/signup" class="signup-image-link">Crear una cuenta</a>
              </div>

              <div class="signin-form">
                <h2 class="form-title">Ingreso</h2>
                <Form>

                  {signInError ? <p className="tool_tip">{signInError}</p> : null}
                  <InputFieldVariation label="Correo" classes="zmdi-email" name="email" type="text" />
                  <InputFieldVariation label="Contraseña" classes="zmdi-lock" name="password" type="password" />
                  <div class="form-group form-button">
                    <input type="submit" name="signin" id="signin" class="form-submit" value="Entrar" />
                  </div>
                </Form>
                <div class="social-login">
                  <span class="social-label">O inicia sesión con</span>
                  <ul class="socials">
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Formik>
      {/* <a href="#" className="a_hover_form_login_registro mt-4">
        ¿Olvidaste tu contraseña?
      </a>
      <a href="/signup" className="a_hover_form_login_registro">
        ¿No tienes una cuenta?{" "}
        <strong
          className="a_hover_registrarse"
        >
          Registrarse
        </strong>
      </a> */}
    </div>
  );
};

export default LoginForm