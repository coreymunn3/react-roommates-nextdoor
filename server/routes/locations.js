const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.get('/', (req, res) => {
  res.send('Locations Here');
});

router.post('/', async (req, res) => {
  try {
    // try to locate existing location
    const loc = await Location.findOne({
      city: req.body.city,
      state: req.body.state,
    });
    // location already exists
    if (loc) {
      res.status(400).json({ message: 'Locaiton Already Exists' });
    }
    // location doesn't exist, create one
    else {
      const newLocation = new Location({
        city: req.body.city,
        state: req.body.state,
      });
      await newLocation.save();
      res.status(200).json(newLocation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
