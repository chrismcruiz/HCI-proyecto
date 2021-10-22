import React, { useState } from "react";
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
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// Todo va dentro del "div"
// Entonces básicamente ud mete el html que quiera ahí dentro y le da clases para darle estilos sólo que en ves del atributo "class"
// usa el atributo "className"
const LandingPage = () => {
  const [page, setPage] = useState(1)

  const OnboardingTwo = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-5 features-title">Conoce personas <i className="ms-2 far fa-handshake"></i></h2>
        <p className="features-description">
          Quieres conocer a tu jefe o a las personas
          que te ayudaran en tu emprendimiento en tu vida o
          tambien colegas con los que compartes habilidades
          laboral, y tambien puedas aprender de ello o
          ellos de ti, empieza a explorar el mundo de
          posibilidades que aca te ofrecemos.
        </p>
      </div>
    )
  }

  const OnboardingThree = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-5 features-title">Valora a los demás <i className="ms-2 fas fa-user-friends"></i></h2>
        <p className="features-description">
          Comparte tus experiencias con
          las demás personas por medio
          de las calificaciones y opiniones
          que tienes de su trabajo por medio
          de estrellas, trata de dar 5 estrellas,
          ayudémonos entre todos.
        </p>
      </div>
    )
  }

  const OnboardingOne = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-5 features-title">Ponte a prueba <i className="ms-2 fas fa-briefcase"></i></h2>
        <p className="features-description">
          Quieres mostrarte al mundo con tus
          habilidades, compartalas para que
          la gente se pueda interesar en tus
          virtudes y cualidades que te describen
          como buena persona y todo un profesional.
        </p>
      </div>
    )
  }

  const handlePage = () => {
    if (page < 3) {
      setPage(page + 1)
    } else {
      setPage(1)
    }
  }

  console.log(page)
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
      <div id="carrusel" className="row mb-5">
        <div className="col-7 d-flex justify-content-center flex-column align-items-center">
          <div>
            {page === 1 && (<OnboardingOne />)}
            {page === 2 && (
              <OnboardingTwo />
            )}
            {page === 3 && (
              <OnboardingThree />
            )}
          </div>
        </div>
        <div className="col-4">
          <Carousel autoPlay infiniteLoop showStatus={false} onChange={handlePage}>
            <div>
              <img src="assets/carruselimage1.png" />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
              <img src="assets/carruselimage2.png" />
              {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
              <img src="assets/carruselimage3.png" />
              {/* <p className="legend">Legend 3</p> */}
            </div>
          </Carousel>
        </div>
      </div>
      {/* Reseñas */}
      <div className="reseñas d-flex justify-content-center align-items-center flex-column">
        <h2 className="reseñas-titulo" id="calificaciones">RESEÑAS</h2>
        <div class="container">
          <div className="row">
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come1.png" width="200" heigth="200" className="pequeña"></img>
              <h4>Jeank P</h4>
              <p className="reseña-user">Pude llevar adelante mis sueños y conocí gente increible.</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>

            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come2.png" className="pequeña"></img>
              <h4>Kevin D</h4>
              <p className="reseña-user">Fácil de usar y buen concepto</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come3.png" className="pequeña"></img>
              <h4>Christian R</h4>
              <p className="reseña-user">Pude demostrar mis habilidades a las demas personas</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
          </div>
          <div className="row ">
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come4.png" className="pequeña"></img>

              <h4>Paula H</h4>
              <p className="reseña-user">No me canso de recomendarla a los demas es una maravilla</p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come5.png" className="pequeña"></img>

              <h4>Joseph B</h4>
              <p className="reseña-user">
                Estaba buscando un empleo y esta pagina me sirvio para
                encontrarlo
              </p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/come6.png" className="pequeña"></img>
              <h4>Cristian S</h4>
              <p className="reseña-user">
                Mi proyecto personal pudo llevarse a cabo y encontre gente que
                me pudo ayudar
              </p>
              {/* <p><a class="btn btn-secondary" href="#">View details »</a></p> */}
            </div>
          </div>
        </div>
      </div>

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
