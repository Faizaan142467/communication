require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Define shopStatus variable
let shopStatus = false; // Default status (false = closed)

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { shopStatus });
});

app.get('/admin', (req, res) => {
    res.render('admin', { shopStatus });
});

app.post('/toggle-shop-status', (req, res) => {
    shopStatus = req.body.currentStatus === 'true' ? false : true;
    io.emit('updateShopStatus', shopStatus);
    res.redirect('/admin');
});

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('updateShopStatus', shopStatus);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
