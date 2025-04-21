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
    origin: 'http://localhost:5173',
    credentials: true,
    }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    require('./config/passport');
    app.use(passport.initialize());
    app.use(passport.session());

//Route imports for user
const users = require('./routes/userR');
app.use('/api/v1',users)

// google routes
const googleAuthRoutes = require('./routes/authR');
app.use('/', googleAuthRoutes); 

// sidebar routes
const sidebarRoutes = require('./routes/sidebarR');
app.use('/api/v1',sidebarRoutes);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
