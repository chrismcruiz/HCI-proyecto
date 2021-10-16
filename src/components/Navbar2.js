import React from 'react'

const Navbar2 = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark nav-header">
                <a class="navbar-brand home-brand" href="/">
                    { <img className="logo" src='/assets/logofinal.png' alt="" width="150" height="100" className="d-inline-block ms-auto" onClick={() => window.location.reload()} /> }
                    trade urself
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item nav-header-item">
                            <a class="nav-link nav-header-link" aria-current="page" href="#calificaciones">Calificanos</a>
                        </li>
                        <li class="nav-item nav-header-item">
                            <a class="nav-link nav-header-link" href="#carrusel">Conocenos</a>
                        </li>
                        <li class="nav-item dropdown nav-header-item">
                            <a class="nav-link dropdown-toggl e nav-header-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Soporte
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                 <li><a class="dropdown-item" href="#footer2">Telefono</a></li>
                                <li><a class="dropdown-item" href="#footer2">Correo electronico</a></li>
                                 <li><a class="dropdown-item" href="#footer2">Redes</a></li>
                            </ul>
                        </li>
                        <li class="nav-item nav-header-item">
                            <a class="nav-link nav-header-link">Ayuda</a>
                        </li>
                        <li class="nav-item nav-header-item">
                            <button className="btn btn-lg login-button" type="button"><a className="iconos" href="/login"><i class="fas fa-sign-in-alt"></i> Entrar</a></button>
                        </li>
                    </ul>
                    {/* <form class="d-flex justify-content-around p-2">
                            <button class="btn btn-success" type="submit"><a className="entrar" href="/login">Entrar</a></button>
                        </form> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar2
