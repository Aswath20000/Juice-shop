const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(bodyParser.json());


const userRoutes = require('./routes/userRoutes');
const basketRoutes = require('./routes/basketRoutes');
const fileRoutes = require('./routes/fileRoutes');
const confidentialDocumentsRoutes = require('./routes/confidentialDocumentsRoutes'); 
const scoreboardRoutes = require('./routes/scoreboardRoutes');
const feedbackRoutes = require('./routes/filesizeRoute');

app.use('/api/feedback', feedbackRoutes);



app.use('/api/users', userRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/confidential-documents', confidentialDocumentsRoutes); 
app.use('/api/scoreboard', scoreboardRoutes);
app.use('api/files',fileRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
