import React, { useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  // Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export const LoginForm = (props) => {
  props = props.props.props;
  const { switchToSignup } = useContext(AccountContext);

  const [signInError, setSignInError] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onTextboxChangeSignInEmail = (e) => {
    setSignInEmail(e.target.value);
  };

  const onTextboxChangeSignInPassword = (e) => {
    setSignInPassword(e.target.value);
  };

  // Función para loguearse y crear un token en el LocalStorage

  const onSignIn = (e) => {
    props.setIsLoading(true);

    fetch("http://localhost:4000/app/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          props.setInStorage("the_main_app", {
            token: json.token,
            idUser: json.id_user,
          });
          setSignInError(json.message);
          props.setIsLoading(false);
          setSignInEmail("");
          setSignInPassword("");
          props.setToken(json.token);
          props.setIdUser(json.id_user);
          props.setMatches(json.matches);
          window.location = "/home";
        } else {
          props.setSignUpError(json.message);
          props.setIsLoading(false);
        }
      });
  };

  return (
    <BoxContainer>
      {signInError ? <p>{signInError}</p> : null}
      <form
        onSubmit={onSignIn}
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <div className="form-floating mb-2">
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={signInEmail}
            onChange={onTextboxChangeSignInEmail}
          />
          <label className="label-color" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-floating mb-2">
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={signInPassword}
            onChange={onTextboxChangeSignInPassword}
          />
          <label className="label-color" htmlFor="password">
            Contraseña
          </label>
        </div>

        <SubmitButton className="mt-3">Entrar</SubmitButton>
      </form>
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
