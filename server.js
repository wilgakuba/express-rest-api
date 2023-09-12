const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const router = express.Router();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(400).send('Not found..');
});

const server = app.listen(process.env.PORT || 8001, () => {
  console.log('Server is running on port: 8001');
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client! Its id' + socket.id);
});

mongoose.connect('mongodb://127.0.0.1:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

  
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

