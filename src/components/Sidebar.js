import React, { useState } from "react";
import EditProfile from "./EditProfile";
import Matches from "./Matches";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from "@material-ui/icons/Create";
import { Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import './Sidebar.css'

const Sidebar = ({ userData, idUser }) => {
  const [perfilShow, setPerfilShow] = useState(false);

  const handlePerfilShow = () => setPerfilShow(!perfilShow)

  return (
    <>
      <div className="row border-bottom">
        <div className="col-10 p-1">
          <div className="d-flex align-items-center">
            {/* <ArrowBackIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ArrowBackIcon> */}
            <Avatar 
              // alt={userData.name}
              className="avatar-profile"
              src={`/images/${userData.photo}`}
            />
            <p className="m-0">{userData.name}</p>
          </div>
        </div>
        <div className="col-2 d-flex align-items-center">
          <Tooltip title="Editar perfil">
            <IconButton onClick={handlePerfilShow}>
              <CreateIcon
              ></CreateIcon>
            </IconButton>
          </Tooltip>
        </div>


        {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
      </div>
      <div className="row">
        {perfilShow ? (
          // Ventana de editar perfil
          <EditProfile userData={userData} idUser={idUser} />
        ) : (
          // Ventana de Matches y Grupos
          <Matches userData={userData} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
