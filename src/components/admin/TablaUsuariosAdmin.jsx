import React, { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Input } from "../../components/accountBox/common";

const TablaUsuarios = (props) => {
  const [filtroTabla, setFiltroTabla] = useState("");

  // const filtroUsuarios = (e) => {
  //   let a = e.target.value;
  //   if (a !== undefined && a !== "") {
  //     let aResultado = props.aUsers.filter(function (valor) {
  //       return (
  //         valor.name.toLowerCase().indexOf(a) > -1 ||
  //         valor.career.toLowerCase().indexOf(a) > -1 ||
  //         valor.email.indexOf(a) > -1 ||
  //         valor.Date.substr(0, 10).indexOf(a) > -1 ||
  //         valor._id.indexOf(a) > -1
  //       );
  //     });
  //     props.setUsers(props.aResultado);
  //   } else {
  //     props.setUsers(props.aUsersIniciales);
  //   }
  //   setFiltroTabla(a);
  // };
  return (
    <>
      <p className="texto-negro h2">Informe de Usuarios</p>
      <Input
        placeholder="Buscar"
        type="text"
        className="mt-2 py-2 w-50"
        value={filtroTabla}
        onChange={props.filtroUsuarios}
        name="txt_filtro"
      />
      <div className="table-responsive mt-4 shadow-sm">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Photo</th>
              <th scope="col" className="text-center">
                Id
              </th>
              <th scope="col">Nombre</th>
              <th scope="col">Carrera</th>
              <th scope="col">Email</th>
              <th scope="col">Match</th>
              <th scope="col"># Matches</th>
              <th scope="col">Fecha de creacion</th>
              <th scope="col" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {props.aUsers.map((user) => (
              <tr>
                <td>
                  <img
                    className="imagen_personas_matches_admin"
                    alt=""
                    src={`/images/${user.photo}`}
                  />
                </td>
                <td className="text-center">{user._id.substr(-5, 20)}</td>
                <td>{user.name}</td>
                <td>{user.career}</td>
                <td>{user.email}</td>
                <td>
                  {user.matches
                    .slice(1)
                    .map((val) => {
                      let match_id;
                      if (val !== "") {
                        match_id = val.substr(-5, 20);
                      }
                      return match_id;
                    })
                    .join(", ")}
                </td>
                <td>{user.matches.length - 1}</td>
                <td>{user.Date.substr(0, 10)}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <CancelIcon
                      className="m-2 iconos_crud"
                      onClick={() => props.deleteUser(user._id)}
                    ></CancelIcon>
                    <CreateIcon
                      className="m-2 iconos_crud"
                      onClick={() => props.setEditShow(true)}
                    ></CreateIcon>
                    <VisibilityIcon
                      className="m-2 iconos_crud"
                      onClick={() => props.setViewShow(true)}
                    ></VisibilityIcon>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaUsuarios;
