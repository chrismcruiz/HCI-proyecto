import React, { useState } from "react";
import './EditProfile.css'
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { EditFormValidation } from "../utils/FormValidation"
import { carreras } from "../utils/dataForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectField from "./SelectField"
import InputFieldVariation from "./InputFieldVariation"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const EditProfile = ({ userData, idUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onEdit = (values) => {
    setIsLoading(true);

    let formData = new FormData(); 
    formData.append('_id', idUser)

    for ( let key in values ) {
      formData.append(key, values[key]);
    }

    axios
      .put("http://localhost:4000/app/update/", formData)
      .then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.success) {
          window.location.reload()
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="fondo-blanco rounded-3">
      <div className="div_imagen_edit_perfil mb-3">
        <img className="imagen_persona_perfil" alt="" src={`/images/${userData.photo}`} />
      </div>
      <Formik
        initialValues={{
          description: userData.description,
          photo: userData.photo,
          name: userData.name,
          birthday: userData.birthday,
          career: userData.career,
        }}
        validationSchema={EditFormValidation}
        onSubmit={onEdit}
      >
        {({errors, touched, setFieldValue}) => (
          <Form className="form_edit">
            {/****************** Cambiar imagen ******************/}
            <div className="input-group mb-2">
              <input
                className="label-color form-control foto_input"
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg"
                id="photo"
                onChange={(e) => setFieldValue("photo", e.target.files[0])}
              />
              <label htmlFor="photo" className="pointer w-100 input-group-text d-flex flex-column">
                Cambiar imagen
              </label>
            </div>
            <div className="form-floating mb-2">
              <Field as='textarea'
                id="description"
                className="form-control txt-area"
                name="description"
                placeholder="Añade una descripción breve de tí..."
                style={{height: '6em'}}
              />
              <label className="label_inputs" htmlFor="description">
                Añade una breve descripción tuya...
              </label>
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text label_inputs">Nombre</span>
              <Field
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : null}`}
                type="name"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <InputFieldVariation label="Fecha de Nacimiento" name="birthday" type="date" />
            <SelectField label="Carrera" name="career" options={carreras} />

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              color="success"
              type="submit"
            >
              Guardar
            </LoadingButton>
          </Form>
        )}
      </Formik>
      {/* Cerrar sesión */}
      <div className="d-flex justify-content-center fondo-blanco mt-2">
          {/* <p
            className="text-danger font-weight-bold h4 m-0 py-0 pointer"
            onClick={logOut}
          >
            Cerrar sesión
          </p> */}
    
        </div>
    </div>
  );
};

export default EditProfile;
