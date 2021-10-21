import React from "react";
import "./LandingPage.css";
import IconButton from "@material-ui/core/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Tooltip } from "@material-ui/core";
import Navbar2 from "../components/Navbar2";
// Todo va dentro del "div"
// Entonces básicamente ud mete el html que quiera ahí dentro y le da clases para darle estilos sólo que en ves del atributo "class"
// usa el atributo "className"
const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header id="header" className="header">
        <Navbar2 />
        <div className="row">
          <div className="col-md-7">
            <h1 className="title">Encuentra nuevas oportunidades de trabajo</h1>
            <p className="motto">
              Pon a prueba tus habilidades y conocimientos para conformar
              equipos de trabajo.
            </p>
            <button className="btn btn-lg signup-button" type="button">
              <a className="iconos" href="/signup">
                <i class="fas fa-user-plus"></i> Regístrate
              </a>
            </button>
          </div>
          <div className="col-md-5">
            <img className="header-img" src="/assets/work1.png" />
          </div>
        </div>
      </header>
      <div id="header2" className="header2"></div>
      {/* Carrusel */}
      {/*<div id="carrusel" class="row justify-content-center carrusel">
                <div class="col-md-10">
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="/assets/image1.jpg" class="d-block w-100 carrusel-img"  alt="..."></img>
                                <div class="carousel-caption d-none d-md-block carruselgrad">
                                    <h1>Conoce</h1>
                                    <p>Encuentra y socializa con las personas que te ayudaran en tus proyectos ya sean propios o ajenos.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="/assets/image2.jpg" class="d-block w-100 carrusel-img"   alt="..."></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h1>Trabaja</h1>
                                    <p>Muestra tus habilidades y gana reputación  para que los demás se fijen en tu trabajo.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="/assets/image3.jpg" class="d-block w-100 carrusel-img"  alt="..."></img>
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
            {/* <div class="d-grid gap-2 col-6 mx-auto">
                <a><br></br></a>
                <a class="btn btn-primary btn-lg" href="/login" role="button">Inicia Sesión</a>
                <a><br></br></a>
                <a class="btn btn-primary btn-lg" href="/signup" role="button">Registrate</a>
                <a><br></br></a>
            </div> */}
      <div id="carrusel" className="row justify-content-center">
        <div className="col-md-10">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <carousel>
            <input type="radio" id="page1cb" checked name="pages" />
            <input type="radio" id="page2cb" name="pages" />
            <input type="radio" id="page3cb" name="pages" />
            <input type="radio" id="page4cb" name="pages" />
            <input type="radio" id="page5cb" name="pages" />
            <page id="page1">
              <div className="izq">
                <div className="ubic">
                  <b>Ponte a prueba</b>
                </div>
                <p className="letrap">
                  Quieres mostrarte al mundo con tus <br></br>
                  habilidades, compartalas para que <br></br>
                  la gente se pueda interesar en tus<br></br>
                  virtudes y cualidades que te describen <br></br>
                  como buena persona y todo un profesional.{" "}
                </p>
              </div>
              <div className="der">
                <label for="page2cb" title="Start">
                  <img
                    src="/assets/carruselimage1.png"
                    className="pequeña"
                  ></img>
                </label>
              </div>
            </page>
            <page id="page2">
              <div className="izq">
                <div className="ubic">
                  <b>Conoce personas</b>
                </div>
                <p className="letrap">
                  Quieres conocer a tu jefe o a las personas <br></br>
                  que te ayudaran en tu emprendimiento en tu vida <br></br>o
                  tambien colegas con los que compartes habilidades<br></br>
                  laboral, y tambien puedas aprender de ello o <br></br>
                  ellos de ti, empieza a explorar el mundo de <br></br>
                  posibilidades que aca te ofrecemos.
                </p>
              </div>
              <div className="der">
                <label for="page3cb" title="Next">
                  <img
                    src="/assets/carruselimage2.png"
                    className="pequeña"
                  ></img>
                </label>
              </div>
            </page>
            <page id="page3">
              <div className="izq">
                <div className="ubic">
                  <b>Valora a los demás</b>
                </div>
                <p className="letrap">
                  Comparte tus experiencias con <br></br>
                  las demás personas por medio <br></br>
                  de las calificaciones y opiniones<br></br>
                  que tienes de su trabajo por medio <br></br>
                  de estrellas, trata de dar 5 estrellas, <br></br>
                  ayudémonos entre todos.
                </p>
              </div>
              <div className="der">
                <label for="page4cb" title="Next">
                  <img
                    src="/assets/carruselimage3.png"
                    className="pequeña"
                  ></img>
                </label>
              </div>
            </page>
            <page id="page4">
              <div className="izq">
                <div className="ubic">
                  <b>Comunícate con tus contactos</b>
                </div>
                <p className="letrap">
                  Utiliza los chats que en Trade Urself <br></br>
                  ofrecemos para que no pierdas la <br></br>
                  comunicación con tus compañeros de<br></br>
                  trabajo y puedas expresar las ideas<br></br>
                  que ayuden al emprendimiento.{" "}
                </p>
              </div>
              <div className="der">
                <label for="page5cb" title="Next">
                  <img
                    src="/assets/carruselimage4.png"
                    className="pequeña"
                  ></img>
                </label>
              </div>
            </page>
            <page id="page5">
              <div className="izq">
                <div className="ubic">
                  <b>Lleva un orden en tus contactos</b>
                </div>
                <p className="letrap">
                  En Trade Urself puedes ver tus <br></br>
                  contactos y administrarlos a tu <br></br>
                  gusto, también puedes ver los grupos <br></br>
                  en donde trabajas y administrarlos mas <br></br>
                  fácilmente.{" "}
                </p>
              </div>
              <div className="der">
                <label for="page1cb" title="That's all folks!">
                  <img
                    src="/assets/carruselimage5.png"
                    className="pequeña"
                  ></img>
                </label>
              </div>
            </page>
          </carousel>
        </div>
      </div>
      <center>
        <div>
          <br></br>
          <br></br>

          <h1 id="calificaciones">RESEÑAS</h1>

          <br></br>
          <br></br>
        </div>
        <div class="container">
          <div className="row ">
            <div class="col-lg-4">
              <img src="/assets/come1.png" className="pequeña"></img>

              <h2>Jeank P</h2>
              <p>Pude llevar adelante mis sueños y conocí gente increible.</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div class="col-lg-4">
              <img src="/assets/come2.png" className="pequeña"></img>
              <h2>Kevin D</h2>
              <p>Fácil de usar y buen concepto</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div class="col-lg-4">
              <img src="/assets/come3.png" className="pequeña"></img>
              <h2>Christian R</h2>
              <p>Pude demostrar mis habilidades a las demas personas</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
          </div>
          <div className="row ">
            <div class="col-lg-4">
              <img src="/assets/come4.png" className="pequeña"></img>

              <h2>Paula H</h2>
              <p>No me canso de recomendarla a los demas es una maravilla</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div class="col-lg-4">
              <img src="/assets/come5.png" className="pequeña"></img>

              <h2>Joseph B</h2>
              <p>
                Estaba buscando un empleo y esta pagina me sirvio para
                encontrarlo
              </p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div class="col-lg-4">
              <img src="/assets/come6.png" className="pequeña"></img>
              <h2>Cristian S</h2>
              <p>
                Mi proyecto personal pudo llevarse a cabo y encontre gente que
                me pudo ayudar
              </p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
          </div>
        </div>
      </center>

      <div id="footer2" className="footer2"></div>
      {/* Footer */}
      <footer class="container-fluid footer">
        <center>
          <div>
            <img
              src="/assets/logol.png"
              height="200"
              width="-20"
              alt=""
              onClick={() => window.location.reload()}
            />
          </div>
          <div class="hr"></div>
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
              <p>
                Contáctanos al 6363636 / o escríbenos a trade_ur_self@tu.com.co
              </p>
            </div>
          </div>
          <div class="hr"></div>
          <div class="row justify-content-center">
            <p>© Todos los Derechos reservados 2021</p>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">Privacidad</div>
            <div class="col-4">Terminos de servicio</div>
            <div class="row justify-content-center">
              <br></br>{" "}
            </div>
          </div>

          <div class="col"></div>
        </center>
      </footer>
    </div>
  );
};

export default LandingPage;
