import React from "react";

const LandingPage = ({ admin }) => {
  return (
    <div className="div_contenedor_logo_nombre_admin position-relative">
      <img className="admin_perfil" alt="" src={`/images/${admin.photo}`} />
      <h2 className="mt-5">Administrador TRADE URSELF</h2>
    </div>
  );
};

export default LandingPage;
