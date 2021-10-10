import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Chats from './components/Chats'
import ChatScreen from './components/ChatScreen'
import io from "socket.io-client";


const socket = io.connect("http://localhost:3001");

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokencito, setTokencito] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [filtros, setFiltros] = useState([])

  // Revisar que estas peticiones estén bien hechas
  useEffect(async () => {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) { // si hay token verifico el token en la bd y luego obtengo la info del usuario
      const { token, idUser } = obj;
      // verify token
      try {
        const response = await axios.get("http://localhost:4000/app/verify?token=" + token)
        if (response.status === 200) {
          setTokencito(token);
          setIdUsuario(idUser);
          try {
            const dataUsers = await axios.get("http://localhost:4000/app/users")
            if (dataUsers.status === 200) {
              setUsers(dataUsers.data)
              setUser(dataUsers.data.filter((user) => user._id === idUser)[0])
              setFiltros(dataUsers.data.filter((user) => user._id === idUser)[0].filters)
            }
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CircularProgress color="primary" size={50} />
      </div>
    );
  }


  // Si no está cargando y HAY token muestro la vista home o admin dependiendo del rol
  const añadirFiltro = (filtro) => {
    if (filtro && !filtros.includes(filtro)) {
      const body = { idUsuario, filtro };
      axios
        .post("http://localhost:4000/app/addFilter", body)
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data.filtros)
            setFiltros(response.data.filtros)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  const borrarFiltro = (filtro) => {
    axios.post("http://localhost:4000/app/deleteFilter", [filtro, idUsuario])
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.filtros)
          setFiltros(response.data.filtros)
        }
      })
      .catch(error => console.log(error))
  }

  const mostrarSpinner = () => setIsLoading(true)
  const quitarSpinner = () => setIsLoading(false)

  return (
    <>
      <ToastContainer
        newestOnTop
      />
      <Router>
        <Switch>
          <Route path="/home">
            {!tokencito ?
              <Redirect to="/" />
              :
              !user.admin ?
                <>
                  <Header userData={user} filtrar={añadirFiltro} type="filter" />
                  <Home userData={user} idUser={idUsuario} filtros={filtros} borrarFiltro={borrarFiltro} mostrarSpinner={mostrarSpinner} quitarSpinner={quitarSpinner} socket={socket} />
                </>
                :
                <Redirect to="/admin" />}
            {/* <Home userData={user} idUser={idUsuario} /> */}
          </Route>
          <Route path="/login">
            {tokencito ? <Redirect to="/home" /> : <LoginForm />}
          </Route>
          <Route path="/signup">
            {tokencito ? <Redirect to="/home" /> : <SignupForm />}
          </Route>
           <Route path="/chats">
            <Header type='search' />
            <Chats userData={user} socket={socket} usersData={users} />
          </Route>
          <Route path="/chats/t/:id">
            <Header type='search' />
            <Chats userData={user} socket={socket} usersData={users} />
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
