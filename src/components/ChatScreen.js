import React, { useState, useEffect } from 'react'
import './ChatScreen.css'
import Avatar from '@material-ui/core/Avatar'
import axios from "axios";


const ChatScreen = ({ userData, socket, usersData }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [idRoom, setIdRoom] = useState('')
    const idTarjeta = window.location.pathname.split('/')[3]
    const tarjeta = usersData.filter((user) => user._id === idTarjeta)[0]
  
    useEffect(async () => {
        try {
            const response = await axios.get("http://localhost:4000/app/conversations/verify?idA=" + userData._id + "&idB=" + idTarjeta)
            if (response.status === 200) {
              setIdRoom(response.data.idRoom)
            } else {
              console.log(response)
            }
          } catch (err) {
            console.log(err)
          }
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        // setMessages(...messages, data);
        });
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input !== "") {
            const messageData = {
              room: idRoom,
              author: userData.name,
              message: input,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
      
            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            // setMessages(...messages, messageData);
            setInput("");
        }
    }

    return (
        <div className="chatScreen">
            <div className="d-flex justify-content-center align-items-center">
                <p className="chatScreen__timestamp">{tarjeta.name.split(' ')[0].toUpperCase()} SE AÑADIÓ A TUS CONTACTOS EL 10/06/21</p>
            </div>
            {messages.map((message) => (
                message.author !== userData.name ?
                    (
                        <div className="chatScreen__message">
                            <Avatar
                                className="chatScreen__image"
                                alt={message.name}
                                src={`/images/${tarjeta.photo}`}
                            />
                            <p className="chatScreen__text">{message.message}</p>
                        </div>
                    ) : (
                        <div className="chatScreen__message">
                            <p className="chatScreen__textUser">{message.message}</p>
                        </div>
                    )
            ))}

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
