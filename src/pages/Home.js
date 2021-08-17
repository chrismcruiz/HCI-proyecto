import React, { useState, useEffect } from "react";

// import logo from '../images/207bd542-ca2a-4553-9024-2b6f2ee80011-1614290002828.jpg'
import Cards from '../components/Cards'
import {
  Input,
  SubmitButton,
} from "../components/accountBox/common";
import CreateIcon from '@material-ui/icons/Create';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"
import { filtrarUser, recorrerObjeto } from '../utils/Utils'
import axios from 'axios'


function Home(props) {
  props = props.props
  
  return (
    <div>
    <div className='contenedor_home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3 px-0 fondo-blanco vh-100' style={{ width: '19.75%' }}>
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
    <Footer props={props} />
    </div>
  );
}

export default Home
