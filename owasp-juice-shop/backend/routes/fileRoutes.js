const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const router = express.Router();

// Configure Multer with Limits and File Filtering
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit: 10MB
    fileFilter: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;

        // Allow only PDF files
        if (fileExtension === '.pdf' && mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'));
        }
    },
});

// POST: Upload File
router.post('/:username/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        try {
            const { username } = req.params;
            const { fileExtension } = req.body; // Extract file extension

            console.log(`File extension received: ${fileExtension}`); // Log the received extension

            // Multer error handling
            if (err instanceof multer.MulterError || err?.message === 'Only PDF files are allowed!') {
                return res.status(400).json({ message: 'Only PDF files are allowed!' });
            } else if (err) {
                return res.status(500).json({ message: 'Unexpected error during file upload.', error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded!' });
            }

            const { originalname, mimetype, buffer } = req.file;

            // Check if user exists
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: `User with username "${username}" not found.` });
            }

            // Store file in MongoDB
            user.files.push({
                name: originalname,
                mimetype,
                data: buffer,
                extension: fileExtension, // Store the extension if needed
            });

            await user.save();

            res.status(201).json({ message: `File "${originalname}" uploaded successfully for ${username}.` });
        } catch (error) {
            console.error('Error uploading file:', error.message);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });
});

module.exports = router;
