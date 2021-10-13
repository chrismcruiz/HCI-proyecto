const mongoose = require('mongoose')

const MatchTemplate = new mongoose.Schema({
    participants: {
        type: Array(2),
    },
    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('matches', MatchTemplate)