require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const socketManager = require('./socket/socketManager');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => 
  console.log(`Server started on port ${PORT}`)
);

// Socket.io setup
socketManager.init(server);