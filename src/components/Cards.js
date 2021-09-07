import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import IconButton from "@material-ui/core/IconButton";
// import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Cards.css"
import { calcularEdad } from "../utils/Utils";
import { CircularProgress } from "@material-ui/core";
// import Buttons from "../components/Buttons"


const Cards = ({ userData, idUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState(false);

  const filtrarUsuarios = (users) => {
    const usuarios = users.filter((user) => (user._id !== idUser && !user.admin && !userData.liked.includes(user._id)))
    return usuarios
  }

  // traer la info de todos los usuarios menos del admin y el usuario actual
  useEffect(async () => {
    const req = await axios.get("http://localhost:4000/app/users");
    if (req.status === 200) {
      setUsers(filtrarUsuarios(req.data));
    }
    setIsLoading(false);
  }, []);


  const setMatch = (idUser, idPersonLiked) => {
    const body = [
      { 
        _id:idUser, 
        liked:idPersonLiked 
      }, 
      { 
        _id:idPersonLiked,  
        liked:idUser
      }
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
    const leGustan = db.filter((user) => user._id === idPersonLiked)[0].liked
    if (leGustan.includes(idUser)) match = true;
    if (match) {
      setMatch(idUser, idPersonLiked);
      mostrarMatch();
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


  const mostrarMatch = () => {
    setTimeout(() => {
      setMatches(true);
    }, 1000);
  };

  const quitarMatch = () => {
    setTimeout(() => {
      setMatches(false);
    }, 1800);
  };


  // Mostrar tarjetas y funcionalidad de los botones

  // Crear un clón de "users"
  const db = [...users]

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

  const swiped = (direction, nameToDelete) => {
    if (direction === 'right') {
      setTimeout(() => enviarLike(idUser, nameToDelete), 1000)
    }
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (_id) => {
    console.log(_id + ' left the screen!')
    charactersState = charactersState.filter(character => character._id !== _id)
    setUsers(charactersState)
  }

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

  if (users.length === 0 && !matches) {
    return (
      <div className="no-people">
        No hay personas para mostrar...
      </div>
    );
  }

  if (matches) {
    return (
      <div>
        <div className="alert_match">¡Match!</div>
        {quitarMatch()}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <div className="main-contenido">
      <div className="card__container">
        {users.map((character, index) =>
          <TinderCard ref={childRefs[index]} preventSwipe={['up', 'down']} className='swipe' key={character._id} onSwipe={(dir) => swiped(dir, character._id)} onCardLeftScreen={() => outOfFrame(character._id)}>
            <div style={{ backgroundImage: `url(./images/${character.photo})` }} className='card'>
              <h3>{character.name} - {calcularEdad(character.birthday).toString()}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {/* Botones */}
      <div className="buttons">
        <IconButton onClick={() => swipe("left")}>
          <CloseIcon className="buttons__close" fontSize="large" />
        </IconButton>
        <IconButton onClick={() => swipe("right")}>
          <FavoriteIcon className="buttons__fav" fontSize="large" />
        </IconButton>
      </div>
      <div className="info-container">
        {lastDirection ? <h2 key={lastDirection} className='text__information'>Deslizaste hacía la {lastDirection === 'left' ? 'izquierda' : 'derecha'}</h2> : <h2 className='text__information'>¡Desliza una tarjeta o presiona un botón para continuar!</h2>}
      </div>
    </div>
  );
}

export default Cards;
