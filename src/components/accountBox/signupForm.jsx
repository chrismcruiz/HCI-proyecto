import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { Button, Modal } from 'react-bootstrap';

export function SignupForm(props) {
  props = props.props.props;
  //console.log(props.onSignUp)
  const { switchToSignin } = useContext(AccountContext);

  let confirmP;
  const limpiar = React.createRef();

  // const handleChangeP = (e) => {
  //   confirmP = e.target.value

  // }
  // const handlePass = (e) => {
  //   let pass = props.signUpPassword
  //   if (pass !== confirmP) {
  //     e.preventDefault()
  //     handleShow()
  //     limpiar.current.value = ''
  //   }
  // }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    switchToSignin()
  }
  return (
    <BoxContainer>
      {
        (props.signUpError) ? (
          <p>{props.signUpError}</p>
        ) : (null)
      }
      {/* <Button className='d-none' variant="primary" onClick={handleShow}>
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title className='alert alert-danger w-100 text-white bg-danger m-0' role='alert'>¡Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contraseñas no coinciden, por favor escribirlas correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Button className='d-none' variant="success">
      </Button> */}
      <Modal show={show} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className='m-0 p-0'>
          <Modal.Title className='alert alert-success w-100 text-white bg-success' role='alert'>¡Correcto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registro realizado satisfactoriamente</Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="text-white bg-success" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <form method='POST' encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="form-floating mb-2">
          <Input
            className='form-control'
            id="name"
            type="text"
            name="name"
            placeholder="Nombre"
            value={props.signUpName}
            onChange={props.onTextboxChangeSignUpName}
          />
          <label className="label_inputs" htmlFor="name">Nombre</label>
        </div>
        <div className="form-floating mb-2">
          <Input
            className="form-control"
            id="email"
            type="email"
            name="email"
            value={props.signUpEmail}
            onChange={props.onTextboxChangeSignUpEmail}
          />
          <label className="label_inputs" htmlFor="email">Email</label>
        </div>
        
        <div className='form-floating mb-3'>
          <Input
            className='form-control'
            type="date"
            name="birthday"
            placeholder="Fecha de nacimiento"
            value={props.signUpBirthday}
            onChange={props.onTextboxChangeSignUpBirthday}
            
          />
          <label className='label_inputs'>Fecha de nacimiento</label>
        </div>

        <div id="combo" className="form-floating mb-3">
          <div
            className="form-control"
            value={props.signUpGender}
            onChange={props.onTextboxChangeSignUpGender}>
            <div className='form-check form-check-inline'>
              <Input
                className='inputs_radius'
                type="radio"
                name='gender'
                id='male'
                value={'masculino'}
                />
              <label htmlFor="male" className='form-check-label'>Masculino</label>
            </div>
            <div className='form-check form-check-inline'>
              <Input
                className='inputs_radius'
                type="radio"
                name='gender'
                id='female'
                value={'femenino'}
                />
              <label htmlFor="female" className='form-check-label'>Femenino</label>
            </div>
            <div className='form-check form-check-inline'>
              <Input
                className='inputs_radius'
                type="radio"
                name='gender'
                id='other'
                value={'otro'}
                />
              <label htmlFor="other" className='form-check-label'>Otro</label>
            </div>
          </div>
          <label htmlFor="combo" className='label_inputs'>Género</label>
        </div>
        

        <div className='form-floating mb-3'>
          <select
            className='form-select'
            name='career'
            id='career'
            value={props.signUpCareer}
            onChange={props.onTextboxChangeSignUpCareer}
          >
            <option value='' defaultValue disabled>Escoge una opción</option>
            <option value='Ingeniería de Sistemas'>Ingeniería de Sistemas</option>
            <option value='Ingeniería Industrial'>Ingeniería Industrial</option>
            <option value='Ingeniería de Petróleos'>Ingeniería de Petróleos</option>
            <option value='Ingeniería Civil'>Ingeniería Civil</option>
            <option value='Ingeniería Metalúrgica'>Ingeniería Metalúrgica</option>
            <option value='Ingeniería Electrónica'>Ingeniería Electrónica</option>
            <option value='Iicenciatura en Idiomas'>Licenciatura en Idiomas</option>
          </select>
          <label htmlFor='career' >Carrera</label>
        </div>
        <div className='input-group mb-2 mt-2'>
          <Input
            className='label_inputs form-control'
            type="file"
            name='photo'
            accept=".png, .jpg, .jpeg"
            id='photo'
            onChange={props.onPhotoChangeSignUpPhoto}
            
          />
          <label htmlFor="photo" className='input-group-text'>Subir imagen</label>
        </div>
        <div className="form-floating mb-2">
          <Input
            className='form-control'
            id="pass"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={props.signUpPassword}
            onChange={props.onTextboxChangeSignUpPassword}
          />
          <label className="label_inputs" htmlFor="pass">Contraseña</label>
        </div>
         <div className="form-floating">
          <Input
            className='form-control'
            id="cpass"
            type="password"
            name="confirm_password"
            placeholder="Confirmar Contraseña"
            value={confirmP}
            ref={limpiar}
            // onChange={handleChangeP}
          />
          <label className="label_inputs" htmlFor="cpass">Confirmar contraseña</label>
        </div>
        
        <SubmitButton className='mt-3' onClick={props.onSignUp}>Registrarme</SubmitButton>
      </form>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#" className='a_hover_form_login_registro'>
        ¿Ya tienes una cuenta?
          <BoldLink className='a_hover_registrarse' href="#" onClick={switchToSignin}>
          Inicia sesión
          </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
