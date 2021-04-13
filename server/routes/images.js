const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.post('/', async (req, res) => {
  const { base64Image, type } = req.body;
  try {
    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      upload_preset:
        type === 'post'
          ? 'roommates-project-posts'
          : 'roommates-project-avatars',
    });
    res.status(200).json(uploadedImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cloudinary Image Upload Failed' });
  }
});

module.exports = router;
