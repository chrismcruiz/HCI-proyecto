import React from "react";
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import './Home.css'
// import Footer from "../components/Footer"

const Home = ({ userData, idUser }) => {
  return (
    <div className="grid-home">
      <div className="grid-row-superior">
        {/* Barra superior */}
        <Navbar />
      </div>
      <div className='container grid-row-inferior'>
        <div className='row'>
          <div className='px-0 bordes me-5 ancho_chr-3_5'>
            {/* Menú lateral */}
            <Sidebar userData={userData} idUser={idUser} />
          </div>
          <div className='px-0 bordes ancho_chr-7_5'>
            <div className='seccion_tarjetas'>
              {/* Tarjetas */}
              <Cards idUser={idUser} userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home
