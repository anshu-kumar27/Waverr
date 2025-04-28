const express = require('express')
const { isAuthenticatedUser } = require('../middleware/auth');
const { startCall, callAccept, callReject, callEnd } = require('../controllers/callC');
const router = express.Router();

router.route('/callStart/:id').post(isAuthenticatedUser,startCall);
router.route('/callAccept').put(isAuthenticatedUser,callAccept);
router.route('/callReject').put(isAuthenticatedUser,callReject);
router.route('/callEnd').put(isAuthenticatedUser,callEnd)

module.exports = router;