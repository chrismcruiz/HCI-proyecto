import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-white borde_inferior">
                <div className="container-fluid">
                    <a class="navbar-brand logo-tu" href="/home">
                        <img className="" src='/assets/logo.jpg' alt="" width="30" height="24" className="d-inline-block align-text-top" onClick={() => window.location.reload()} />
                        Trade Urself
                    </a>
                   
                    <div className="navbar__icons">
                        <IconButton size="small" className="navbar__icons__search icono">
                            <SearchIcon className="icon__color"/>
                        </IconButton>
                        <IconButton size="small" className="navbar__icons__group icono">
                            <GroupIcon className="icon__color"/>
                        </IconButton>
                        <IconButton size="small" className="navbar__icons__chat icono">
                            <ChatBubbleOutlineIcon className="icon__color"/>
                        </IconButton>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
