const mongoose = require('mongoose')

const ChatTemplate = new mongoose.Schema({
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
    conversationId: {
        type: String,
        default: ''
    },
})

module.exports = mongoose.model('Chat', ChatTemplate)