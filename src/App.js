import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { getFromStorage } from "./utils/storage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Admin from "./pages/Admin";
import { CircularProgress } from "@material-ui/core";
import SignupForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import LandingPage  from "./components/LandingPage";

// import { filtrarUser, recorrerObjeto } from "./utils/Utils";
// import { Button, Modal } from "react-bootstrap";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokencito, setTokencito] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [user, setUser] = useState({});

  // Revisar que estas peticiones estén bien hechas
  useEffect(async () => {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) { // si hay token verifico el token en la bd y luego obtengo la info del usuario
      const { token, idUser } = obj;
      // verify token
      try{
        const response = await axios.get("http://localhost:4000/app/verify?token=" + token)
        if (response.status === 200) {
          setTokencito(token);
          setIdUsuario(idUser);
          try {
            const dataUser = await axios.post("http://localhost:4000/app/getInfo", {
              _id: idUser,
            })
            if (dataUser.status === 200) setUser(dataUser.data[0])
            setIsLoading(false)
          } catch (err) {
            console.log(err)
          }
        } else {
          console.log(response)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    } else setIsLoading(false)
  }, []);  // depender de tokencito ? ( renderiza 2 veces )

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  // Si no hay token muestro los formularios (Login - Register)
  // if (!tokencito) {
  //   return (
  //     <AppContainer>
  //       <AccountBox />
  //     </AppContainer>
  //   );
  // }

  // Si no está cargando y HAY token muestro la vista home o admin dependiendo del rol
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            {user.admin ? (
              <Redirect to="/admin" />
            ) : (
              <Home userData={user} idUser={idUsuario} />
            )}
          </Route>
          <Route path="/login">
              <LoginForm />
          </Route>
          <Route path="/signup">
              <SignupForm />
          </Route>
          <Route path="/admin">
            {!user.admin ? (
              <Redirect to="/home" />
            ) : (
              <Admin props={{ user, idUsuario }} />
            )}
          </Route>
          <Route path="/">{tokencito ? <Redirect to="/home" /> : <LandingPage />}</Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
