const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username : {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://st.quantrimang.com/photos/image/2018/01/02/hinh-nen-nhung-chu-cun-cho-may-tinh-5.jpg"
    },
    createAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('users', UserSchema);