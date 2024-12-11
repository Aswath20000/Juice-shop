const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const router = express.Router();

// Check if the request is from Burp Suite by checking a custom header
const isBurpSuiteRequest = (req) => {
    return req.headers['x-burp-suite']; // Custom header for Burp Suite requests
};

// Set up multer to handle file uploads
const upload = multer({
    limits: (req, file) => {
        // Check if the request is from Burp Suite
        if (isBurpSuiteRequest(req)) {
            return { fileSize: Infinity }; // Allow unlimited file size for Burp Suite requests
        }
        return { fileSize: 100 * 1024 }; // 100KB limit for normal requests
    },
    fileFilter: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;

        // Only allow PDF files
        if (fileExtension === '.pdf' && mimeType === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'));
        }
    },
});

// Handle file upload in the Express route
router.post('/:username/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        try {
            const { username } = req.params;

            // Handle multer-specific errors
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                // Handle other types of errors (e.g., file validation errors)
                return res.status(500).json({ message: 'Unexpected error during file upload', error: err.message });
            }

            // If no file is uploaded, return an error
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded!' });
            }

            const { originalname, mimetype, buffer } = req.file;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: `User with username "${username}" not found.` });
            }

            // Save the uploaded file in the user's record
            user.files.push({
                name: originalname,
                mimetype,
                data: buffer,
                extension: path.extname(originalname).toLowerCase(),
            });

            // If the request is from Burp Suite, add the "filesize" achievement
            if (isBurpSuiteRequest(req)) {
                // Prevent adding the 'filesize' achievement more than once
                if (!user.achievements.includes('filesize')) {
                    user.achievements.push('filesize');
                }
            }

            // Save the user document with the new file and achievements
            await user.save();

            // Respond with a success message
            res.status(201).json({ message: `File "${originalname}" uploaded successfully for ${username}.` });
        } catch (error) {
            console.error('Error uploading file:', error.message);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });
});

module.exports = router;
