const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema ({
    from : {
        type : int,
        required: true,
        // unique: true
    },
    to: {
        type: int,
        required: true
    },   
    messages_text: {
        type: Array,
        required: true
    },
    createAt_room: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('message', RoomSchema);