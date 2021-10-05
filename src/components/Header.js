import React, { createContext, useState, useEffect } from 'react'
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


const Navbar = ({ userData, filtrar, type }) => {
    const [filtro, setFiltro] = useState(null)
    const [currentChat, setCurrentChat] = useState('')

    const aplicarfiltro = () => {
        filtrar(filtro)
        setFiltro('')
    }

    const getLastMessage = async () => {
        try {
            const response = await axios.get("http://localhost:4000/app/getLastMessage?name=" + userData.name)
            if (response.status === 200 && response.data.mensajes.length > 0) {
                const request = await axios.get("http://localhost:4000/app/getParticipants?room=" + response.data.mensajes[response.data.mensajes.length - 1].room)
                if (request.status === 200) {
                    window.location.href = `/chats/t/${request.data.participants[0].participants.filter(user => user !== userData._id)[0]}`
                } else console.log(request)
            } else window.location.href = '/chats'
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-white borde_inferior" >
                <div className="container-fluid">
                    <a className="navbar-brand vertical-center" href="/home">
                        <img className="logo" src='/assets/unknown.png' alt="" width="110" height="65" className="d-inline-block align-text-top" onClick={() => window.location.href = '/'} />
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
                            <IconButton onClick={getLastMessage} size="small" className="navbar__icons__chat icono">
                                <ChatBubbleOutlineIcon className="icon__color" />
                            </IconButton>
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
