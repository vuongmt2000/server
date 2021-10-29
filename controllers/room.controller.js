
const Room = require('../models/Room')

module.exports.create = async(req, res) => {
    const {avatar, friend, mess, name_room } = req.body
    if(!avatar || !friend || !name_room ) {
        return res
         .status(400)
         .json({success: false, message :'Missing username and/or password'})
    }
    try {
        // check for existing room
        const room = await Room.findOne({friend})
        if(room){
            return res.status(200).json({success: false, message: 'created'})
        }
        const newRoom = new Room({friend, avatar_room: avatar, messages_room: mess, name_room})
        newRoom.save()
        res.json({success: true, message: "create room success", createAt: Room.createAt})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports.get_data = async(rep, res) =>{
    try {
        const room = await Room.find().sort({createAt_room: -1});;
        return res.status(200).json({success: true, message: room})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}