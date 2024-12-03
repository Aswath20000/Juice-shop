const express = require('express');
const router = express.Router();


const confidentialDocuments = [
  { title: 'Document 1', content: 'confidential document.' },
  { title: 'Document 2', content: 'confidential document.' },
  { title: 'Document 3', content: 'secret information.' },
];


router.get('/', (req, res) => {
  try {
  
    res.json(confidentialDocuments);
  } catch (error) {
    console.error('Error fetching confidential documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

module.exports = router;
