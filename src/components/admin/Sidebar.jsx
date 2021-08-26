import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Sidebar = (props) => {
  return (
    <>
      <div className="menu_arriba">
        <div className="py-3 px-4 d-flex align-items-center">
          <img className="imagen_perfil" alt="" src={`/images/${props.img}`} />
          <p className="ml-3 text-titulos-1 texto-negro">Administrador</p>
        </div>
      </div>
      <div className="fondo-gris pantalla_match p-3">
        <ul className="p-0">
          <li
            className="d-flex align-items-center texto_admin mb-3 texto-negro"
            onClick={props.handleFormShow}
          >
            <PersonIcon className="mr-2"></PersonIcon>Usuarios
          </li>
          <a href="#" className="texto-negro">
            <li
              onClick={props.logOut}
              className="d-flex align-items-center texto_admin mb-3"
            >
              <ExitToAppIcon className="mr-2"></ExitToAppIcon>Salir
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
