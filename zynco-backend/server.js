const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

//test
app.get("/", (req, res) => {
    res.send("Welcome to Zynco APP");
  });
  

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notifications', require('./routes/notifications'));

// Socket.io
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('joinRoom', (eventId) => {
      socket.join(eventId);
    });
  
    socket.on('chatMessage', (message) => {
      io.to(message.eventId).emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



