
const User = require('../models/User')
const cloudinary = require('../helper/imageUpload')

module.exports.update_profile = async(rep, res) =>{
    const {avatar, _id} = rep.body
    try {
        if(!avatar || !_id) {
            return res
            .status(400)
            .json({success: false, message :'Missing  avatar or id'})
        }
        const updateUser = await User.findOneAndUpdate({_id}, {avatar})
        if(!updateUser){
            return res.status(400).json({success: false, message :'update Message failed'})
        }
        return res.status(200).json({success: true, message : updateUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports.get_user = async(req, res) =>{
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
}
module.exports.uploadProfile = async (req, res) => {
    const { _id = null, avatar } = req.body;
    if (!avatar )
      return res
        .status(401)
        .json({ success: false, message: 'unauthorized access!' });
  
    try {
      const result = await cloudinary.uploader.upload(avatar, {
        public_id: `${_id}_profile`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
      console.log(`result.url`, result.url)
       updatedUser = await User.findByIdAndUpdate(
       {_id},
        { avatar: result.url },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, message: 'Your profile has updated! link image: ' + result.url });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'server error, try after some time' });
      console.log('Error while uploading profile image', error.message);
    }
  };
  