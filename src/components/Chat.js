import React from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import { Link } from "react-router-dom"

const Chat = ({ name, message, profilePic, timestamp }) => {
    const tarjeta = {name, photo:profilePic}
    return (
        <Link
            to={{ pathname: `/chats/t/${tarjeta._id}`, state: { tarjeta } }}
            className="link-chat"
        >
            <div className="chat">
                <Avatar className="chat__image" src={profilePic} />
                <div className="chat__details">
                    <h2>{name}</h2>
                    <p>{message}</p>
                </div>
                <p className="chat__timestamp">{timestamp}</p>
            </div>
        </Link>
    )
}

export default Chat
