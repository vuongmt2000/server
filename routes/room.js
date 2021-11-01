const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')


const roomController = require('../controllers/room.controller')

// @route get data
// @disc get user
// @access public

router.post('/create', roomController.create )
router.get('/get_room', roomController.get_data )


module.exports = router