import React from "react";
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import './Home.css'
// import Footer from "../components/Footer"

const Home = ({ userData, idUser }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra superior */}
        <div className="col">
          <Navbar />
        </div>
      </div>

      <div className='row contenido-principal'>
        <div className='bordes col-md-4 col-izquierda'>
          {/* Menú lateral */}
          <Sidebar userData={userData} idUser={idUser} />
        </div>
        <div className='bordes col-md-7'>
          <div className='d-flex flex-column align-items-center text-center'>
            {/* Tarjetas */}
            <Cards idUser={idUser} userData={userData} />
          </div>
        </div>
      </div>

    </div>

  );
}

export default Home
