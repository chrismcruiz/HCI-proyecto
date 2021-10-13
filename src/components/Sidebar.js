import React, { useState } from "react";
import EditProfile from "./EditProfile";
import Matches from "./Matches";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from "@material-ui/icons/Create";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import './Sidebar.css'

const Sidebar = ({ userData, idUser, idsMatches, mostrarSpinner, quitarSpinner, socket }) => {
  const [perfilShow, setPerfilShow] = useState(false);

  const handlePerfilShow = () => setPerfilShow(!perfilShow)

  return (
    <div>
      {perfilShow ? (
        <div>
          <div className="row border-bottom menu-superior">
            <div className="col-10 d-flex align-items-center p-3">
              <p className="m-0">Editar perfil</p>
            </div>
            <div className="col-2 d-flex align-items-center">
              <Tooltip title="Volver">
                <IconButton onClick={handlePerfilShow}>
                  <ArrowBackIcon className=''></ArrowBackIcon>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div class="row">
            <EditProfile className="col" userData={userData} idUser={idUser} />
          </div>
        </div>
        // Ventana de editar perfil
      ) : (
        <div>
          <div className="row border-bottom menu-superior">
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
          </div>
          <Matches className="" userData={userData} idsMatches={idsMatches} mostrarSpinner={mostrarSpinner} quitarSpinner={quitarSpinner} socket={socket} />
          {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
