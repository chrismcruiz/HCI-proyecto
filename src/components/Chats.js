import React, { useState, useEffect } from 'react'
import Chat from './Chat'
import ChatScreen from './ChatScreen'
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import './Chats.css'
import { useLocation } from "react-router-dom"

const Chats = ({ userData, socket, usersData }) => {
    const idTarjeta = window.location.pathname.split('/')[3]
    const tarjeta = usersData.filter((user) => user._id === idTarjeta)[0]
    const [chats, setChats] = useState([])
    const location = useLocation()
    const [search, setSearch] = useState([])
    const [enviado, toggleEnviado] = useState(false)

    useEffect(async () => {
        try {
            if (idTarjeta) {
                const response = await axios.post("http://localhost:4000/app/createConversation", [userData._id, idTarjeta])
                if (response.status === 200) {
                    socket.emit("join_room", response.data.conversationId);
                    if (!response.data.success) {
                        console.log('conversación ya creada')
                    }
                } 
            } else return
        } catch (err) {
            console.log(err)
        }
        try {
            const req = await axios.get("http://localhost:4000/app/getConversations?_id=" + userData._id)
            const dataConvers = []
            const idsConvers = []
            let ultimosMensajes = []
            const counterPartUsers = req.data.conversations.map((conversation) => conversation.participants.filter(participant => participant !== userData._id).toString())
            req.data.conversations.map((conversation) => {
                dataConvers.push({
                    room: conversation._id,
                })
                idsConvers.push(conversation._id)
            })
            try {
                ultimosMensajes = await axios.get("http://localhost:4000/app/getLastMessages")
                console.log(ultimosMensajes.data)
            } catch (err) {
                console.log(err)
            }
            ultimosMensajes.data.mensajes.map((msj) => {
                dataConvers.map((obj) => {
                    if (obj.room === msj._id) {
                        obj.ultimo = msj.ultimo
                        obj.timestamp = msj.timestamp
                    }
                })
            })
            const usuarios = usersData.filter((user) => counterPartUsers.includes(user._id))
            usuarios.reverse().map((user, index) => {
                dataConvers[index]._id = user._id
                dataConvers[index].name = user.name
                dataConvers[index].photo = user.photo
            })
            console.log(counterPartUsers)
            console.log(dataConvers)
            setChats(dataConvers)
            setSearch(dataConvers)
        } catch (err) {
            console.log(err)
        }
    }, [location.key, enviado])

    const handleInputChange = (e) => {
        let str= e.target.value.toString().toLowerCase()
        if (str !== '') {
            let debug = search.filter(chat => chat['name'].toLowerCase().includes(str))
            setChats(debug)
        } else {
            setChats(search)
        }
    }

    const actualizarMensajesIzquierda = () => toggleEnviado(!enviado)

    const timeDifference = (current, previous) => {
        console.log(current)
        const anterior = new Date(previous)
        console.log(anterior)

        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let msPerMonth = msPerDay * 30;
        let msPerYear = msPerDay * 365;
    
        let elapsed = current - anterior;
    
        if (elapsed < msPerMinute) {
             return 'Hace ' + Math.round(elapsed/1000) + ' segundos';   
        }
    
        else if (elapsed < msPerHour) {
             return 'Hace ' + Math.round(elapsed/msPerMinute) + ' minutos';   
        }
    
        else if (elapsed < msPerDay ) {
             return 'Hace ' + Math.round(elapsed/msPerHour ) + ' hora(s)';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'Hace aproximadamente ' + Math.round(elapsed/msPerDay) + ' días';   
        }
    
        else if (elapsed < msPerYear) {
            return 'Hace aproximadamente '  + Math.round(elapsed/msPerMonth) + ' meses';   
        }
    
        else {
            return 'Hace aproximadamente ' + Math.round(elapsed/msPerYear ) + ' años';   
        }
    }

    return (
        <div className="container chats-vista columna-altura border">
            <div className="row">
                <div className="col-4 columna-izquierda columna-altura pt-3">
                    <form className="input-group rounded buscar-chat" onSubmit={(e) => e.preventDefault()}>
                        <input className="form-control rounded" placeholder='Buscar...' aria-label="Search"
                            aria-describedby="search-addon" type="search" onChange={handleInputChange} />
                        <span className="input-group-text border-0" id="search-addon">
                            <Tooltip title="Buscar">
                                <IconButton size="small" className="navbar__icons__search icono">
                                    <SearchIcon className="icon__color" type="submit" />
                                </IconButton>
                            </Tooltip>
                        </span>
                    </form>
                    <div className="chats">
                        {chats.length > 0 ?

                            chats.map((chat) => (
                                <Chat
                                    key={chat._id}
                                    id={chat._id}
                                    name={chat.name.split(' ')[0]}
                                    message={chat.ultimo}
                                    profilePic={`/images/${chat.photo}`}
                                    timestamp={timeDifference(new Date(), chat.timestamp)}
                                />
                            ))

                            :
                            (<h5>No tienes chats</h5>)
                        }
                    </div>
                </div>
                <div className="col-8 position-relative border-start">
                    <ChatScreen userData={userData} socket={socket} tarjeta={tarjeta} location={location.key} actualizarMensajes={actualizarMensajesIzquierda}/>
                </div>
            </div>
        </div>
    )
}

export default Chats
