const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET api/posts
// returns all posts from a user
// @private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ _user: req.user });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot find posts by this user' });
  }
});

// GET api/posts/location/:location
// returns all posts from current city
// @private
router.get('/location/:locationId', async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const posts = await Post.find({ _location: locationId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'No Location with that ID' });
  }
});

// GET api/posts/post/:post
// returns single post matching postId passed in params
// @private
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'No Post with that ID' });
  }
});

// POST api/posts
// allows user to submit a post
// @private
router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      streetAddress: req.body.streetAddress,
      housingType: req.body.housingType,
      numberOfCohabitants: req.body.numberOfCohabitants,
      hasPrivateBath: req.body.hasPrivateBath,
      hasFurnishedRoom: req.body.hasFurnishedRoom,
      hasParkingIncluded: req.body.hasParkingIncluded,
      hasWasherDryerInUnit: req.body.hasWasherDryerInUnit,
      hasPetsAllowed: req.body.hasPetsAllowed,
      hasWifi: req.body.hasWifi,
      hasCableTelevision: req.body.hasCableTelevision,
      hasKitchenAccess: req.body.hasKitchenAccess,
      hasPoolAccess: req.body.hasPoolAccess,
      hasDrugTolerantCohabitants: req.body.hasDrugTolerantCohabitants,
      _user: req.user._id,
      _location: req.user._location,
    });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot POST' });
  }
});

module.exports = router;
