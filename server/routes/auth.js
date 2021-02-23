const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Location = require('../models/Location');
require('../services/passport')(passport);

// Hashing Password as described here:
// https://github.com/dcodeIO/bcrypt.js#usage---async

router.get('/currentuser', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'No Current User' });
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) res.status(400).json({ message: 'Username Does Not Exist' });
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Logged In', user });
    });
  })(req, res, next);
});

router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ message: 'User Already Exists' });
    }
    // get location
    try {
      const userLocation = await Location.findOne({
        city: req.body.city,
        state: req.body.state,
      });
      // location doesn't exist, exit
      if (!userLocation) {
        return res.status(400).json({
          message: 'We Dont Support This Market',
        });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // create new user
      const newUser = new User({
        username: req.body.username,
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
      res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.status(200).json({ message: 'You are now logged out' });
  } else {
    res.status(400).json({ message: 'No User Logged In' });
  }
  // res.redirect('/');
});

module.exports = router;
