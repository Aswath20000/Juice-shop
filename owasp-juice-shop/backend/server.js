const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend to access
app.use(bodyParser.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const basketRoutes = require('./routes/basketRoutes');
const fileRoutes = require('./routes/fileRoutes');
const confidentialDocumentsRoutes = require('./routes/confidentialDocumentsRoutes'); // New route
const scoreboardRoutes = require('./routes/scoreboardRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/confidential-documents', confidentialDocumentsRoutes); // Register the new route
app.use('/api/scoreboard', scoreboardRoutes);
app.use('api/files',fileRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
