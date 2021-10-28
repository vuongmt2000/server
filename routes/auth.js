const express = require('express');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')

const authController = require('../controllers/auth.controller')
router.get('/', async(req, res) =>{
    return res.send("oke hello")
})


// @route register
// @disc register user
// @access public

router.post('/register', authController.register)


// @route login
// @disc login user
// @access public

router.post('/login', authController.login)


module.exports = router