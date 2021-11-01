const express = require('express');
const router = express.Router()


console.log("called")
const User = require('../models/User')

// @route get data
// @disc get user
// @access public

router.get('/', async(req, res) =>{
    try {
        const user = await User.find().sort({createAt: -1}).populate('password');
        return res.status(200).json({success: true, message: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
})


module.exports = router