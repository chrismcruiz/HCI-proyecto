const express = require('express')
const app = express() // backend base de datos
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routersUrls = require('./routes/routes')
const cors = require('cors')
// const bodyParser = require('body-parser');

// Para el chat
const app2 = express()
const http = require("http")
const { Server } = require("socket.io")
app2.use(cors())


dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(cors())
app.use('/app', routersUrls)

const server = http.createServer(app2);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {

        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});


app.listen(4000, () => console.log('Server is up and running'))
server.listen(3001, () => console.log("SERVER RUNNING"))