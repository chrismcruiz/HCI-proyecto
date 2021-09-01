import React from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer"

const Home = ({ userData, token, idUser }) => {
  return (
    <div className="grid-home">
      <div className="grid-row-superior border-bottom">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Trade Urself</span>
          </div>
        </nav>
      </div>
      <div className='container mt-4 mb-4 grid-row-inferior'>
        <div className='row'>
          <div className='col-4 px-0 border'>
            {/* Menú lateral */}
            <Sidebar token={token} idUser={idUser} userData={userData} />
          </div>
          <div className='col-8 px-0 border-top border-end border-bottom'>
            <div className='seccion_tarjetas d-flex justify-content-center'>
              {/* Tarjetas */}
              <Cards token={token} idUser={idUser} userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home
