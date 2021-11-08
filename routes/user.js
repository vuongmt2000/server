const express = require('express');
const router = express.Router()


console.log("called")
const User = require('../models/User')

// @route get data
// @disc get user
// @access public

router.post('/', async(req, res) =>{
    const {username} = req.body
    try {
        if(!username) {
            return res
            .status(400)
            .json({success: false, message :'Missing  username'})
        }
        const user = await User.find({username: {$ne: username}}).sort({createAt: -1});
        if(!user){
            return res
            .status(400)
            .json({success: false, message :'no username'})
        }
        return res.status(200).json({success: true, message: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
})


module.exports = router