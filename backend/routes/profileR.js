const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { updateProfile, handleProfileUpdate, selectedProfile } = require('../controllers/profileC');
const router = express.Router();

const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

router.route('/updateMe').get(isAuthenticatedUser,updateProfile);
router.route('/updateMe').post(isAuthenticatedUser,upload.single('avatar'),handleProfileUpdate)
router.route('/profile/find/:id').get(isAuthenticatedUser,selectedProfile)

module.exports = router;