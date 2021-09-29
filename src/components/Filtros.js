import React from 'react'
import './Filtros.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const Filtros = ({ idUser, name, borrarFiltro }) => {
    return (
        <div className="d-inline-block mx-2 filtro-container">
            <button type="button" className="btn btn-outline-success filtro d-flex align-items-center">
                <span className="me-1">{name}</span>
                <CloseIcon onClick={() => borrarFiltro(name)} />
            </button>
        </div>
    )
}

export default Filtros
