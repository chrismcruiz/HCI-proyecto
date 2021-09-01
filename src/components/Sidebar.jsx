import React, { useState } from "react";
import EditProfile from "../components/EditProfile";
import Matches from "../components/Matches";
//
import CreateIcon from "@material-ui/icons/Create";
import { filtrarUser, recorrerObjeto } from "../utils/Utils";

const Sidebar = ({ userData, token, idUser }) => {
  // const usr = recorrerObjeto(filtrarUser(props.users, props.props.props.idUser));
  const [perfilShow, setPerfilShow] = useState(true);

  const handlePerfilShow = () => {
    perfilShow ? setPerfilShow(false) : setPerfilShow(true);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="menu_arriba border-bottom">
        <div className="py-1 px-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* <ArrowBackIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ArrowBackIcon> */}
            <img
              className="imagen_perfil"
              alt=""
              src={`/images/${userData.photo}`}
            />
            <p className="ms-3 m-0 text-titulos-1 texto-negro">{userData.name}</p>
          </div>
          <div>
            <CreateIcon
              className="pointer"
              onClick={handlePerfilShow}
            ></CreateIcon>
            {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
          </div>
        </div>
      </div>
      <div className="menu-abajo fondo-blanco rounded-3 p-3 h-100">
        {perfilShow ? (
          // Ventana de Matches y Grupos
          <Matches data={userData} />
        ) : (
          // Ventana de editar perfil
          <EditProfile data={userData} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
