import React, { useState, useEffect } from 'react'
import './ChatScreen.css'
import Avatar from '@material-ui/core/Avatar'
import axios from "axios";
import { css } from '@emotion/react';
import ScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom"

const ChatScreen = ({ userData, socket, tarjeta, location, actualizarMensajes }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [idRoom, setIdRoom] = useState('')


    useEffect(async () => {
        try {
            const response = await axios.get("http://localhost:4000/app/conversations/verify?idA=" + userData._id + "&idB=" + tarjeta._id)
            if (response.status === 200) {
                setIdRoom(response.data.idRoom)
                try {
                    const request = await axios.get("http://localhost:4000/app/getMessages?_id=" + response.data.idRoom)
                    if (request.status === 200 && request.data.messages.length > 0) {
                        setMessages(request.data.messages)
                    } else {
                        console.log(response)
                    }
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        });
    }, [socket, location]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input !== "") {
            const messageData = {
                sender: userData.name,
                message: input,
                room: idRoom
            }

            await socket.emit("send_message", messageData);
            try {
                const response = await axios.post("http://localhost:4000/app/storeMessages", messageData)
                if (response.status === 200) {
                    console.log(response.data)
                    setMessages((list) => [...list, messageData]);
                    actualizarMensajes()
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.log(err)
            }
            setInput("");
        }
    }

    return (
        <div className="chatScreen">
                {tarjeta !== undefined ?
                    (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Avatar className="mt-3" alt="" src={`/images/${tarjeta.photo}`} />
                            <p className="chatScreen__timestamp pt-2">{tarjeta.name.split(' ')[0].toUpperCase()} SE AÑADIÓ A TUS CONTACTOS EL 10/06/21</p>
                        </div>
                    )
                    :
                    <h5 className="text-center">Aún no tienes ningún mensaje</h5>
                }
            <ScrollToBottom className='message-container' >
                {messages.map((message) => (
                    message.sender !== userData.name ?
                        (
                            <div className="chatScreen__message">
                                <Avatar
                                    className="chatScreen__image"
                                    alt={message.sender}
                                    src={`/images/${tarjeta.photo}`}
                                    key={message.photo}
                                />
                                <p className="chatScreen__text">{message.message}</p>
                            </div>
                        ) : (
                            <div className="chatScreen__message">
                                <p className="chatScreen__textUser">{message.message}</p>
                            </div>
                        )
                ))}
             </ScrollToBottom>
            <form className="row chatScreen__input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="chatScreen__inputField col-10"
                />
                <button onClick={handleSubmit} className="col-2 chatScreen__inputButton">ENVIAR</button>
            </form>

        </div>
    )
}

export default ChatScreen
