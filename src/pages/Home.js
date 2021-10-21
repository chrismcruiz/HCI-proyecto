import React, { useState } from "react";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./Home.css";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";

// import Footer from "../components/Footer"

const Home = ({
  userData,
  idUser,
  filtros,
  borrarFiltro,
  mostrarSpinner,
  quitarSpinner,
  socket,
}) => {
  const [info, setInfo] = useState([]);

  const getInfoTarjetas = (idUsuarioActivo) => {
    const body = {
      idUser: idUsuarioActivo,
    };
    axios
      .post("http://localhost:4000/app/getInfoTarjetas", body)
      .then((response) => {
        if (response.status === 200) {
          setInfo(response.data.tarjetas.matches);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-11"></div>
        <div className="col-1">
          {/* <i class="far fa-question-circle fa-lg boton-ayuda"></i> */}
          <Tooltip title="Ayuda">
            <IconButton size="small" className="navbar__icons__chat icono">
              <i class="fas fa-question-circle fa-lg boton-ayuda"></i>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="row contenido-principal">
        <div className="bordes col-sm-6 col-md-4 margen-derecho">
          {/* Menú lateral */}
          <Sidebar
            userData={userData}
            idUser={idUser}
            idsMatches={info}
            mostrarSpinner={mostrarSpinner}
            quitarSpinner={quitarSpinner}
            socket={socket}
          />
        </div>
        <div className="bordes col-sm-5 col-md-7 text-center">
          {/* Tarjetas */}
          <Cards
            idUser={idUser}
            userData={userData}
            filtros={filtros}
            borrarFiltro={borrarFiltro}
            getInfo={getInfoTarjetas}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
