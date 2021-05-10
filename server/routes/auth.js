const express = require('express');
const router = express.Router();
const passport = require('passport');
// Hashing Password as described here with bcrypt:
// https://github.com/dcodeIO/bcrypt.js#usage---async
const bcrypt = require('bcryptjs');
const requireAuth = require('../middleware/requireAuth');
require('../services/passport')(passport);

// MODELS
const User = require('../models/User');
const Location = require('../models/Location');

// GET auth/currentuser
// returns the user if user is logged in
// @public
router.get('/currentuser', async (req, res) => {
  if (req.user) {
    // res.status(200).json({ loggedIn: true, user: req.user });
    const currentUser = await User.findOne(
      { _id: req.user._id },
      { password: 0 }
    )
      .populate('_location')
      .exec();
    res.status(200).json({ loggedIn: true, user: currentUser });
  } else {
    res.status(200).json({ loggedIn: false, user: {} });
  }
});

// GET auth/logout
// logs out the user
// @public
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.status(200).json({ loggedIn: false, user: {} });
  } else {
    res.status(400).json({ error: 'No User Logged In' });
  }
  // res.redirect('/');
});

// POST auth/login
// Logs in user with username and password using passport service (see services/passport.js)
// @public
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      error: 'Missing Required Information - username, or password',
    });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    // if username or password is incorrect, exit here
    if (!user) {
      // info contains result from local strategy attempt at services/passport.js
      return res.status(404).json(info);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ loggedIn: true, user });
    });
  })(req, res, next);
});

// POST auth/signup
// Signs up user given signup form data
// @public
router.post('/signup', async (req, res) => {
  const { username, password, email, location } = req.body;
  if (!username || !password || !location) {
    res.status(400).json({
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
        city: location.split(',')[0],
        state: location.split(',')[1],
      });
      // location doesn't exist, exit
      if (!userLocation) {
        return res.status(400).json({
          error: 'Location Unsupported',
        });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // create new user
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        _location: userLocation.id,
      });
      await newUser.save();
      // get user with location and log them in
      req.logIn(newUser, async (err) => {
        if (err) throw err;
        const newUserWithLocation = await User.findOne({ _id: req.user._id })
          .populate('_location')
          .exec();
        res.status(200).json({ loggedIn: true, user: newUserWithLocation });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Location Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Username Not Found' });
  }
});

// PATCH auth/updateprofile
// Updates user profile data based on request body
// @private
router.patch('/updateprofile', requireAuth, async (req, res) => {
  const newUserInfo = req.body;
  // make sure request is not empty
  if (!newUserInfo) {
    return res.status(400).json({ error: 'Incorrect Request, Body Missing' });
  }
  // if user wants to update password, hash it

  if (newUserInfo.password) {
    // hash the password
    newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: newUserInfo },
      { new: true }
    )
      .populate('_location')
      .exec();
    res.status(200).json({ loggedIn: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to Update User Profile' });
  }
});

module.exports = router;
