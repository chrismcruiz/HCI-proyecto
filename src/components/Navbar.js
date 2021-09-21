import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import { Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "../utils/CloseSession";
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-white borde_inferior">
                <div className="container-fluid">
                    <a className="navbar-brand vertical-center" href="/home">
                        <img className="logo" src='/assets/unknown.png' alt="" width="110" height="65" className="d-inline-block align-text-top" onClick={() => window.location.reload()} />
                        {/* <span className="brand">Trade Urself</span> */}
                    </a>

                    <div class="input-group rounded buscar">
                        <input type="search" class="form-control rounded" placeholder="Buscar..." aria-label="Search"
                            aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <Tooltip title="Buscar">
                                <IconButton size="small" className="navbar__icons__search icono">
                                    <SearchIcon className="icon__color" />
                                </IconButton>
                            </Tooltip>
                        </span>
                    </div>
                    <div className="navbar__icons">

                        {/* <IconButton size="small" className="navbar__icons__group icono">
                            <GroupIcon className="icon__color" />
                        </IconButton> */}

                        <Tooltip title="Chats">
                            <IconButton size="small" className="navbar__icons__chat icono">
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
        </>
    )
}

export default Navbar
