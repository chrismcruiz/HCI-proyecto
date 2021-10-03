import React, { createContext, useState, useRef } from 'react'
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { logOut } from "../utils/CloseSession";
import { Link } from "react-router-dom";
import { carreras } from "../utils/dataForm";
import axios from "axios";
import './Header.css'


const Navbar = ({ filtrar, type }) => {
    const [filtro, setFiltro] = useState(null)

    const aplicarfiltro = () => {
        filtrar(filtro)
        setFiltro('')
    }


    return (
        <div>
            <nav className="navbar navbar-light bg-white borde_inferior" >
                <div className="container-fluid">
                    <a className="navbar-brand vertical-center" href="/home">
                        <img className="logo" src='/assets/unknown.png' alt="" width="110" height="65" className="d-inline-block align-text-top" onClick={() => window.location.reload()} />
                        {/* <span className="brand">Trade Urself</span> */}
                    </a>
                    {type !== 'search' ?
                        (
                            <form className="input-group rounded buscar">
                                <input value={filtro} onChange={(e) => setFiltro(e.target.value)} type="search" className="form-control rounded" placeholder='Aplicar filtros...' aria-label="Search"
                                    aria-describedby="search-addon" list="filtros" name="filtros" />
                                <datalist id='filtros'>
                                    {carreras.map((carrera, index) => (
                                        <option key={index} value={carrera}>
                                            {carrera}
                                        </option>
                                    ))}
                                </datalist>
                                <span className="input-group-text border-0" id="search-addon">
                                    <Tooltip title="Añadir">
                                        <IconButton size="small" className="navbar__icons__search icono">
                                            <AddIcon className="icon__color" type="submit" onClick={aplicarfiltro} />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            </form>
                        )
                        : null
                    }
                    <div className="navbar__icons">
                        <Tooltip title="Mensajes">
                            <Link to='/chats/t/6154232469c92a0aacc0b3d5'>
                                <IconButton size="small" className="navbar__icons__chat icono">
                                    <ChatBubbleOutlineIcon className="icon__color" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Cerrar sesión">
                            <IconButton size="small" className="navbar__icons__chat icono">
                                <LogoutIcon onClick={logOut} className="icon__color" />
                            </IconButton>
                        </ Tooltip>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
