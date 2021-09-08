import React, { useState } from "react";
import EditProfile from "./EditProfile";
import Matches from "./Matches";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from "@material-ui/icons/Create";
import { Tooltip } from '@material-ui/core';
import './Sidebar.css'

const Sidebar = ({ userData, idUser }) => {
  const [perfilShow, setPerfilShow] = useState(false);

  const handlePerfilShow = () => setPerfilShow(!perfilShow)

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
            <Tooltip title="Editar perfil">
              <IconButton onClick={handlePerfilShow}>
                <CreateIcon
                ></CreateIcon>
              </IconButton>
            </Tooltip>
            {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
          </div>
        </div>
      </div>
      <div className="menu-abajo fondo-blanco rounded-3 p-3 h-100">
        {perfilShow ? (
          // Ventana de editar perfil
          <EditProfile userData={userData} idUser={idUser} />
        ) : (
          // Ventana de Matches y Grupos
          <Matches userData={userData} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
