const express = require('express');
const passport = require('passport');
const router = express.Router();
const sendToken = require('../utils/JWTtoken');

// Step 1: Redirect user to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Step 2: Callback URL handler
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Send JWT after successful login
    sendToken(req.user, 200, res);
    // res.redirect("http://localhost:5173/"); // optional: redirect to frontend

  }
);

module.exports = router;
