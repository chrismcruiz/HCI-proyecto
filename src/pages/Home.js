import React, { useState } from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import axios from "axios";
import './Home.css'
// import Footer from "../components/Footer"

const Home = ({ userData, idUser, filtros, borrarFiltro, mostrarSpinner, quitarSpinner, socket }) => {
  const [info, setInfo] = useState([]) 

  const getInfoTarjetas = (idUsuarioActivo) => {
    const body =
    {
      idUser: idUsuarioActivo,
    }
    axios
      .post("http://localhost:4000/app/getInfoTarjetas", body)
      .then((response) => {
        if (response.status === 200) {
          setInfo(response.data.tarjetas.matches)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container-fluid">
      <div className='row contenido-principal'>
        <div className='bordes col-sm-6 col-md-4 col-izquierda'>
          {/* Menú lateral */}
          <Sidebar userData={userData} idUser={idUser} idsMatches={info} mostrarSpinner={mostrarSpinner} quitarSpinner={quitarSpinner} socket={socket} />
        </div>
        <div className='bordes col-sm-5 col-md-7 text-center'>
          {/* Tarjetas */}
          <Cards idUser={idUser} userData={userData} filtros={filtros} borrarFiltro={borrarFiltro} getInfo={getInfoTarjetas} />
        </div>
      </div>

    </div>

  );
}

export default Home
