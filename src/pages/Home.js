import React from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"

function Home(props) {
  props = props.props
  
  return (
    <div>
    <div className='contenedor_home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3 px-0 vh-100'>
            {/* Menú lateral */}
            <Sidebar props={props} />
          </div>
          <div className='col-9 px-0 seccion_tarjetas d-flex justify-content-center'>
            {/* Tarjetas */}
            <Cards props={props} />
          </div>
        </div>
      </div>
      {/* Parte del CopyRight */}
    </div>
    {/* <Footer props={props} /> */}
    </div>
  );
}

export default Home
