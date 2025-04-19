const express = require('express');
const { registerUser, loginUser, logout, forgotpassword, resetPassword, getUserDetails,updatePassword, updateUserProfiles, getAllUsers, getSingleuser, deleteUser, updateProfile } = require('../controllers/userC');
const {isAuthenticatedUser, authorizedRoles} = require('../middleware/auth')
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateUserProfiles);


// routes for admin
router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleuser);
router.route("/admin/updateuser/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProfile);
router.route("/admin/deleteuser/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser);
module.exports = router;
