import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import codeBlockRoutes from './routes/codeBlock_route.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET"]
  }
});

//middleware

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Set up routes (only one in this case)
app.use('/api/codeblocks', codeBlockRoutes);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (codeBlockId) => {
    socket.join(codeBlockId);
  });

  socket.on('codeChange', ({ codeBlockId, code }) => {
    socket.to(codeBlockId).emit('codeUpdate', code);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
