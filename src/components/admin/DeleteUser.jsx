import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const DeleteUser = (props) => {
  const [idActual, setIdActual] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const handleCloseDelete = () => setDeleteShow(false);

  const borrar = async () => {
    props.setIsLoading(true);
    let config = {
      headers: {
        Authorization: props.token,
      },
      data: {
        _id: idActual,
      },
    };
    await axios
      .delete("http://localhost:4000/app/admin/deleteuser", config)
      .then((response) => {
        //console.log(response.data);
        props.setDeleteShow(false);
        props.setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        props.setIsLoading(false);
        props.setDeleteShow(false);
      });
  };

  return (
    <div>
      <Modal show={deleteShow} onHide={() => setDeleteShow(false)}>
        <Modal.Header closeButton className="bg-danger">
          <Modal.Title className="texto-blanco">Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seguro quieres eliminar este registro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={borrar}>
            Si
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteUser;
