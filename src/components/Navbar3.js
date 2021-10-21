import React from "react";

const Navbar3 = ({ type }) => {
  return (
    <div>
      <div className="login-header">
        <nav class="navbar navbar-expand-lg navbar-dark nav-header">
          <a class="navbar-brand home-brand" href="/">
            {
              <img
                src="/assets/logofinal.png"
                alt=""
                width="150"
                height="100"
                className="logo d-inline-block ms-1"
                onClick={() => window.location.reload()}
              />
            }
            trade urself
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item nav-header-item">
                <a
                  class="nav-link nav-header-link"
                  aria-current="page"
                  href="/#calificaciones"
                >
                  Calificanos
                </a>
              </li>
              <li class="nav-item nav-header-item">
                <a class="nav-link nav-header-link" href="/#carrusel">
                  Conócenos
                </a>
              </li>
              <li class="nav-item dropdown nav-header-item">
                <a
                  class="nav-link dropdown-toggl nav-header-link"
                  href="#footer"
                  id="navbarDropdown"
                  role="button"
                  // data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contáctanos
                </a>
              </li>
              <li class="nav-item nav-header-item">
                <a class="nav-link nav-header-link">Ayuda</a>
              </li>
              <li class="nav-item nav-header-item">
                <button className="btn btn-lg login-button2" type="button">
                  {type === "signup" ? (
                    <a className="iconos" href="/login">
                      <i class="fas fa-sign-in-alt me-2"></i>Ingresar
                    </a>
                  ) : (
                    <a className="iconos" href="/signup">
                      <i class="fas fa-sign-in-alt me-1"></i> Regístrarme
                    </a>
                  )}
                </button>
              </li>
            </ul>
            {/* <form class="d-flex justify-content-around p-2">
                            <button class="btn btn-success" type="submit"><a className="entrar" href="/login">Entrar</a></button>
                        </form> */}
          </div>
        </nav>
      </div>
      <div className="header3"></div>
    </div>
  );
};

export default Navbar3;
