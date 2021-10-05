import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios";
import './Matches.css'
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Tooltip } from '@material-ui/core';
import ModalForm from "./ModalForm"
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"


const Matches = ({ userData, idsMatches }) => {
  // const [matchesUser, setMatchesUser] = useState([]);
  const [showInvalid, setShowInvalid] = useState(false);
  const [tarjetas, setTarjetas] = useState([])
  const [idMatch, setIdMatch] = useState('')
  const [lgShow, setLgShow] = useState(false);
  // const [conversationId, setConversationId] = useState(null)
  const [infoRoom, setInfoRoom] = useState('')
  const [dataMatch, setDataMatch] = useState({});

  // Esto podría no ser necesario!
  useEffect(async () => {
    const response = await axios.post("http://localhost:4000/app/getInfo", {
      _id: userData._id,
    })
    // console.log(response.data.matches)
    if (response.status === 200) {
      const request = await axios.post('http://localhost:4000/app/getInfoMatches', { ids: response.data[0].matches })
      if (request.status === 200) {
        setTarjetas(request.data)
      }
    }
  }, [idsMatches]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(tarjetas.length)

  const handleShowInvalid = (id) => {
    setIdMatch(id)
    setShowInvalid(true)
  };
  const handleCloseInvalid = () => setShowInvalid(false);

  const mostrarPerfil = (data) => {
    setLgShow(true)
    setDataMatch(data)
  }

  const iniciarConversacion = (name, photo) => {
    console.log('test')
  }


  const deleteUser = () => {
    axios.post("http://localhost:4000/app/deleteMatch", [idMatch, userData._id])
      .then(response => {
        if (response.status === 200) {
          axios
            .post("http://localhost:4000/app/getInfoMatches", { ids: response.data.tarjetas })
            .then((response) => {
              if (response.status === 200) {
                setTarjetas(response.data)
                notify_borrado('¡Contacto borrado satisfactoriamente!')
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error)
        notify_borrado(error)
      }
      )
    handleCloseInvalid()
  }

  const notify_borrado = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div class="m-0">
        <ul
          className="row nav nav-tabs"
          id="myTab"
          role="tablist"
        >
          <li className="col-6 p-0 nav-item" role="presentation">
            <button
              className="seccion nav-link active links_items"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Contactos
            </button>
          </li>
          <li className="col-6 p-0 nav-item" role="presentation">
            <button
              className="seccion nav-link links_items"
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
        </ul>
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >

          <div className="row p-3">
            {!tarjetas.length ? (<p className="me-auto">Todavía no tienes ningún contacto.</p>)
              :
              tarjetas.map((tarjeta, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center justify-content-center div_imagen_personas_matches mt-2 mb-3 col-4"
                >
                  <div className="dropdown">
                    <button type="button" className="tarjeta-border" data-bs-toggle="dropdown" aria-expanded="false">
                      <img
                        className="imagen_personas_matches rounded-2"
                        alt=""
                        src={`/images/${tarjeta.photo}`}
                        width="110"
                        height="110"
                      />
                    </button>
                    <ul className="dropdown-menu options-menu">
                      <Tooltip title="Iniciar una conversación">
                        <Link
                          to={{ pathname: `/chats/t/${tarjeta._id}` }}
                        >
                          <ChatIcon color="primary" />
                        </Link>
                      </ Tooltip>
                      <Tooltip title="Ver perfil">
                        <VisibilityIcon className="text-succes" onClick={() => mostrarPerfil(tarjeta)} />
                      </ Tooltip>
                      <Tooltip title="Eliminar contacto">
                        <DeleteOutlineIcon color="error" onClick={() => handleShowInvalid(tarjeta._id)} />
                      </ Tooltip>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="label_nombre_matches text-tarjetas">
                      {tarjeta.name.split(" ")[0]}
                    </p>
                  </div>
                </div>

              ))
            }

          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {/* <h6 className="mt-3">
            No hay grupos para mostrar
            </h6> */}
          <div class="list-group row">
            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
              <div class="d-flex gap-2 w-100 justify-content-between align-items-center">
                <h6 class="mb-0">Diseño prototipo app</h6>
                <small class="opacity-50 text-nowrap">12 integrantes</small>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
              <div class="d-flex gap-2 w-100 justify-content-between align-items-center">
                <h6 class="mb-0">Tedijos PK</h6>
                <small class="opacity-50 text-nowrap">3 integrantes</small>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
              <div class="d-flex gap-2 w-100 justify-content-between align-items-center">
                <h6 class="mb-0">Grupo trabajo IA</h6>
                <small class="opacity-50 text-nowrap">5 integrantes</small>
              </div>
            </a>
          </div>
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
          <img className="match_img" src={`/images/${dataMatch.photo}`} width='200' height='200' />
          <p className="match_description">"{!dataMatch.description ? 'Sin descripción' : dataMatch.description}"</p>
          <h4>Especialidades</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at enim nec libero auctor placerat nec sed sapien. Aenean id fermentum lectus. Aenean id quam vehicula lectus euismod placerat vel et urna. Duis eget tincidunt ex, eget pulvinar ligula. Aenean eros sem, porta vel ligula sit amet, iaculis tempor ligula. Etiam ex risus, efficitur eu sagittis vel, faucibus vel magna. Curabitur commodo mattis dui. Morbi vel tellus felis. Nulla libero arcu, euismod eu vestibulum non, sollicitudin eget quam. </p>
          <p>
            Suspendisse dictum eget augue eu aliquam. Nullam pharetra, lectus eu imperdiet condimentum, sem tortor vehicula purus, et varius nulla justo et dui. Proin vitae pulvinar lacus. Curabitur faucibus suscipit ullamcorper. Sed ullamcorper scelerisque convallis. Phasellus laoreet diam velit, ut pretium turpis rhoncus faucibus. In quis facilisis orci. Nam et quam eget nisl hendrerit cursus vel convallis ligula.</p>
        </Modal.Body>
      </Modal>
      <ModalForm show={showInvalid} success={false} title="Advertencia" message={'¿Estás seguro que quieres eliminar este contacto?'} hide={handleCloseInvalid} btn_close={true} type="delete" delete={deleteUser} />
    </>
  );
};

export default Matches;
