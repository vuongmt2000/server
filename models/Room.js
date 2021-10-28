const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema ({
    member_room : {
        type : Array,
        required: true,
        // unique: true
    },
    avatar_room: {
        type: String,
        default: "https://st.quantrimang.com/photos/image/2018/01/02/hinh-nen-nhung-chu-cun-cho-may-tinh-5.jpg"
    },
    createAt_room: {
        type: Date,
        default: Date.now
    },
    messages: {
        type: Array,
    },
})

module.exports = mongoose.model('room', RoomSchema);