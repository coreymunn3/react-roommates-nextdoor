const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.post('/', async (req, res) => {
  const { base64Image } = req.body;
  try {
    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      upload_preset: 'roommates-project',
    });
    console.log(uploadedImage);
    res.json({ msg: 'YES' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cloudinary Image Upload Failed' });
  }
});

module.exports = router;
