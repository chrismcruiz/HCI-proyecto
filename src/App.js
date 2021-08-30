import React, { useState, useEffect } from "react";
import "./css/App.css";
import Home from "./pages/Home";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "./utils/storage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Admin from "./pages/Admin";
import { AccountBox } from "./components/accountBox";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
// import { filtrarUser, recorrerObjeto } from "./utils/Utils";
// import { Button, Modal } from "react-bootstrap";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState("");
  const [user, setUser] = useState([]);

  // Revisar que estas peticiones estén bien hechas
  useEffect(() => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token, idUser } = obj;
      // verify token
      fetch("http://localhost:4000/app/verify?token=" + token) // TODO: cambiar a axios
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            setToken(token);
            setIdUser(idUser);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    const fetchUser = async () => {
      const req = await axios.post("http://localhost:4000/app/getInfo", {
        _id: idUser,
      });
      setUser(req.data[0]);
    };

    if (token) {
      fetchUser();
    }
  }, [idUser, token]); // revisar esto

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  // Si no hay token muestro los formularios (Login - Register)
  if (!token) {
    return (
      <AppContainer>
        <AccountBox />
      </AppContainer>
    );
  }

  // Si no está cargando y HAY token muestro la vista home o admin dependiendo del rol
  return (
    <div className="d-flex">
      <Router>
        <Switch>
          <Route path="/home">
            {user.admin ? (
              <Redirect to="/admin" />
            ) : (
              <Home props={{ token, idUser }} />
            )}
          </Route>
          <Route path="/admin">
            {!user.admin ? (
              <Redirect to="/home" />
            ) : (
              <Admin props={{ token, idUser }} />
            )}
          </Route>
          <Route path="/">{token ? <Redirect to="/home" /> : ""}</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
