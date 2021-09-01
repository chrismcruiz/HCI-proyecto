import React from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer"

const Home = ({ userData, token, idUser }) => {
  return (
    <div className='container mt-4 mb-4'>
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
  );
}

export default Home
