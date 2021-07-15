const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const requireAuth = require('../middleware/requireAuth');

// POST api/images
// Uploads base64 Image to Cloudinary, returns the image in response
// @private
router.post('/', requireAuth, async (req, res) => {
  const { base64Image, type } = req.body;
  try {
    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      upload_preset:
        type === 'post'
          ? 'roommates-project-posts'
          : 'roommates-project-avatars',
      overwrite: false,
    });
    res.status(200).json(uploadedImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cloudinary Image Upload Failed' });
  }
});

module.exports = router;
