const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const axios = require('axios');
const geocodeAPIkey = process.env.GEOCODE_API_KEY;
const requireAuth = require('../middleware/requireAuth');

// GET api/posts
// returns all posts from a user
// @private
router.get('/', requireAuth, async (req, res) => {
  try {
    const posts = await Post.find({ _user: req.user }).populate('_user').exec();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot find posts by this user' });
  }
});

// GET api/posts/location/:location
// returns all posts from current city
// @private
router.get('/location/:locationId', requireAuth, async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const posts = await Post.find({ _location: locationId })
      .populate('_user')
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'No Location with that ID' });
  }
});

// POST api/posts
// allows user to submit a post
// @private
router.post('/', requireAuth, async (req, res) => {
  const { zipCode, streetAddress, featureImage, ...postData } = req.body;
  console.log(postData);
  console.log(featureImage);
  // Get Lat Lon from google reverse geocoding API
  try {
    const { data: geocoded } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress}+${zipCode}&key=${geocodeAPIkey}`
    );
    // create the post and save to DB
    try {
      const newPost = new Post({
        ...postData,
        streetAddress,
        zipCode,
        featureImage,
        geographicCoordinates: geocoded.results[0].geometry.location,
        _user: req.user._id,
        _location: req.user._location,
      });
      const post = await newPost.save();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Cannot POST' });
    }
  } catch (error) {
    console.log(error.response);
    res
      .status(500)
      .json({ error: 'Error Attempting to Geocode', message: error });
  }
});

// GET api/posts/:postId
// returns single post matching postId passed in params
// @private
router.get('/:postId', requireAuth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId })
      .populate('_location')
      .populate('_user')
      .exec();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'No Post with that ID' });
  }
});

// EDIT (patch) api/posts/:postId
// Updates post at postId with body data
// @private
router.patch('/:postId', requireAuth, async (req, res) => {
  const postId = req.params.postId;
  // required in req.body: _user field
  const postContent = req.body;
  // make sure user calling route owns the post
  if (postContent._user._id !== req.user._id.toString()) {
    return res.status(401).json({ error: 'Unauthorized for Post Editing' });
  }
  // update the post with relevant body data
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: postContent },
      { new: true }
    )
      .populate('_user')
      .exec();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to Update Post' });
  }
});

// DELETE (patch) api/posts/:postId
// Deletes a post with id postId
// @private
router.delete('/:postId', requireAuth, async (req, res) => {
  const postId = req.params.postId;
  // delete document if id matches and user matches posting user
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      _user: req.user,
    });
    res.status(200).json({ _id: deletedPost._id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Post Not Found or Unable to Delete' });
  }
});

// PATCH api/posts/:postId/like
// incriments the likes of a post by 1 and adds user to likedBy array
// @private
router.patch('/:postId/like', requireAuth, async (req, res) => {
  const postId = req.params.postId;
  // update post like count & likedBy array
  try {
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postId,
        likedBy: { $nin: req.user._id },
      },
      {
        $inc: { likeCount: 1 },
        $push: { likedBy: req.user._id },
      },
      { new: true }
    )
      .populate('_user')
      .exec();
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ error: 'Unable to Like Post' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to Find or Like Post' });
  }
});
// ==============================================================
// NOTES: this works but inefficient
// const post = await Post.findOne({ _id: postId });
//     post.likeCount += 1;
//     await post.save();
// why we don't do this:
// https://stackoverflow.com/questions/22278761/mongoose-difference-between-save-and-using-update/22278847#:~:text=update()%20is%20server%20side.&text=Some%20differences%3A,new%20document)%20or%20an%20update%20.
// ==============================================================

// PATCH api/posts/:postId/unlike
// decrements the likes of a post by 1 and removes user from likedBy array
// @private
router.patch('/:postId/unlike', requireAuth, async (req, res) => {
  const postId = req.params.postId;
  // update post like count & likedBy array
  try {
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postId,
        likedBy: { $in: req.user._id },
      },
      {
        $inc: { likeCount: -1 },
        $pull: { likedBy: req.user._id },
      },
      { new: true }
    )
      .populate('_user')
      .exec();
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ error: 'Unable to Unlike Post' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to Find or Unlike Post' });
  }
});
module.exports = router;
