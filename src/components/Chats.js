import React from 'react'
import Chat from './Chat'
import './Chats.css'

const Chats = () => {
    return (
        <div className="chats">
            <Chat 
                name="Christian"
                message="Ké lo keh"
                timestamp="35 minutes ago"
                profilePic="https://www.egames.news/__export/1628978961035/sites/debate/img/2021/08/14/dragon-ball-goku-es-lgbt-asexual.jpg_976912859.jpg"
            />
            <Chat 
                name="Paula"
                message="Ola ke ase"
                timestamp="5 seconds ago"
                profilePic="https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2019/05/16/5fa53bad6d530.jpeg"
            />
        </div>
    )
}

export default Chats
