
const Room = require('../models/Room')



// @route create
// @disc create room
// @access public
module.exports.create = async(req, res) => {
    const {avatar, friend, mess, name_room } = req.body
    if(!avatar || !friend || !name_room ) {
        return res
         .status(400)
         .json({success: false, message :'Missing avatar and/or name_room'})
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


// @route get data
// @disc get room
// @access public

module.exports.get_data = async(rep, res) =>{
    try {
        const room = await Room.find().sort({createAt_room: -1}).limit(20);;
        return res.status(200).json({success: true, message: room})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}



// @route into
// @disc into the room
// @access public

module.exports.intoRoom = async(req, res) =>{
    const {_id, friend, avatar_room, messages_room, name_room, createAt_room} = req.body

    // check simple _id
    if(_id){
        return res.status(400).json({success: false, message :'Missing id room'})
    }
    try {
        let update_room = {
            friend, 
            avatar_room,
            messages_room,
            name_room,
            createAt_room
        }
        updateRoom = await Room.findOneAndUpdate(_id, update_room, {new :true})
        if(!updateRoom){
            return res.status(400).json({success: false, message :'update failed'})
        }
        return res.status(200).json({success: true, message :'update success'})
       
    } catch (error) {
        
    }
}