import React, { useState, useEffect } from 'react'
import Chat from './Chat'
import ChatScreen from './ChatScreen'
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import './Chats.css'
import { useLocation } from "react-router-dom"
import moment from 'moment'

moment.locale('es', {
    relativeTime : {
        future : 'dentro de %s',
        past : 'hace %s',
        s : 'algunos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    }
});


const Chats = ({ userData, socket, usersData }) => {
    const idTarjeta = window.location.pathname.split('/')[3]
    const tarjeta = usersData.filter((user) => user._id === idTarjeta)[0]
    const [chats, setChats] = useState([])
    const location = useLocation()
    const [search, setSearch] = useState([])
    const [enviado, toggleEnviado] = useState(false)
    const [contador, setContador] = useState(0)

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
            const conversaciones = req.data.conversations
            console.log('Mis conversaciones: ')
            console.log(conversaciones)

            const dataConvers = []
            const idsConvers = []
            let ultimosMensajes = []
            const counterPartUsers = conversaciones.map((conversation) => conversation.participants.filter(participant => participant !== userData._id).toString())
            console.log('Mi id: ' + userData._id)
            console.log('Ids usuarios con los que tengo conversaciones:')
            console.log(counterPartUsers)

            conversaciones.map((conversation) => {
                dataConvers.push({
                    room: conversation._id,
                })
                idsConvers.push(conversation._id)
            })
            try {
                ultimosMensajes = await axios.get("http://localhost:4000/app/getLastMessages")
                console.log("últimos mensajes: ")
                console.log(ultimosMensajes.data.mensajes)
            } catch (err) {
                console.log(err)
            }

            ultimosMensajes.data.mensajes.map((msj) => {
                dataConvers.map((obj) => {
                    // console.log(obj.room, msj._id)
                    if (obj.room === msj._id) {
                        obj.ultimo = msj.ultimo
                        obj.timestamp = msj.timestamp
                    }
                })
            })

            // Información completa de los usuarios con los que tengo conversaciones
            const usuarios = usersData.filter((user) => counterPartUsers.includes(user._id))

            // acá ya tengo room, último y timestamp
            conversaciones.map((conversation) => {
                dataConvers.map((obj) => {
                    console.log(obj)
                    if (obj.room === conversation._id) {
                        const idUser = conversation.participants.filter(participant => participant !== userData._id)[0]
                        // console.log(idUser)
                        const usuarioData = usuarios.filter(user => user._id === idUser)[0]
                        obj['_id'] = usuarioData._id
                        obj['name'] = usuarioData.name
                        obj['photo'] = usuarioData.photo
                    }
                })
            })
            
            dataConvers.map((conver, index) => {
                console.log(conver)
                if (!conver.ultimo) {
                    dataConvers.splice(index, 1)
                }
            })
            
            dataConvers.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

            setChats(dataConvers)
            setSearch(dataConvers)
        } catch (err) {
            console.log(err)
        }
    }, [location.key, enviado, contador])

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
    const actualizarContador = (num) => {
        console.log(num)
        setContador(num)
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
                                    timestamp={moment(chat.timestamp).fromNow()}
                                />
                            ))

                            :
                            (<h5>No tienes chats</h5>)
                        }
                    </div>
                </div>
                <div className="col-8 position-relative border-start">
                    <ChatScreen userData={userData} socket={socket} tarjeta={tarjeta} location={location.key} actualizarMensajes={actualizarMensajesIzquierda} enviado={enviado} actualizarContador={actualizarContador} />
                </div>
            </div>
        </div>
    )
}

export default Chats
