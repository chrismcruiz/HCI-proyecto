import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import InputField from "./InputField"
import RadioButtons from "./RadioButtons"
import SelectField from "./SelectField"
import ModalForm from "./ModalForm"
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { generos, carreras } from "../utils/dataForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { SignUpFormValidation } from "../utils/FormValidation"
import './Forms.css'

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página
  const [signUpError, setSignUpError] = useState(""); // Identificar si hubo errores en la validación del servidor al enviar el formulario
  const [showValid, setShowValid] = useState(false); // Mostrar o ocultar el modal de registro exitoso
  const [showInvalid, setShowInvalid] = useState(false); // Mostrar o ocultar el modal de registro fallido

  // Dejar de mostrar el modal de formulario válido y cambiar al formulario de Login
  const handleCloseValid = () => {
    setShowValid(false)
    window.location = '/login'
  };

  const handleCloseInvalid = () => setShowInvalid(false); // Dejar de mostrar el modal de formulario inválido

  // Función para registrarse y almacenar los datos en la BD.
  const onSignUp = (values) => {
    console.log(values)
    setIsLoading(true);

    let formData = new FormData(); // formData es una estructura de datos (acepta archivos tipo file como imágenes)

    for (let key in values) {
      formData.append(key, values[key]);
    }

    axios
      .post("http://localhost:4000/app/signup/", formData)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          setIsLoading(false);
          setShowValid(true);
        } else {
          setSignUpError(response.data.message);
          setIsLoading(false);
          setShowInvalid(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
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
    <Formik
      initialValues={{
        name: "",
        email: "",
        birthday: "",
        gender: '',
        career: "",
        photo: "",
        password: "",
        confirmPassword: "",
        terms: false,
      }}
      validationSchema={SignUpFormValidation}
      onSubmit={onSignUp}
    >
      {({ errors, touched, setFieldValue }) => (
        <div className="">
          <section className="signup">
            <div className="container-forms">
              <div class="signup-content">
                <div class="signup-form">
                  <h2 class="form-title h2-login-register">Registro</h2>
                  <Form className="register-form">
                    <InputField label="Nombre" classes="zmdi-account material-icons-name" name="name" type="text" />
                    <InputField label="Correo" classes="zmdi-email" name="email" type="text" />
                    <InputField label="Fecha de Nacimiento" classes="" name="birthday" type="date" />
                    {/* <RadioButtons label="Género" classes="" name="gender" type="radio" options={generos} />
                    <SelectField label="Carrera" classes="" name="career" options={carreras} /> */}

                    <InputField label="Contraseña" classes="zmdi-lock" name="password" type="password" />
                    <InputField label="Confirmar contraseña" classes="zmdi-lock-outline" name="confirmPassword" type="password" />
                    <div className="container mb-1">
                      <div className="row">
                        {/****************** Términos y condiciones ******************/}
                        <div className="form-group ms-4">
                          <Field id="terms" type="checkbox" name="terms" className={`agree-term ${errors.terms && touched.terms ? 'is-invalid' : null}`} />
                          <label htmlFor="terms" className="label-agree-term">Acepto los <a href="#" class="term-service">términos y condiciones</a></label>
                          <ErrorMessage name="terms" component="div" className="invalid-feedback" />
                        </div>
                        {/****************** Resetear formulario ******************/}
                        <div className="d-flex justify-content-end col-3 ms-5">
                          <Tooltip title="Limpiar Formulario" placement="left">
                            <IconButton type="reset" className="resetForm" aria-label="reset form">
                              <RefreshIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-button">
                      <input type="submit" name="signup" id="signup" class="form-submit" value="Registrarme" />
                    </div>
                  </Form>
                </div>
                <div class="signup-image">
                  <figure className="figure-login-register"><img className="img-login-register" src="images/signup-image.jpg" alt="sing up image" /></figure>
                  <a href="/login" class="signup-image-link">Ya estoy registrado</a>
                </div>
              </div>
            </div>
          </section>
          {/* <a href="/login" className="a_hover_form_login_registro">
            ¿Ya tienes una cuenta?
            <strong
              className="a_hover_registrarse"
            >
              Inicia sesión
            </strong>
          </a> */}
          {/****************** Modal para el registro satisfactorio ******************/}
          <ModalForm show={showValid} success={true} title="!Correcto!" message="Registro realizado satisfactoriamente!" hide={handleCloseValid} />
          {/****************** Modal para el registro fallido ******************/}
          <ModalForm show={showInvalid} success={false} title="Ooops!" message={signUpError} hide={handleCloseInvalid} />
        </div>
      )}
    </Formik>
  );
};

export default SignupForm