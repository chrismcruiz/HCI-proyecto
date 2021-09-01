import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import InputField from "./InputField"
import RadioButtons from "./RadioButtons"
import SelectField from "./SelectField"
import ModalForm from "./ModalForm"
import {
  BoldLink,
  BoxContainer,
  // Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { generos, carreras } from "../../utils/dataForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { SignUpFormValidation } from "../../utils/FormValidation"

export const SignupForm = () => {
  const { switchToSignin } = useContext(AccountContext); // Para cambiar al formulario de Login
  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página
  const [signUpError, setSignUpError] = useState(""); // Identificar si hubo errores en la validación del servidor al enviar el formulario
  const [showValid, setShowValid] = useState(false); // Mostrar o ocultar el modal de registro exitoso
  const [showInvalid, setShowInvalid] = useState(false); // Mostrar o ocultar el modal de registro fallido

  // Dejar de mostrar el modal de formulario válido y cambiar al formulario de Login
  const handleCloseValid = () => {
    setShowValid(false);
    setTimeout(() => {
      switchToSignin();
    }, 400);
  };

  const handleCloseInvalid = () => setShowInvalid(false); // Dejar de mostrar el modal de formulario inválido

  // Función para registrarse y almacenar los datos en la BD.
  const onSignUp = async (values) => {
    console.log(values)
    setIsLoading(true);

    let formData = new FormData(); // formData es una estructura de datos (acepta archivos tipo file como imágenes)

    for ( let key in values ) {
      formData.append(key, values[key]);
    }

    await axios
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
        <BoxContainer>
          <Form style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <InputField label="Nombre" name="name" type="text" />
            <InputField label="Correo" name="email" type="text" />
            <InputField label="Fecha de Nacimiento" name="birthday" type="date" />
            <RadioButtons label="Género" name="gender" type="radio" options={generos} />
            <SelectField label="Carrera" name="career" options={carreras} />
            {/****************** Subir imágen ******************/}
            <div className="input-group mb-2">
              <input
                className="label-color form-control"
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg"
                id="photo"
                onChange={(e) => setFieldValue("photo", e.target.files[0])}
              />
              <label htmlFor="photo" className="pointer w-100 input-group-text d-flex flex-column">
                Sube una imagen
                <br />
                <span className="label-color optional">(Opcional)</span>
              </label>
            </div>
            <InputField label="Contraseña" name="password" type="password" />
            <InputField label="Confirmar contraseña" name="confirmPassword" type="password" />
            <div className="container mb-1">
              <div className="row">
                {/****************** Términos y condiciones ******************/}
                <div className="col-11 form-group form-check">
                  <Field id="terms" type="checkbox" name="terms" className={`form-check-input ' ${errors.terms && touched.terms ? 'is-invalid' : null}`} />
                  <label htmlFor="terms" className="form-check-label">Acepto los términos y condiciones</label>
                  <ErrorMessage name="terms" component="div" className="invalid-feedback" />
                </div>
                {/****************** Resetear formulario ******************/}
                <div className="col-1">
                  <Tooltip title="Limpiar Formulario" placement="left">
                    <IconButton type="reset" className="resetForm" aria-label="reset form">
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <SubmitButton type="submit">Registrarme</SubmitButton>
          </Form>

          <Marginer direction="vertical" margin={10} />
          <Marginer direction="vertical" margin="1em" />
          <MutedLink href="#" className="a_hover_form_login_registro">
            ¿Ya tienes una cuenta?
            <BoldLink
              className="a_hover_registrarse"
              href="#"
              onClick={switchToSignin}
            >
              Inicia sesión
            </BoldLink>
          </MutedLink>
          {/****************** Modal para el registro satisfactorio ******************/}
          <ModalForm show={showValid} success={true} title="!Correcto!" message="Registro realizado satisfactoriamente!" hide={handleCloseValid} />
          {/****************** Modal para el registro fallido ******************/}
          <ModalForm show={showInvalid} success={false} title="Ooops!" message={signUpError} hide={handleCloseInvalid} />
        </BoxContainer>
      )}
    </Formik>
  );
};