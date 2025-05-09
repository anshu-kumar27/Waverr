const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUsersForSideBar, getUsersForHomeSideBar, findFriends, findStatusUsers, sendFriendReq, removeFriendReq, fetchNotifications, updateFriendReq } = require('../controllers/sidebarC');
const router = express.Router();

router.route('/allusers').get(isAuthenticatedUser,getUsersForSideBar);
router.route('/addFriends').get(isAuthenticatedUser, getUsersForHomeSideBar )
router.route('/fetchFriends').get(isAuthenticatedUser,findFriends)
router.route('/message/story').get(isAuthenticatedUser,findStatusUsers)
router.route('/sendRequest/:id').post(isAuthenticatedUser,sendFriendReq)
router.route('/cancelRequest/:id').delete(isAuthenticatedUser,removeFriendReq)
router.route('/fetchNotification').get(isAuthenticatedUser,fetchNotifications)
router.route('/updateFriend/:id').put(isAuthenticatedUser,updateFriendReq)

module.exports = router;