import React, { useState, useContext } from "react";
import "./LoginForm.css";
import InputFieldVariation from "./InputFieldVariation"
import { setInStorage } from "../utils/storage";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { LoginFormValidation } from "../utils/FormValidation"
import { Modal, Alert } from "react-bootstrap";
import './Forms.css'
import Navbar2 from './Navbar2'

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
      <Navbar2 />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginFormValidation}
        onSubmit={onSignIn}
      >
        <section className="sign-in">
          <div class="container-forms">
            <div class="signin-content">
              <div class="signin-image">
                <figure className="figure-login-register"><img className="img-login-register" src="images/signin-image.jpg" alt="sing up image" /></figure>
                <a href="/signup" className="signup-image-link">Crear una cuenta</a>
              </div>

              <div class="signin-form">
                <h2 class="form-title h2-login-register">Ingreso</h2>
                <Form>
                  {signInError ? (<Alert variant="danger">
                    {signInError}
                  </Alert>) : null}
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
    </div>
  );
};

export default LoginForm