import React, { useState, useEffect } from 'react'
import Chat from './Chat'
import ChatScreen from './ChatScreen'
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import './Chats.css'

const Chats = ({ userData, socket, usersData }) => {
    return (
        <div className="container chats-vista">
            <div className="row">
                <div className="col-4 columna-izquierda columna-altura pt-3">
                    <form className="input-group rounded buscar-chat">
                        <input className="form-control rounded" placeholder='Buscar...' aria-label="Search"
                            aria-describedby="search-addon" />
                        <span className="input-group-text border-0" id="search-addon">
                            <Tooltip title="Buscar">
                                <IconButton size="small" className="navbar__icons__search icono">
                                    <SearchIcon className="icon__color" type="submit" onClick={''} />
                                </IconButton>
                            </Tooltip>
                        </span>
                    </form>
                    <div className="chats">
                        {/* <Chat
                            name="Christian"
                            message="Ké lo keh"
                            timestamp="35 minutes ago"
                            profilePic="https://www.egames.news/__export/1628978961035/sites/debate/img/2021/08/14/dragon-ball-goku-es-lgbt-asexual.jpg_976912859.jpg"
                            onClick={''}
                        />
                        <Chat
                            name="Paula"
                            message="Ola ke ase"
                            timestamp="5 seconds ago"
                            profilePic="https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2019/05/16/5fa53bad6d530.jpeg"
                        /> */}
                         
                    </div>
                </div>
                <div className="col-8 position-relative border-start">
                    <ChatScreen userData={userData} socket={socket} usersData={usersData} />
                </div>
            </div>
        </div>
    )
}

export default Chats
