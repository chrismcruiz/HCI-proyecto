import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { createRef } from "react";

export const SignupForm = () => {
  let confirmP;
  const limpiar = React.createRef();

  const { switchToSignin } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpGender, setSignUpGender] = useState("");
  const [signUpCareer, setSignUpCareer] = useState("");
  const [signUpBirthday, setSignUpBirthday] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPhoto, setSignUpPhoto] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      switchToSignin();
    }, 400);
  };

  const onTextboxChangeSignUpName = (e) => {
    setSignUpName(e.target.value);
  };

  const onTextboxChangeSignUpEmail = (e) => {
    setSignUpEmail(e.target.value);
  };

  const onTextboxChangeSignUpBirthday = (e) => {
    setSignUpBirthday(e.target.value);
  };

  const onTextboxChangeSignUpGender = (e) => {
    setSignUpGender(e.target.value);
  };

  const onTextboxChangeSignUpCareer = (e) => {
    setSignUpCareer(e.target.value);
  };
  const onTextboxChangeSignUpPassword = (e) => {
    setSignUpPassword(e.target.value);
  };

  const onPhotoChangeSignUpPhoto = (e) => {
    setSignUpPhoto(e.target.files[0]);
  };

  // Función para registrarse

  const onSignUp = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (revisarCampos()) {
      const formData = new FormData();

      formData.append("photo", signUpPhoto);
      formData.append("name", signUpName);
      formData.append("email", signUpEmail);
      formData.append("birthday", signUpBirthday);
      formData.append("gender", signUpGender);
      formData.append("career", signUpCareer);
      formData.append("password", signUpPassword);

      axios
        .post("http://localhost:4000/app/signup/", formData)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            setShow(true);
            setSignUpError(response.message);
            setSignUpName("");
            setSignUpEmail("");
            setSignUpBirthday("");
            setSignUpGender("");
            setSignUpCareer("");
            setSignUpPassword("");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setSignUpError(error);
          setIsLoading(false);
        });
    } else {
      console.log("MAL");
      setIsLoading(false);
    }
  };

  const revisarCampos = () => {
    let camposCorrectos = false;
    return camposCorrectos;
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
      <form
        className="needs-validation"
        method="POST"
        encType="multipart/form-data"
        onSubmit={onSignUp}
        noValidate
      >
        <div className="form-floating mb-2">
          <Input
            className="form-control"
            id="name"
            type="text"
            name="name"
            placeholder="Nombre"
            value={signUpName}
            onChange={onTextboxChangeSignUpName}
          />
          <label className="label_inputs" htmlFor="name">
            Nombre
          </label>
        </div>
        <div className="form-floating mb-2">
          <Input
            className="form-control"
            id="email"
            type="email"
            name="email"
            value={signUpEmail}
            onChange={onTextboxChangeSignUpEmail}
          />
          <label className="label_inputs" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-floating mb-3">
          <Input
            className="form-control"
            type="date"
            name="birthday"
            placeholder="Fecha de nacimiento"
            value={signUpBirthday}
            onChange={onTextboxChangeSignUpBirthday}
          />
          <label className="label_inputs">Fecha de nacimiento</label>
        </div>

        <div id="combo" className="form-floating mb-3">
          <div
            className="form-control"
            value={signUpGender}
            onChange={onTextboxChangeSignUpGender}
          >
            <div className="form-check form-check-inline">
              <Input
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
              <Input
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
              <Input
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
          <label htmlFor="combo" className="label_inputs">
            Género
          </label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="career"
            id="career"
            value={signUpCareer}
            onChange={onTextboxChangeSignUpCareer}
          >
            <option value="" defaultValue disabled>
              Escoge una opción
            </option>
            <option value="Ingeniería de Sistemas">
              Ingeniería de Sistemas
            </option>
            <option value="Ingeniería Industrial">Ingeniería Industrial</option>
            <option value="Ingeniería de Petróleos">
              Ingeniería de Petróleos
            </option>
            <option value="Ingeniería Civil">Ingeniería Civil</option>
            <option value="Ingeniería Metalúrgica">
              Ingeniería Metalúrgica
            </option>
            <option value="Ingeniería Electrónica">
              Ingeniería Electrónica
            </option>
            <option value="Iicenciatura en Idiomas">
              Licenciatura en Idiomas
            </option>
          </select>
          <label htmlFor="career">Carrera</label>
        </div>
        <div className="input-group mb-3">
          <Input
            className="label_inputs form-control"
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            id="photo"
            onChange={onPhotoChangeSignUpPhoto}
          />
          <label htmlFor="photo" className="input-group-text">
            Subir imagen
          </label>
        </div>
        <div className="form-floating mb-2">
          <Input
            className="form-control"
            id="pass"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={signUpPassword}
            onChange={onTextboxChangeSignUpPassword}
          />
          <label className="label_inputs" htmlFor="pass">
            Contraseña
          </label>
        </div>
        <div className="form-floating mb-3">
          <Input
            className="form-control"
            id="cpass"
            type="password"
            name="confirm_password"
            placeholder="Confirmar Contraseña"
            value={confirmP}
            ref={limpiar}
            // onChange={handleChangeP}
          />
          <label className="label_inputs" htmlFor="cpass">
            Confirmar contraseña
          </label>
        </div>
        <div className="">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Acepto los términos y condiciones
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <SubmitButton className="mt-3">Registrarme</SubmitButton>
      </form>
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
      {/* Modal para el registro satisfactorio */}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>¡Correcto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registro realizado satisfactoriamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </BoxContainer>
  );
};
