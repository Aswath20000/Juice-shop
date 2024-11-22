const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const router = express.Router();

// Configure Multer with Limits
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// POST: Upload File
router.post('/:username/upload', upload.single('file'), async (req, res) => {
  try {
    const { username } = req.params;

    console.log('Received username:', username);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Superficial Validation: Check only the MIME type and extension
    const fileExtension = path.extname(originalname).toLowerCase();
    if (fileExtension !== '.pdf' || mimetype !== 'application/pdf') {
      // Pretend this check is secure but still allow storage for testing
      console.log(`Rejected: ${originalname} with MIME type ${mimetype}`);
    } else {
      console.log(`Accepted: ${originalname} with MIME type ${mimetype}`);
    }

    // Store the file in MongoDB regardless of content
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User with username "${username}" not found.` });
    }

    user.files.push({
      name: originalname,
      mimetype,
      data: buffer,
    });
    console.log(`File "${originalname}" added to user "${username}" files array.`);
    

    await user.save();

    res.status(201).json({ message: `File "${originalname}" uploaded successfully for ${username}` });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

module.exports = router;
