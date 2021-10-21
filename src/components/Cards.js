import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import IconButton from "@material-ui/core/IconButton";
// import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Cards.css";
import { calcularEdad } from "../utils/Utils";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import Filtros from "./Filtros";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cards = ({ userData, idUser, filtros, borrarFiltro, getInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]); // info tarjetas
  // const [myInfo, setMyInfo] = useState([])

  // let myInfo = []

  const filtrarUsuarios = (users) => {
    let usuarios = users.filter(
      (user) =>
        user._id !== idUser && !user.admin && !userData.liked.includes(user._id)
    );
    if (filtros.length > 0) {
      usuarios = usuarios.filter((usuario) => filtros.includes(usuario.career));
    }
    return usuarios;
  };

  // traer la info de todos los usuarios menos del admin y el usuario actual
  useEffect(async () => {
    const req = await axios.get("http://localhost:4000/app/users");
    if (req.status === 200) {
      setUsers(filtrarUsuarios(req.data));
    }
    setIsLoading(false);
  }, [filtros]);

  const setMatch = (idUser, idPersonLiked) => {
    const body = [
      {
        _id: idUser,
        liked: idPersonLiked,
      },
      {
        _id: idPersonLiked,
        liked: idUser,
      },
    ];
    axios
      .post("http://localhost:4000/app/setmatch", body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const revisarLikeMutuo = (idUser, idPersonLiked) => {
    let match = false;
    const leGustan = db.filter((user) => user._id === idPersonLiked)[0].liked;
    if (leGustan.includes(idUser)) match = true;
    if (match) {
      setMatch(idUser, idPersonLiked);
      getInfo(idUser);
      notify();
    }
  };

  const enviarLike = (idUser, idPersonLiked) => {
    const body = { idUser, idPersonLiked };
    axios
      .post("http://localhost:4000/app/liked", body)
      .then((response) => {
        if (response.status === 200) {
          revisarLikeMutuo(idUser, idPersonLiked);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Mostrar tarjetas y funcionalidad de los botones

  // Crear un clón de "users"
  const db = [...users];

  const alreadyRemoved = [];
  let charactersState = db;

  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [users]
  );

  // Clickar tarjeta

  const clickTarjeta = () => {
    const cardsLeft = users.filter(
      (person) => !alreadyRemoved.includes(person._id)
    );
    if (cardsLeft.length) {
      const currentCard = cardsLeft[cardsLeft.length - 1]._id;
      const index = db.map((person) => person._id).indexOf(currentCard);
      childRefs[index].current.onClick = () =>
        console.log(`Clickaste la tarjeta número ${index}`);
    }
  };

  // Match
  const swiped = (direction, nameToDelete) => {
    if (direction === "right") {
      setTimeout(() => enviarLike(idUser, nameToDelete), 500);
    }
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (_id) => {
    console.log(_id + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character._id !== _id
    );
    setUsers(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = users.filter(
      (person) => !alreadyRemoved.includes(person._id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id; // Find the card object to be removed
      const index = db.map((person) => person._id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const notify = () => {
    toast.info("¡Nuevo Contacto!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (users.length === 0) {
    return (
      <div>
        {/* Filtros */}
        <div className="filtros">
          {filtros.map((filtro) => (
            <Filtros
              idUser={idUser}
              key={filtro}
              name={filtro}
              borrarFiltro={borrarFiltro}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center no-people">
          No hay personas para mostrar...
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CircularProgress color="primary" size={50} />
      </div>
    );
  }

  return (
    <>
      {/* Filtros */}
      <div className="filtros">
        {filtros.length > 0 ? (
          filtros.map((filtro) => (
            <Filtros
              idUser={idUser}
              key={filtro}
              name={filtro}
              borrarFiltro={borrarFiltro}
            />
          ))
        ) : (
          <div className="no-filtros">
            <div className="varita">
              <i class="fas fa-magic fa-2x"></i>
              <p>Puedes personalizar tu búsqueda añadidendo filtros</p>
            </div>
          </div>
        )}
      </div>

      {/* Card */}
      <div className="card__container d-flex justify-content-center mx-auto">
        {users.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            preventSwipe={["up", "down"]}
            className="swipe"
            key={character._id}
            onSwipe={(dir) => swiped(dir, character._id)}
            onCardLeftScreen={() => outOfFrame(character._id)}
            onClick={clickTarjeta}
          >
            {/* <div style={{ backgroundImage: `url(./images/${character.photo})` }} className='card'>
              <h3>{character.name.split(" ").slice(0, 2).join(' ')}</h3>
            </div> */}
            <div class="card green d-flex justify-content-center">
              <div class="additional">
                <div class="user-card mt-4">
                  {/* <div class="level center">
                    Level 13
                  </div> */}
                  {/* <div class="points center">
                    5,312 Points
                  </div> */}
                  <img
                    className="pic"
                    alt=""
                    width="170"
                    heigth="170"
                    src={`/images/${character.photo}`}
                  />
                  <div className="puntuation mt-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <div className="user-details mt-3">
                    <p>{calcularEdad(character.birthday)}</p>
                    <p>{character.career}</p>
                    <p>
                      {`${character.location.department}, ${character.location.city}`}
                    </p>
                  </div>
                </div>
                <div class="more-info">
                  <h1 className="mt-2">{character.name}</h1>
                  {/* <div class="coords">
                    <span>Group Name</span>
                    <span>Joined January 2019</span>
                  </div>
                  <div class="coords">
                    <span>Position/Role</span>
                    <span>City, Country</span>
                  </div> */}
                  <div class="stats">
                    <div>
                      <div class="title">Premios</div>
                      <i class="fa fa-trophy"></i>
                      <div class="value">2</div>
                    </div>
                    <div>
                      <div class="title">Contactos</div>
                      <i class="fa fa-gamepad"></i>
                      <div class="value">2</div>
                    </div>
                    <div>
                      <div class="title">Amigos</div>
                      <i class="fa fa-group"></i>
                      <div class="value">12</div>
                    </div>
                    {/* <div>
                      <div class="title">Coffee</div>
                      <i class="fa fa-coffee"></i>
                      <div class="value infinity">∞</div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="general">
                <h1 className="mt-2">{character.name}</h1>
                {/* <p>{character.description}</p> */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse s urna. Morbi eu quam ante. Ut fermentum mauris
                  vel mauris commodo consectetur. Donec a euismod tortor.
                  Integer non mi urna. Morbi varius nulla eget mi imperdiet
                  mollis.
                </p>
                {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
                <div className="icons">
                  <i class="fa-brands fa-github"></i>
                  <i class="fa-brands fa-accessible-icon"></i>
                </div>
                {/* <span class="more">Mouse over the card for more info</span> */}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* Botones */}
      <div className="buttons d-flex justify-content-center">
        <IconButton onClick={() => swipe("left")}>
          <CloseIcon className="buttons__close" fontSize="large" />
        </IconButton>
        <IconButton onClick={() => swipe("right")}>
          <FavoriteIcon className="buttons__fav" fontSize="large" />
        </IconButton>
      </div>
      {/* {matches && (<div className="alert_match">¡Match!</div>)} */}
      <div className="info-container">
        {lastDirection ? (
          <h2 key={lastDirection} className="text__information">
            Deslizaste hacía la{" "}
            {lastDirection === "left" ? "izquierda" : "derecha"}
          </h2>
        ) : (
          <h2 className="text__information">
            ¡Desliza una tarjeta o presiona un botón para comenzar!
          </h2>
        )}
      </div>
    </>
  );
};

export default Cards;
