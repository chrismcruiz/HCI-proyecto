import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Input } from "../components/accountBox/common";

const EditUser = (props) => {
  return (
    <div>
      <Modal
        show={props.editShow}
        onHide={() => props.setEditShow(false)}
        size="md"
      >
        <Modal.Header closeButton className="fondo-verde">
          <Modal.Title className="texto-blanco">Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form
            method="POST"
            encType="multipart/form-data"
            className=""
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="">
              <Input
                className="label_inputs border-0 pb-2 w-100 pl-0"
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg"
                id="photo"
              />
            </div>
            <Input
              className="mb-2"
              type="text"
              placeholder="Nombre"
              name="name"
              value={""}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={0}
              required
            />
            <div className="">
              <label
                className="label_inputs py-2 pr-2"
                style={{ fontWeight: "700" }}
              >
                Fecha de nacimiento
              </label>
              <Input
                className="label_inputs"
                type="date"
                placeholder="Fecha de nacimiento"
                required
                name="birthday"
                value={0}
              />
            </div>
            <label
              className="label_inputs py-2 ps-2"
              style={{ fontWeight: "700" }}
            >
              Género
            </label>
            <div className="d-flex ps-2" value={0}>
              <div className="d-flex align-items-center me-3">
                <Input
                  className="d-inline-block inputs_radius"
                  type="radio"
                  name="gender"
                  id="male"
                  value={"masculino"}
                  required
                />
                <label htmlFor="male" className="label_inputs">
                  Masculino
                </label>
              </div>
              <div className="d-flex align-items-center me-3">
                <Input
                  className="d-inline-block inputs_radius"
                  type="radio"
                  name="gender"
                  id="female"
                  value={"femenino"}
                  required
                />
                <label htmlFor="female" className="label_inputs">
                  Femenino
                </label>
              </div>
              <div className="d-flex align-items-center">
                <Input
                  className="d-inline-block inputs_radius"
                  type="radio"
                  name="gender"
                  id="other"
                  value={"otro"}
                  required
                />
                <label htmlFor="other" className="label_inputs">
                  Otro
                </label>
              </div>
            </div>
            <div className="pb-2">
              <label
                className="label_inputs py-2 ps-2 d-block"
                style={{ fontWeight: "700" }}
              >
                Carrera
              </label>
              <select
                required
                name="career"
                id="career"
                className="input_select p-1 w-100"
                value={0}
              >
                <option value="" selected disabled>
                  Escoge una opción
                </option>
                <option value="ingenieria de sistemas">
                  Ingeniería de Sistemas
                </option>
                <option value="ingenieria industrial">
                  Ingeniería Industrial
                </option>
                <option value="ingenieria de petroleos">
                  Ingeniería de Petroleos
                </option>
                <option value="ingenieria civil">Ingeniería Civil</option>
                <option value="ingenieria metalurgica">
                  Ingeniería Metalúrgica
                </option>
                <option value="ingenieria electronica">
                  Ingeniería Electrónica
                </option>
                <option value="licenciatura en idiomas">
                  Licenciatura en Idiomas
                </option>
              </select>
            </div>
            <Input
              className="mb-2"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={0}
              required
            />
            <Input
              type="password"
              name="confirm_password"
              placeholder="Confirmar Contraseña"
              value={0}
              required
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Guardar</Button>
          <Button variant="secondary" onClick={props.handleCloseEdit}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;
