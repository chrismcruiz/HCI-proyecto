import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewUser = () => {
  return (
    <div>
      <Modal show={viewShow} onHide={() => setViewShow(false)} size="lg">
        <Modal.Header closeButton className="fondo-verde">
          <Modal.Title className="texto-blanco">Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="div_imagen_perfil_admin fondo-verde">
            <img src="" alt="" className="imagen_perfil_admin"></img>
          </div>
          <p className="mt-3">Nombre: </p>
          <p className="mt-3">Email: </p>
          <p className="mt-3">Carrera: </p>
          <p className="mt-3">Fecha de nacimiento: </p>
          <p className="mt-3">Descripcion: </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewUser;
