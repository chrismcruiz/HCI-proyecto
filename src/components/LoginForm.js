import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { setInStorage } from "../utils/storage";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { LoginFormValidation } from "../utils/FormValidation"
import { Modal, Alert } from "react-bootstrap";
import './Forms.css'
import Navbar2 from './Navbar2'
import { toast } from 'react-toastify';
import InputField from "./InputField";
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Tooltip } from '@material-ui/core';


const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Para controlar cuándo está cargando la página
  // const [signInError, setSignInError] = useState("");

  // Función para loguearse y crear un token en el LocalStorage

  const onSignIn = (values) => {
    setIsLoading(true);

    axios.post('http://localhost:4000/app/signin/', values)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          setInStorage("the_main_app", {
            token: response.data.token,
            idUser: response.data.id_user,
          })
          // setSignInError("");
          window.location = '/home'
          setIsLoading(false);
        } else {
          setIsLoading(false);
          notify_error(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Si está cargando muestro el spinner
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  const notify_error = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  return (
    <div>
      <header className="headerl">
      { <Navbar2 /> }
     
      </header>
      <div className="headerl2"></div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginFormValidation}
        onSubmit={onSignIn}
      >
        <section className="sign-in">
          <div class="container-forms">
            <div class="signin-content">
              <div class="signin-image">
                <figure className="figure-login-register"><img className="img-login-register" src="images/signin-image.jpg" alt="sing up image" /></figure>
                <a href="/signup" className="signup-image-link">Crear una cuenta</a>
              </div>

              <div class="signin-form">
                <h2 class="form-title h2-login-register">Ingreso</h2>
                <Form>
                  <InputField label="Correo" classes="zmdi-email" name="email" type="text" />
                  <InputField label="Contraseña" classes="zmdi-lock" name="password" type="password" />
                  <div class="form-group form-button">
                    <input type="submit" name="signin" id="signin" class="form-submit" value="Entrar" />
                  </div>
                </Form>
                <div class="social-login">
                  <span class="social-label">O inicia sesión con</span>
                  <ul class="socials">
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                    <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Formik>
      <div className="footerl2">
      </div>
      <footer class="container-fluid footerl">
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

export default LoginForm