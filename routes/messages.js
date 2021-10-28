const express = require('express');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')

router.get('/', async(req, res) =>{
    return console.log(`object socket io`)
})

module.exports = router