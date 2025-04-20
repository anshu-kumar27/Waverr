const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true,
    }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    require('./config/passport'); // after express-session, before routes
    app.use(passport.initialize());
    app.use(passport.session());

//Route imports for user
const users = require('./routes/userR');
app.use('/api/v1',users)

const googleAuthRoutes = require('./routes/authR'); // or whatever your file is
app.use('/', googleAuthRoutes); // 👈 mounts all routes under /auth

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
