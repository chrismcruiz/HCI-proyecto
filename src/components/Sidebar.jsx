import React, { useState } from "react";
import EditProfile from "../components/EditProfile";
import Matches from "../components/Matches";
//
import CreateIcon from "@material-ui/icons/Create";
import { filtrarUser, recorrerObjeto } from "../utils/Utils";

const Sidebar = (props) => {
  props = props.props;
  //console.log(props);
  const usr = recorrerObjeto(filtrarUser(props.users, props.idUser));

  const [perfilShow, setPerfilShow] = useState(true);

  const handlePerfilShow = () => {
    perfilShow ? setPerfilShow(false) : setPerfilShow(true);
  };

  return (
    <div className="ms-5 mt-4 border">
      <div className="menu_arriba w-100">
        <div className="py-1 px-4 a_hover_perfil d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* <ArrowBackIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ArrowBackIcon> */}
            <img
              className="imagen_perfil"
              alt=""
              src={`/images/${usr.photo}`}
            />
            <p className="ms-3 m-0 text-titulos-1 texto-blanco">{usr.name}</p>
          </div>
          <div>
            <CreateIcon
              className="m-2 texto-blanco"
              onClick={handlePerfilShow}
            ></CreateIcon>
            {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
          </div>
        </div>
      </div>
      {perfilShow ? (
        // Ventana de Matches y Grupos
        <Matches props={props} />
      ) : (
        // Ventana de editar perfil
        <EditProfile props={props} />
      )}
    </div>
  );
};

export default Sidebar;
