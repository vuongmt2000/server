
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

module.exports.login = async(req, res) => {
    const { username, password } = req.body

    //simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
    }
    try {
        // check for  exiting user
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        }
        // username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        }
        // return token 
        const accessToken = jwt.sign({ userId: user._id }, 'asdfasdfasjdflkasjdlf')
        res.json({ success: true, message: "Login user success", accessToken, avatar: user.avatar, createAt: user.createAt, username: user.username, _id: user._id })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}



module.exports.register = async(req, res) =>{
    const {username, password} = req.body

    //simple validation
    if(!username || !password) {
        return res
        .status(400)
        .json({success: false, message :'Missing username and/or password'})
    }
    try {
        // check for existing user
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({success: false, message: 'username already taken'})
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword, avatar: User.avatar})
        await newUser.save()

        // return token 
        const accessToken = jwt.sign({userId: newUser._id}, 'asdfasdfasjdflkasjdlf')
        res.json({success: true, message: "create user success", accessToken, createAt: User.createAt})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}