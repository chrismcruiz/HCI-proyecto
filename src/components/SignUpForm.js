import React, { useState } from "react";
import "./SignUpForm.css";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ModalForm from "./ModalForm";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { carreras } from "../utils/dataForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { SignUpFormValidation } from "../utils/FormValidation";
import "./Forms.css";
import { Modal } from "react-bootstrap";
import { setInStorage } from "../utils/storage";
import Questions from "./Questions";
import CityField from "./CityField";
import Navbar2 from './Navbar2';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página
  const [signUpError, setSignUpError] = useState(""); // Identificar si hubo errores en la validación del servidor al enviar el formulario
  const [showInvalid, setShowInvalid] = useState(false); // Mostrar o ocultar el modal de registro exitoso
  const [mdShow, setMdShow] = useState(false); // Mostrar o ocultar el modal de registro fallido

  // Dejar de mostrar el modal de formulario válido y cambiar al formulario de Login
  // const handleCloseValid = () => {
  //   setShowValid(false)
  //   window.location = '/login'
  // };

  const handleCloseInvalid = () => setShowInvalid(false); // Dejar de mostrar el modal de formulario inválido

  // Función para registrarse y almacenar los datos en la BD.
  const onSignUp = async (values) => {
    console.log(values);
    setIsLoading(true);

    const valuesToSignIn = {
      email: values.email,
      password: values.password,
    };

    let formData = new FormData(); // formData es una estructura de datos (acepta archivos tipo file como imágenes)

    for (let key in values) {
      if (key === "location") {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const request = await axios.post(
        "http://localhost:4000/app/signup/",
        formData
      );
      if (request.status === 200 && request.data.success) {
        try {
          const response = await axios.post(
            "http://localhost:4000/app/signin/",
            valuesToSignIn
          );
          if (response.status === 200 && response.data.success) {
            setInStorage("the_main_app", {
              token: response.data.token,
              idUser: response.data.id_user,
            });
            // setSignInError("");
            setIsLoading(false);
            setMdShow(true);
          } else {
            console.log(response);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <div>
       <header className="headers">
      { <Navbar2 /> }     
      </header>
      <div className="headers2"></div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          birthday: "",
          location: {
            department: "",
            city: "",
          },
          career: "",
          photo: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        validationSchema={SignUpFormValidation}
        onSubmit={onSignUp}
      >
        {({ errors, touched }) => (
          <div className="">
            <section className="signup">
              <div className="container-forms">
                <div class="signup-content">
                  <div class="signup-form">
                    <h2 class="form-title h2-login-register">Registro</h2>
                    <Form className="register-form">
                      <InputField
                        label="Nombre"
                        classes="zmdi-account material-icons-name"
                        name="name"
                        type="text"
                      />
                      <InputField
                        label="Correo"
                        classes="zmdi-email"
                        name="email"
                        type="text"
                      />
                      <InputField
                        label="Fecha de Nacimiento"
                        classes=""
                        name="birthday"
                        type="date"
                      />

                      <CityField name="location" />
                      {/* <RadioButtons label="Género" classes="" name="gender" type="radio" options={generos} /> */}
                      <SelectField
                        label="Especialidad o intereses"
                        classes=""
                        name="career"
                        options={carreras}
                      />
                      <div className="contenedor-pass">
                        <InputField
                          label="Contraseña"
                          classes="zmdi-lock"
                          name="password"
                          type="password"
                        />
                      </div>
                      <InputField
                        label="Confirmar contraseña"
                        classes="zmdi-lock-outline"
                        name="confirmPassword"
                        type="password"
                      />

                      {/****************** Términos y condiciones ******************/}
                      <div className="form-group">
                        <Field
                          id="terms"
                          type="checkbox"
                          name="terms"
                          className={`me-2 agree-term ${
                            errors.terms && touched.terms ? "is-invalid" : null
                          }`}
                        />
                        <label htmlFor="terms" className="label-agree-term">
                          Acepto los{" "}
                          <a href="#" class="term-service">
                            términos y condiciones
                          </a>
                        </label>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div class="form-group form-button">
                        <input
                          type="submit"
                          name="signup"
                          id="signup"
                          className="form-submit"
                          value="Registrarme"
                        />

                        {/****************** Resetear formulario ******************/}
                        <div className="d-inline-flex justify-content-center align-items-center ms-5">
                          <Tooltip title="Limpiar Formulario" placement="down">
                            <IconButton
                              type="reset"
                              className="resetForm"
                              aria-label="reset form"
                            >
                              <RefreshIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <div class="signup-image">
                    <figure className="figure-login-register">
                      <img
                        className="img-login-register"
                        src="images/signup-image.jpg"
                        alt="sing up image"
                      />
                    </figure>
                    <a href="/login" class="signup-image-link">
                      Ya estoy registrado
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/* <a href="/login" className="a_hover_form_login_registro">
            ¿Ya tienes una cuenta?
            <strong
              className="a_hover_registrarse"
            >
              Inicia sesión
            </strong>
          </a> */}
            {/****************** Modal para el registro satisfactorio ******************/}
            <Modal
              className="text-center"
              size="lg"
              centered
              show={mdShow}
              onHide={() => setMdShow(false)}
              aria-labelledby="example-modal-sizes-title-md"
            >
              <Modal.Header className="d-flex justify-content-center">
                <Modal.Title id="example-modal-sizes-title-lg">
                  <h2 className="almost-title">!Ya casi terminas!</h2>
                  <p className="tellus">Ahora cuéntanos tus intereses</p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center mx-auto pb-1">
                <Questions setMdShow={setMdShow} />
              </Modal.Body>
              <Modal.Footer>
                <a href="/home">Omitir</a>
              </Modal.Footer>
            </Modal>
            {/****************** Modal para el registro fallido ******************/}
            <ModalForm
              show={showInvalid}
              success={false}
              title="Ooops!"
              message={signUpError}
              hide={handleCloseInvalid}
            />
          </div>
        )}
      </Formik>
      <div className="footers2">
      </div>
      <footer class="container-fluid footers">
                <center>
                <div>
                
                        <img src='/assets/logol.png' height="200" width="-20" alt=""  onClick={() => window.location.reload()} /> 
                </div>
                <div class="hr">
                </div>
                    <div class="col-6">
                        
                        <div class="row justify-content-center p-2">
                            <div class="col">
                                <p>Síguenos:</p>
                            </div>
                            <div class="col">
                                <Tooltip title="Twitter">
                            
                                    <TwitterIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="Facebook">
                            
                                    <FacebookIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="YouTube">
                            
                                    <YouTubeIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="LinkedIn">
                            
                                    <LinkedInIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="Gmail">
                            
                                    <GoogleIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="GitHub">
                            
                                    <GitHubIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                            <div class="col">
                                <Tooltip title="Instagram">
                            
                                    <InstagramIcon className="icon_color" />
                        
                                </Tooltip>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <p>Contáctanos al 6363636 / o escríbenos a trade_ur_self@tu.com.co</p>
                        </div>
                     </div>
                        <div class="hr">
                        </div>
                        <div class="row justify-content-center">
                            <p>© Todos los Derechos reservados 2021</p>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-4">
                            Privacidad
                            </div>
                            <div class="col-4">
                            Terminos de servicio
                        </div>
                        <div class="row justify-content-center">
                         <br></br>   </div>
                    </div>
                    
                    <div class="col">

                    </div>
                </center>
            </footer>
    </div>
  );
};

export default SignupForm;
