import React, { useState, useEffect } from "react";

import axios from "axios";

const Matches = (props) => {
  props = props.props;

  const [aMatchesUser, setMatchesUser] = useState([]);

  useEffect(() => {
    const matches = async () => {
      const req = await axios.post("http://localhost:4000/app/users/match", {
        _id: props.idUser,
      });

      if (req.data) {
        let aMatches = req.data;
        const req2 = await axios.post("http://localhost:4000/app/matches", {
          matches: aMatches,
        });
        if (req2.data) {
          setMatchesUser(req2.data);
        }
      }
    };
    matches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fondo-blanco rounded-3 p-3 height_bgw">
      {/* <div className="d-flex justify-content-between">
                <div onClick={mostrarMisMatch} className="p-2 bd-highlight pointer">Matches</div>
                <div className="p-2 bd-highlight pointer">Mis grupos</div>
            </div>  */}

      <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active links_items"
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
        <li class="nav-item" role="presentation">
          <button
            class="nav-link links_items"
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
        <li class="nav-item" role="presentation">
          <button
            class="nav-link links_items"
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
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="div_personas_matches">
            {aMatchesUser.map((match, index) => (
              <div
                key={index}
                className="div_imagen_personas_matches position-relative m-2 d-inline-block"
              >
                <img
                  className="imagen_personas_matches rounded-2"
                  alt=""
                  src={`/images/${match.photo}`}
                />
                <label className="position-absolute label_nombre_matches text-tarjetas fw-bold">
                  {match.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h6 className="mt-3">No hay grupos para mostrar</h6>
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <h6 className="mt-3">No hay grupos para mostrar</h6>
        </div>
      </div>
    </div>
  );
};

export default Matches;
