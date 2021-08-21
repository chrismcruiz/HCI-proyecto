import React from "react";
import Cards from '../components/Cards'
import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer"

function Home(props) {
  props = props.props
  
  return (
    <div className='container mt-4 mb-4'>
      <div className='row'>
        <div className='col-4 px-0 border'>
          {/* Menú lateral */}
          <Sidebar props={props} />
        </div>
        <div className='col-8 px-0 border-top border-end border-bottom'>
          <div className='seccion_tarjetas d-flex justify-content-center'>
            {/* Tarjetas */}
            <Cards props={props} />
          </div>
        </div>
      </div>
        {/* Parte del CopyRight */}
        {/* <Footer props={props} /> */}
    </div>
  );
}

export default Home
