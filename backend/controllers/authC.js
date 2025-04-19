const passport = require('passport');
const UserM = require('../models/userM');
const sendToken = require('../utils/JWTtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process?.env?.CLIENTID ?? '',
    callbackURL: process?.env?.CALLBACKURL ?? '',
    clientSecret: process?.env?.CLIENTSECRET ?? '',
    passReqToCallback: false,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const { email, sub, name, picture } = profile._json; // Get user details from Google profile

            // Search for user by googleId
            let user = await UserM.findOne({ googleId: sub });

            if (!user) {
                // If user doesn't exist, create a new user
                user = await UserM.create({
                    name,
                    email,
                    googleId: sub,
                    profile: {
                        avatar: {
                            public_id:"googleId",
                            url: picture, // Google provides avatar URL
                        },
                    },
                    authProvider: 'google',
                });
            }

            // Return the user object
            sendToken(user,201,res);
        } catch (error) {
            return next(new ErrorHandler(`Something went wrong with google auth \n\nError: ${error} `,500))
        }
    }
))
