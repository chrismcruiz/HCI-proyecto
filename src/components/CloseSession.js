import React, { useState } from "react";
import { getFromStorage } from "../utils/storage";
import { CircularProgress } from "@material-ui/core";

const CloseSession = ({ type }) => {
  // Función para cerrar cesión y borrar el token almacenado en LocalStorage
  const [isLoading, setIsLoading] = useState(false);

  const logOut = () => {
    setIsLoading(true);
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch("http://localhost:4000/app/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            window.localStorage.clear();
            window.location = "/";
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }
  };

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={30} />
      </div>
    );
  }

  return (
    <>
      {type === 'editProfile' ? (
        <div className="d-flex justify-content-center fondo-blanco pt-4">
          <p
            className="text-danger font-weight-bold h4 m-0 py-0 pointer"
            onClick={logOut}
          >
            Cerrar sesion
          </p>
        </div>
      ) : null}
    </>
  );
};

export default CloseSession;
