const express = require('express');
const router = express.Router();
const passport = require('passport');
// Hashing Password as described here with bcrypt:
// https://github.com/dcodeIO/bcrypt.js#usage---async
const bcrypt = require('bcryptjs');

// MODELS
const User = require('../models/User');
const Location = require('../models/Location');
require('../services/passport')(passport);

// GET auth/currentuser
// returns the user if user is logged in
// @public
router.get('/currentuser', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ error: 'No Current User' });
  }
});

// POST auth/login
// Logs in user with username and password using passport service (see services/passport.js)
// @public
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) res.status(400).json({ error: 'Username Does Not Exist' });
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ status: 'Logged In', user });
    });
  })(req, res, next);
});

// POST auth/signup
// Signs up user given signup form data
// @public
router.post('/signup', async (req, res) => {
  const { username, password, email, city, state } = req.body;
  if (!username || !password || !city || !state) {
    res
      .status(400)
      .json({
        error:
          'Missing Required Information - username, password, city, or state',
      });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: 'User Already Exists' });
    }
    // get location
    try {
      const userLocation = await Location.findOne({
        city: city,
        state: state,
      });
      // location doesn't exist, exit
      if (!userLocation) {
        return res.status(400).json({
          error: 'We Dont Support This Market',
        });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // create new user
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: req.body.email,
        _location: userLocation.id,
      });
      await newUser.save();
      // log user in after signup
      req.logIn(newUser, (err) => {
        if (err) throw err;
        res.status(200).json({ status: 'logged in', newUser });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Cannot Find Location' });
    }
  } catch (error) {
    console.log({ error: 'Cannot find Username' });
    res.status(500).json(error);
  }
});

// GET auth/logout
// logs out the user
// @public
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.status(200).json({ message: 'You are now logged out' });
  } else {
    res.status(400).json({ error: 'No User Logged In' });
  }
  // res.redirect('/');
});

module.exports = router;
