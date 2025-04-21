const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUsersForSideBar } = require('../controllers/sidebarC');
const router = express.Router();

router.route('/allusers').get(isAuthenticatedUser,getUsersForSideBar);

module.exports = router;