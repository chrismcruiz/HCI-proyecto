import React, { useState } from "react";
import {
    Input,
    SubmitButton,
} from "./accountBox/common";
import {filtrarUser, recorrerObjeto} from '../utils/Utils'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';

const EditProfile = (props) => {
    props = props.props;
   
    const user = recorrerObjeto(filtrarUser(props.users, props.idUser))
    const img = recorrerObjeto(filtrarUser(props.users, props.idUser)).photo

    const [isLoading, setIsLoading] = useState(false);
    const [editDescription, setEditDescription] = useState(user.description);
    const [editPhoto, setEditPhoto] = useState(img.toString());
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editBirthday, setEditBirthday] = useState(user.birthday);
    const [editCareer, setEditCareer] = useState(user.career);


    function onTextboxChangeUpdateNombre(e) {
        setEditName(e.target.value)
    }
    function onTextboxChangeUpdateEmail(e) {
        setEditEmail(e.target.value)
    }
    function onTextboxChangeUpdateFecha(e) {
        setEditBirthday(e.target.value)
    }
    function onTextboxChangeUpdateDescription(e) {
        setEditDescription(e.target.value)
    }
    function onTextboxChangeUpdateCarrera(e) {
        setEditCareer(e.target.value)
    }

    const onPhotoChangeUpdatePhoto = (e) => {
        setEditPhoto(e.target.files[0])
    }

    const onEdit = async (e) => {
        // e.preventDefault();
        setIsLoading(true)
        
        const formData = new FormData();

        formData.append('_id', user._id)
        formData.append('photo', editPhoto)
        formData.append('name', editName)
        formData.append('email', editEmail)
        formData.append('birthday', editBirthday)
        formData.append('description', editDescription)
        formData.append('career', editCareer)
       

        await axios.put('http://localhost:4000/app/update/', formData)
            .then(response => {
                console.log(response.data);
                setIsLoading(false)
                window.location.reload()
                
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false)
            });
    }

    if (isLoading) {
        return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
    }

    return (

        <div className='p-3'>
            <div className='fondo-blanco pantalla_match px-4'>
                <div className='div_imagen_edit_perfil'>
                    <img className='imagen_persona_perfil' alt="" src={`/images/${img}`} />
                </div>
            </div>
            <form method='POST' className='' encType='multipart/form-data'>

                <div className='input-group mb-3'>
                    <Input
                        className='label_inputs form-control'
                        type="file"
                        name='photo'
                        accept=".png, .jpg, .jpeg"
                        id='photo'
                        required
                        onChange={onPhotoChangeUpdatePhoto}
                    />
                    <label htmlFor="photo" className='label_inputs input-group-text'>Cambiar imagen</label>
                </div>


                <div className="form-floating mb-3">
                    <textarea
                        id='description'
                        className='form-control'
                        placeholder='Añade una descripción breve de tí...'
                        value={editDescription}
                        onChange={onTextboxChangeUpdateDescription}
                        style={{height: "100px"}}
                    ></textarea>
                    <label className="label_inputs" htmlFor='description'>Añade una breve descripción tuya...</label>
                </div>

                

                <div className="input-group mb-2">
                    <span class="input-group-text label_inputs">Nombre</span>
                    <Input
                    className='form-control'
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={editName}
                    onChange={onTextboxChangeUpdateNombre}
                    required
                    />
                </div>
                
                 <div className="input-group mb-3">
                    <span class="label_inputs input-group-text">Correo</span>
                    <Input
                    className='form-control'
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editEmail}
                    onChange={onTextboxChangeUpdateEmail}
                    required
                    />
                </div>
                
                <div className='form-floating mb-3'>
                    <Input
                        className='form-control label_inputs'
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        value={editBirthday}
                        onChange={onTextboxChangeUpdateFecha}
                        required
                    />
                    <label className='label_inputs'>Fecha de nacimiento</label>
                </div>

                <div className='form-floating'>
                    <select
                        required
                        className="form-select"
                        name='career'
                        id='career'
                        value={editCareer}
                        onChange={onTextboxChangeUpdateCarrera}
                    >
                        <option value='' selected disabled>Escoge una opción</option>
                        <option value='ingenieria de sistemas'>Ingeniería de Sistemas</option>
                        <option value='ingenieria industrial'>Ingeniería Industrial</option>
                        <option value='ingenieria de petroleos'>Ingeniería de Petroleos</option>
                        <option value='ingenieria civil'>Ingeniería Civil</option>
                        <option value='ingenieria metalurgica'>Ingeniería Metalúrgica</option>
                        <option value='ingenieria electronica'>Ingeniería Electrónica</option>
                        <option value='licenciatura en idiomas'>Licenciatura en Idiomas</option>
                    </select>
                    <label htmlFor="career" className='label_inputs'>Carrera</label>
                </div>
                <SubmitButton className='mt-3' type="submit" value='submit' onClick={onEdit} >Guardar</SubmitButton>
            </form>
            <div className="d-flex justify-content-center fondo-blanco pt-4">
                <p className='text-danger font-weight-bold h4 m-0 py-3 boton_salir' onClick={props.logOut} >Cerrar sesion</p>
            </div>
        </div>
    )
}

export default EditProfile
