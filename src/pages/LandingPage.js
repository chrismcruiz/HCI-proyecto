import React from 'react'
import './LandingPage.css'
import IconButton from '@material-ui/core/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Tooltip } from '@material-ui/core';
import Navbar2 from '../components/Navbar2'
// Todo va dentro del "div"
// Entonces básicamente ud mete el html que quiera ahí dentro y le da clases para darle estilos sólo que en ves del atributo "class"
// usa el atributo "className"
const LandingPage = () => {
    return (
        <div>
            {/* <div style={{display: "flex", justifyContent:"flex-end"}}>
                    <a className="me-3 mt-2" href="/login">Entrar</a>
                    <a className="me-3 mt-2" href="/signup">Regístrarme</a>
            </div> */}
            {/* <h1>Aquí va una landing page :D</h1>
            <h2 className="lolcito">Viva el lolcito</h2> */}
            <Navbar2 />
            <div class="row justify-content-center">
                <div></div>
                <div class="col-sm-8">
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active altura">
                                <img src="/assets/image1.jpg" class="d-block w-100 h-100"  alt="..."></img>
                                <div class="carousel-caption d-none d-md-block carruselgrad">
                                    <h1>Conoce</h1>
                                    <p>Encuentra y socializa con las personas que te ayudaran en tus proyectos ya sean propios o ajenos.</p>
                                </div>
                            </div>
                            <div class="carousel-item altura">
                                <img src="/assets/image2.jpg" class="d-block w-100 h-100"   alt="..."></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h1>Trabaja</h1>
                                    <p>Muestra tus habilidades y gana reputación  para que los demás se fijen en tu trabajo.</p>
                                </div>
                            </div>
                            <div class="carousel-item altura">
                                <img src="/assets/image3.jpg" class="d-block w-100 h-100"  alt="..."></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h1>Triunfa</h1>
                                    <p>Cumple tus sueños, encamina tu negocio y tu vida profesional al éxito.</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <a><br></br></a>
                <a class="btn btn-primary btn-lg" href="/login" role="button">Inicia Sesión</a>
                <a><br></br></a>
                <a class="btn btn-primary btn-lg" href="/signup" role="button">Registrate</a>
                <a><br></br></a>
            </div>
            <div className="footer" height="1000"><a><br></br><br></br><br></br><br></br><br></br><br></br></a></div>
            <div class="container">
                <div class="row footer fixed-bottom ">
                    <div class="col">
                        <img className="logo" src='/assets/logon.jpg' alt="" width="100" height="100" className="d-inline-block align-text-top" onClick={() => window.location.reload()} /> 
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
                        <div class="row justify-content-center">
                            <p>© Todos los Derechos reservados 2021</p>
                        </div>
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
