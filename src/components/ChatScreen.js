import React, { useState } from 'react'
import './ChatScreen.css'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom"

const ChatScreen = ({ name, img }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            name: 'Christian',
            image: 'https://www.egames.news/__export/1628978961035/sites/debate/img/2021/08/14/dragon-ball-goku-es-lgbt-asexual.jpg_976912859.jpg',
            message: 'ké lo keh'
        },
        {
            name: 'Christian',
            image: 'https://www.egames.news/__export/1628978961035/sites/debate/img/2021/08/14/dragon-ball-goku-es-lgbt-asexual.jpg_976912859.jpg',
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
                <p className="chatScreen__timestamp me-auto my-auto pe-5">CHRISTIAN SE AÑADIÓ A TUS CONTACTOS EL 10/06/21</p>
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
