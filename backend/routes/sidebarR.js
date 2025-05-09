const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUsersForSideBar, getUsersForHomeSideBar, findFriends, findStatusUsers } = require('../controllers/sidebarC');
const router = express.Router();

router.route('/allusers').get(isAuthenticatedUser,getUsersForSideBar);
router.route('/addFriends').get(isAuthenticatedUser, getUsersForHomeSideBar )
router.route('/fetchFriends').get(isAuthenticatedUser,findFriends)
router.route('/message/story').get(isAuthenticatedUser,findStatusUsers)

module.exports = router;