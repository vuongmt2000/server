const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema ({
    text : {
        type : String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        _id : String,
        name: String,
        avatar: String
    }
})

module.exports = mongoose.model('message', MessageSchema);