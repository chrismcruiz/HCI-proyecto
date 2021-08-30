import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import {
  BoldLink,
  BoxContainer,
  // Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { carreras } from "../../utils/carreras";
import { schemaValidation } from "../../utils/signUpValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export const SignupForm = () => {
  const { switchToSignin } = useContext(AccountContext); // Para cambiar al formulario de Login
  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página

  // Campos del formulario de registro
  // const [signUpName, setSignUpName] = useState("");
  // const [signUpEmail, setSignUpEmail] = useState("");
  // const [signUpGender, setSignUpGender] = useState("");
  // const [signUpCareer, setSignUpCareer] = useState("");
  // const [signUpBirthday, setSignUpBirthday] = useState("");
  // const [signUpPassword, setSignUpPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [signUpPhoto, setSignUpPhoto] = useState("");

  const [signUpError, setSignUpError] = useState(""); // Identificar si hubo errores en la validación del servidor al enviar el formulario

  const [showValid, setShowValid] = useState(false); // Mostrar o ocultar el modal de registro exitoso
  const [showInvalid, setShowInvalid] = useState(false); // Mostrar o ocultar el modal de registro fallido

  // Dejar de mostrar el modal y cambiar al formulario de Login
  const handleCloseValid = () => {
    setShowValid(false);
    setTimeout(() => {
      switchToSignin();
    }, 400);
  };

  const handleCloseInvalid = () => setShowInvalid(false);

  // Funciones para actualizar los "values" de los campos del formulario a medida que el usuario interactua con ellos. También se encarga de mostrar las alertas de válido o inválido y de establecer los mensajes personalizados.
  // const onTextboxChangeSignUpName = (e) => {
  //   setSignUpName(e.target.value);
  // };

  // const onTextboxChangeSignUpEmail = (e) => {
  //   setSignUpEmail(e.target.value);
  // };

  // const onTextboxChangeSignUpBirthday = (e) => {
  //   setSignUpBirthday(e.target.value);
  // };

  // const onTextboxChangeSignUpGender = (e) => {
  //   setSignUpGender(e.target.value);
  // };

  // const onTextboxChangeSignUpCareer = (e) => {
  //   setSignUpCareer(e.target.value);
  // };

  // const onTextboxChangeSignUpPassword = (e) => {
  //   setSignUpPassword(e.target.value);
  // };

  // const onPhotoChangeSignUpPhoto = (e) => {
  //   setSignUpPhoto(e.target.files[0]);
  // };

  // // Verificar que las contraseñas coincidan
  // const handleChangePass = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  // Función para registrarse

  const onSignUp = async (values) => {
    console.log(values);
    // e.preventDefault(); // prevenir el comportamiento por defecto del formulario al enviarlo (actualizar la página)

    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   setValidated(true);
    //   e.stopPropagation();
    // }

    setIsLoading(true);

    // const formData = new FormData(); // formData es una estructura de datos

    // formData.append("photo", signUpPhoto.name ? signUpPhoto : "");
    // formData.append("name", signUpName);
    // formData.append("email", signUpEmail);
    // formData.append("birthday", signUpBirthday);
    // formData.append("gender", signUpGender);
    // formData.append("career", signUpCareer);
    // formData.append("password", signUpPassword);

    await axios
      .post("http://localhost:4000/app/signup/", values)
      .then((response) => {
        console.log(response);
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
  const validate = yup.object().shape({
    name: yup.string().required("Rellena este campo"),
    email: yup.string().email("Correo inválido").required("Rellena este campo"),
    birthday: yup.date().required("Rellena este campo"),
    gender: yup.string().required("Rellena este campo"),
    career: yup.string().required("Rellena este campo"),
    photo: yup.mixed(),
    password: yup
      .string()
      .min(8, "La contraseña debe contener al menos 8 caracteres")
      .max(15, "La contraseña debe contener máximo 15 caracteres")
      .required("Rellena este campo"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Rellena este campo"),
    terms: yup
      .boolean()
      .oneOf([true], "Debes aceptar los términos y condiciones"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        birthday: "",
        gender: "",
        career: "",
        photo: "",
        password: "",
        confirmPassword: "",
        terms: false,
      }}
      validationSchema={validate}
      onSubmit={onSignUp}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <BoxContainer>
            <Form>
              {/****************** Nombre ******************/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                />
                <label className="label-color" htmlFor="name">
                  Nombre
                </label>
              </div>
              {/****************** Correo ******************/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="correo"
                />
                <label className="label-color" htmlFor="email">
                  Email
                </label>
              </div>
              {/****************** Fecha de Nacimiento ******************/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  type="date"
                  name="birthday"
                  placeholder="Fecha de nacimiento"
                />
                <label className="label-color">Fecha de nacimiento</label>
              </div>
              {/****************** Género ******************/}
              <div className="form-floating mb-2">
                <div className="form-control d-flex justify-content-evenly">
                  <div className="form-check form-check-inline">
                    <input
                      className="inputs_radius"
                      type="radio"
                      name="gender"
                      id="male"
                      value={"masculino"}
                    />
                    <label htmlFor="male" className="form-check-label">
                      Masculino
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="inputs_radius"
                      type="radio"
                      name="gender"
                      id="female"
                      value={"femenino"}
                    />
                    <label htmlFor="female" className="form-check-label">
                      Femenino
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="inputs_radius"
                      type="radio"
                      name="gender"
                      id="other"
                      value={"otro"}
                    />
                    <label htmlFor="other" className="form-check-label">
                      Otro
                    </label>
                  </div>
                </div>
                <label className="label-color">Género</label>
              </div>
              {/****************** Carrera ******************/}
              <div className="form-floating mb-2">
                <select className="form-select" name="career" id="career">
                  <option value="" defaultValue disabled>
                    Escoge una opción
                  </option>
                  {carreras.map((carrera, index) => (
                    <option key={index} value={carrera}>
                      {carrera}
                    </option>
                  ))}
                </select>
                <label className="label-color" htmlFor="career">
                  Carrera
                </label>
              </div>
              {/****************** Subir imágen ******************/}
              <div className="input-group mb-2">
                <input
                  className="label-color form-control"
                  type="file"
                  name="photo"
                  accept=".png, .jpg, .jpeg"
                  id="photo"
                />
                <label
                  htmlFor="photo"
                  className="pointer w-100 input-group-text d-flex flex-column"
                >
                  Sube una imagen
                  <br />
                  <span className="label-color optional">(Opcional)</span>
                </label>
              </div>
              {/****************** Contraseña ******************/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  id="pass"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
                <label className="label-color" htmlFor="pass">
                  Contraseña
                </label>
              </div>
              {/****************** Confirmar contraseña ******************/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                />
                <label className="label-color" htmlFor="confirmPassword">
                  Confirmar contraseña
                </label>
              </div>
              {/****************** Términos y condiciones ******************/}
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  name="terms"
                  id="terms"
                />
                <label className="form-check-label" htmlFor="terms">
                  Acepto los términos y condiciones
                </label>
              </div>
              {/****************** Botón de Registro ******************/}
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
            <Modal show={showValid} centered>
              <Modal.Header className="m-0 p-0">
                <Modal.Title className="alert alert-success w-100 text-white bg-success">
                  ¡Correcto!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>Registro realizado satisfactoriamente!</Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleCloseValid}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
            {/****************** Modal para el registro fallido ******************/}
            <Modal show={showInvalid} centered>
              <Modal.Header className="m-0 p-0">
                <Modal.Title className="alert alert-danger w-100 text-white bg-danger">
                  Ooops!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>{signUpError}</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleCloseInvalid}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </BoxContainer>
        );
      }}
    </Formik>
  );
};
