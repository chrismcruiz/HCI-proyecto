import React, { useState } from 'react'
import './ChatScreen.css'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

const ChatScreen = () => {
    const location = useLocation()
    const { tarjeta } = location.state

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            name: tarjeta.name,
            image: `/images/${tarjeta.photo}`,
            message: 'ké lo keh'
        },
        {
            name: tarjeta.name,
            image: `/images/${tarjeta.photo}`,
            message: '1v1 en lolcito'
        },
        {
            message: '1v1 Yasuo con ignite'
        }
    ])

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessages([...messages, {message: input}])
        setInput('')
    }

    return (
        <div className="chatScreen container-fluid">
            <div className="d-flex justify-content-center align-items-center">
                <div className="me-auto ms-3">
                    <Link to="/chats">
                        <IconButton>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Link>
                </div>
                <p className="chatScreen__timestamp me-auto my-auto pe-5">{tarjeta.name.split(" ")[0].toUpperCase()} SE AÑADIÓ A TUS CONTACTOS EL 10/06/21</p>
            </div>
            {messages.map((message) => (
                message.name ?
                    (
                        <div className="chatScreen__message">
                            <Avatar
                                className="chatScreen__image"
                                alt={message.name}
                                src={message.image}
                            />
                            <p className="chatScreen__text">{message.message}</p>
                        </div>
                    ) : (
                        <div className="chatScreen__message">
                            <p className="chatScreen__textUser">{message.message}</p>
                        </div>
                    )
            ))}

            <form className="chatScreen__input row pe-4 mx-0">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="chatScreen__inputField col-10"
                />
                <button onClick={handleSubmit} type="submit" className="col-2 chatScreen__inputButton">ENVIAR</button>
            </form>

        </div>
    )
}

export default ChatScreen
