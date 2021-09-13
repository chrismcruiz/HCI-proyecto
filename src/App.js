import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import LandingPage  from "./pages/LandingPage";
import { getFromStorage } from "./utils/storage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import SignupForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

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

  // Si no está cargando y HAY token muestro la vista home o admin dependiendo del rol
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            {!tokencito ? <Redirect to="/" /> : !user.admin ? <Home userData={user} idUser={idUsuario} /> : <Redirect to="/admin" />}
          </Route>
          <Route path="/login">
            {tokencito ? <Redirect to="/home" /> : <LoginForm />}
          </Route>
          <Route path="/signup">
            {tokencito ? <Redirect to="/home" /> : <SignupForm />}     
          </Route>
          <Route path="/admin">
            {!tokencito ? <Redirect to="/" /> : !user.admin ? <Redirect to="/home" /> : <Admin userData={user} idUser={idUsuario} />}
          </Route>
          <Route path="/">{tokencito ? <Redirect to="/home" /> : <LandingPage />}</Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
