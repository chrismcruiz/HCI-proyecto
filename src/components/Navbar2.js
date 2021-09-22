import React from 'react'

const Navbar2 = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand " href="/">
                        <img className="logo" src='/assets/unknown.png' alt="" width="100" height="100" className="d-inline-block align-text-top" onClick={() => window.location.reload()} />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Calificanos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Conocenos</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Soporte
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Informanos un problema</a></li>
                                    <li><a class="dropdown-item" href="#">Solicitar un asesor via web</a></li>
                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><a class="dropdown-item" href="#">Preguntas frecuentes</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Ayuda</a>
                            </li>
                        </ul>
                        <form class="d-flex justify-content-around p-2">
                            <button class="btn btn-success" type="submit"><a className="entrar" href="/login">Entrar</a></button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar2
