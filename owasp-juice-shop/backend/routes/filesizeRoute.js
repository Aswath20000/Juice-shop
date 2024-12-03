const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const router = express.Router();

// Configure multer to accept PDF files with a size limit of 200KB
const upload = multer({
    limits: { fileSize: 200 * 1024 },  // 200KB size limit
    fileFilter: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;

        // Allow only PDF files
        if (fileExtension === '.pdf' && mimeType === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'));
        }
    },
});

// Endpoint for file upload
router.post('/:username/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        try {
            const { username } = req.params;

            // Check for file upload errors
            if (err instanceof multer.MulterError || err?.message === 'error') {
                return res.status(400).json({ message: 'error' });
            } else if (err) {
                return res.status(500).json({ message: 'Unexpected error during file upload.', error: err.message });
            }

            // No file uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded!' });
            }

            const { originalname, mimetype, buffer } = req.file;

            // Find the user by username
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: `User with username "${username}" not found.` });
            }

            // Add the file to the user's files section in MongoDB
            user.files.push({
                name: originalname,
                mimetype,
                data: buffer,
                extension: path.extname(originalname).toLowerCase(),
            });

            // Save the user document with the new file
            await user.save();

            // Send a success response
            res.status(201).json({ message: `File "${originalname}" uploaded successfully for ${username}.` });
        } catch (error) {
            console.error('Error uploading file:', error.message);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });
});

module.exports = router;
