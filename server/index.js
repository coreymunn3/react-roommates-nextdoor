const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const connectDb = require('./config/connectDb');
require('dotenv').config();

// conenct mongoDb
const connection = connectDb(process.env.MONGO_URI);
// create express app
const app = express();
// MIDDLEWARE ===========================================
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secretcode',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // one week, expressed in ms
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ROUTES ===========================================

app.get('/', (req, res) => {
  res.status(200).json({ message: 'App Running' });
});

app.use('/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/images', require('./routes/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT}`));

// NOTES ============================================================
// using CORS middleware setup to enable sending axios requests with credentials
// https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
