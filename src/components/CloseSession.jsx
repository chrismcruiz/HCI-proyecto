import React from "react";
import { getFromStorage, setInStorage } from "../utils/storage";

const CloseSession = (props) => {
  // Función para cerrar cesión y borrar el token almacenado en LocalStorage

  //   const [isLoading, setIsLoading] = useState(true);
  //   const [token, setToken] = useState("");
  //   const [idUser, setIdUser] = useState("");

  const logOut = () => {
    props.setIsLoading(true);
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch("http://localhost:4000/app/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            window.localStorage.clear();
            props.setToken("");
            props.setIdUser("");
            window.location = "/";
            props.setIsLoading(false);
          } else {
            props.setIsLoading(false);
          }
        });
    } else {
      props.setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center fondo-blanco pt-4">
      <p
        className="text-danger font-weight-bold h4 m-0 py-0 pointer"
        onClick={logOut}
      >
        Cerrar sesion
      </p>
    </div>
  );
};

export default CloseSession;
