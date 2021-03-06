const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const signUpTemplate = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    birthday: {
        type: String,
        default: '',
        required: true
    },
    gender: {
        type: String,
        default: '',
        required: false
    },
    career: {
        type: String,
        default: '',
        required: true
    },
    photo: {
        type: String,
        default: ''
    },
    location: {
        department: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        }
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    matches: {
        type: Array,
    },
    liked: {
        type: Array,
    },
    description: {
        type: String,
        default: '', 
    },
    filters: {
        type: Array,
    },
    admin: {
        type: Boolean,
        default: false
    },
    Date: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

signUpTemplate.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

signUpTemplate.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('users', signUpTemplate)
