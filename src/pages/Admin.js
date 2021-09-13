import React, { useState, useEffect } from "react";
import { filtrarUser, recorrerObjeto } from "../utils/Utils";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import TablaUsuariosAdmin from "../components/admin/TablaUsuariosAdmin";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import LandingPageAdmin from "../components/admin/LandingPageAdmin";

function Admin({ userData, idUser }) {
  const [isLoading, setIsLoading] = useState(false); // verificar si está cargando para mostrar el spinner
  const [aUsers, setUsers] = useState([]);
  const [aUsersIniciales, setUsersIni] = useState([]);
  //const [aNombres, setNombres] = useState([]);

  useEffect(() => {
    async function users() {
      setIsLoading(true);
      const req = await axios.get("http://localhost:4000/app/users");
      //console.log(req.data);
      // if (req.data) {
      //     console.log(req.data)
      //     //setUsers(req.data);
      // }
      let nombres = [];
      if (req.data.length > 0) {
        for (let i = 0; i < req.data.length; i++) {
          if (req.data[i].admin) {
            req.data.splice(i, 1);
            //break;
          } else {
            nombres[req.data[i]._id] = req.data[i].name;
          }
        }
        //console.log(req.data)
        //setNombres(nombres);
        setUsers(req.data);
        setUsersIni(req.data);
        setIsLoading(false);
      }
    }
    users();
  }, []);

  //const alreadyRemoved = []

  const [editShow, setEditShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  //const childRefs = useMemo(() => Array(aUsers.length).fill(0).map(i => React.createRef()), [aUsers])
  //const [setShow] = useState(false);

  const handleCloseEdit = () => setEditShow(false);
  const handleCloseView = () => setViewShow(false);
  //const handleShow = () => setShow(true);

  const [formShow, setFormShow] = useState(false);

  const handleFormShow = () => {
    formShow ? setFormShow(false) : setFormShow(true);
  };

  if (isLoading) {
    return (
      <div className="vertical-center">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 px-0">
          <SidebarAdmin admin={userData} />
        </div>
        {/* col-9 */}
        {formShow ? (
          <div className="col-9 px-2 div_contenedor_informe p-5 fondo-blanco">
            <TablaUsuariosAdmin />
          </div>
        ) : (
          <div className="col-9 px-0 fondo-blanco div_contenedor_informe p-5 text-center position-relative">
            <LandingPageAdmin admin={userData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
