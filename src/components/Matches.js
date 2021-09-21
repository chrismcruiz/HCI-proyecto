import React, { useState, useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios";
import './Matches.css'
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Tooltip } from '@material-ui/core';
import ModalForm from "./ModalForm"
import { Modal } from "react-bootstrap";

const Matches = ({ userData }) => {
  // const [matchesUser, setMatchesUser] = useState([]);
  const [showInvalid, setShowInvalid] = useState(false);
  const [tarjetas, setTarjetas] = useState([])
  const [idMatch, setIdMatch] = useState('')
  const [lgShow, setLgShow] = useState(false);
  const [dataMatch, setDataMatch] = useState({});

  // Esto podría no ser necesario!
  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/app/matches?_id=" + userData._id);
    // console.log(response.data.matches)
    if (response.status === 200 && response.data.matches.length > 0) {
      const request = await axios.post('http://localhost:4000/app/getInfoMatches', { ids: response.data.matches })
      if (request.status === 200) {
        setTarjetas(request.data)
      }
    }
  }, [tarjetas]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleShowInvalid = (id) => {
    setIdMatch(id)
    setShowInvalid(true)
  };
  const handleCloseInvalid = () => setShowInvalid(false);

  const mostrarPerfil = (data) => {
    setLgShow(true)
    setDataMatch(data)
  }

  const deleteUser = () => {
    axios.post("http://localhost:4000/app/deleteMatch", [idMatch, userData._id])
    .then(response => console.log(response))
    .catch(error => console.log(error))
    handleCloseInvalid()
  }

  return (
    <>
      <ul
        className="nav nav-tabs mb-3 d-flex justify-content-between"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active links_items"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Matches
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link links_items"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Grupos
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link links_items"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Mis Grupos
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="d-flex flex-wrap justify-content-evenly">
            {tarjetas.map((tarjeta, index) => (
              <div
                key={index}
                className="div_imagen_personas_matches position-relative p-0 mx-0 mt-2 mb-4"
              >
                <div className="dropdown">
                  <button type="button" className="tarjeta-border" data-bs-toggle="dropdown" aria-expanded="false">
                    <img
                      className="imagen_personas_matches rounded-2"
                      alt=""
                      src={`/images/${tarjeta.photo}`}
                      width="120"
                      height="120"
                    />
                  </button>
                  <ul className="dropdown-menu options-menu">
                    <Tooltip title="Iniciar una conversación">
                      <ChatIcon />
                    </ Tooltip>
                    <Tooltip title="Ver perfil">
                      <VisibilityIcon onClick={() => mostrarPerfil(tarjeta)} />
                    </ Tooltip>
                    <Tooltip title="Eliminar match">
                      <DeleteOutlineIcon onClick={() => handleShowInvalid(tarjeta._id)} />
                    </ Tooltip>
                  </ul>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="label_nombre_matches text-tarjetas">
                    {tarjeta.name.split(" ")[0]}
                  </p>
                </div>
              </div>

            ))}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h6 className="mt-3">No hay grupos para mostrar</h6>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <h6 className="mt-3">No hay grupos para mostrar</h6>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Perfil de {dataMatch.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <img className="match_img" src={`/images/${dataMatch.photo}`} width='300' height='300' />
           <p className="match_description">"{!dataMatch.description ? 'Sin descripción':dataMatch.description}"</p>
           <h4>Especialidades</h4>
        </Modal.Body>
      </Modal> 
      <ModalForm show={showInvalid} success={false} title="Advertencia" message={'¿Estás seguro que quieres eliminar este contacto?'} hide={handleCloseInvalid} btn_close={true} type="delete" delete={deleteUser} />
    </>
  );
};

export default Matches;
