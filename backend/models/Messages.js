const mongoose = require('mongoose')

const MessagesTemplate = new mongoose.Schema({
    sender: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations"
    },
})

module.exports = mongoose.model('messages', MessagesTemplate)