const mongoose = require('mongoose')

const ConversationTemplate = new mongoose.Schema({
    participants: {
        type: Array(2),
    },
})

module.exports = mongoose.model('conversations', ConversationTemplate)