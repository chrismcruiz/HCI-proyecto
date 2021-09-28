import React from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import './Home.css'
// import Footer from "../components/Footer"

const Home = ({ userData, idUser }) => {
  return (
    <div className="container-fluid">
      <div className='row contenido-principal'>
        <div className='bordes col-sm-6 col-md-4 col-izquierda'>
          {/* Menú lateral */}
          <Sidebar userData={userData} idUser={idUser} />
        </div>
        <div className='bordes col-sm-5 col-md-7 text-center container-fluid'>
          {/* Tarjetas */}
          <Cards idUser={idUser} userData={userData} />
        </div>
      </div>

    </div>

  );
}

export default Home
