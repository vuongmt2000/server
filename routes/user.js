const express = require('express');
const router = express.Router()
const userController = require('../controllers/user.controller')
const multer = require('multer');
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};
const uploads = multer({ storage, fileFilter });
// @route get data
// @disc get user
// @access public

router.post('/', userController.get_user)


router.put('/update_user', userController.update_profile)
router.post('/upload-profile',uploads.single('profile'),userController.uploadProfile);


module.exports = router