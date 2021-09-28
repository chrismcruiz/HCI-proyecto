import React, { useState } from 'react'
import './ChatScreen.css'
import Avatar from '@material-ui/core/Avatar'

const ChatScreen = () => {
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
    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">CHRISTIAN SE AÑADIÓ A TUS CONTACTOS EL 10/06/21</p>
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

            <form className="chatScreen__input container-fluid">
                <input
                    placeholder="Escribe un mensaje..."
                    className="chatScreen__inputField"
                />
                <button className="chatScreen__inputButton">ENVIAR</button>
            </form>

        </div>
    )
}

export default ChatScreen
