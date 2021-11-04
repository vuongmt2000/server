const mongoose = require('mongoose');
const Message = require('./Message');
const Schema = mongoose.Schema
const RoomSchema = new Schema ({
    friend : {
        type : String,
        required: true,
        // unique: true
    },
    avatar_room: {
        type: String,
        required: true
    },
    createAt_room: {
        type: Date,
        default: Date.now
    },
    messages_room: {
        type: Array(Message),
        default: []  
    },
    name_room: {
        type: String,
        required: true
    },
    update_room: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('room', RoomSchema);