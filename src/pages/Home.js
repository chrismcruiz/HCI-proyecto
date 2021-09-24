import React from "react";
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import './Home.css'
// import Footer from "../components/Footer"

const Home = ({ userData, idUser }) => {
  console.log(userData)
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra superior */}
        <div className="col">
          <Navbar />
        </div>
      </div>

      <div className='row contenido-principal'>
        <div className='bordes col-sm-6 col-md-5 col-izquierda'>
          {/* Menú lateral */}
          <Sidebar userData={userData} idUser={idUser} />
        </div>
        <div className='bordes col-sm-5 col-md-6'>
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
