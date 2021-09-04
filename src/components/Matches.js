import React, { useState, useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios";

const Matches = ({ userData }) => {
  // const [matchesUser, setMatchesUser] = useState([]);
  const [tarjetas, setTarjetas] = useState([])

  // Esto podría no ser necesario!
  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/app/matches?_id=" + userData._id);
    // console.log(response.data.matches)
    if (response.status === 200 && response.data.matches.length > 0) {
      const request = await axios.post('http://localhost:4000/app/getInfoMatches', {ids:response.data.matches})
      if(request.status === 200) {
        setTarjetas(request.data)
      }
    }
  }, [tarjetas]); // eslint-disable-line react-hooks/exhaustive-deps

  const recortarNombre = (name) => {
    return name.split(" ")[0];
  };

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
          <div className="div_personas_matches d-flex flex-wrap">
            {tarjetas.map((tarjeta, index) => (
              <div
                key={index}
                className="div_imagen_personas_matches position-relative mx-2 mt-2 mb-4 d-inline-block"
              >
                <img
                  className="imagen_personas_matches rounded-2"
                  alt=""
                  src={`/images/${tarjeta.photo}`}
                />
                <div className="d-flex justify-content-center">
                  <p className="label_nombre_matches text-tarjetas shadow fw-bold">
                    {recortarNombre(tarjeta.name)}
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
    </>
  );
};

export default Matches;
