const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const http = require('http'); //The http module is used to create an HTTP server that works with Socket.IO.
const { initWebSocketServer } = require('./sockets'); // Import the WebSocket initialization function

const app = express();
//The app object created by Express.js is responsible for defining the routing, handling middleware, and managing the behavior of your application based on the incoming HTTP requests.
const mongooseConnect = require('./db/connect');
const auctionItemRoutes = require('./routes/auctionItemRoutes');
const authRoutes = require('./routes/authRoutes');
const bidRoutes = require('./routes/bidRoutes')
const port = process.env.PORT || 8000;
const auth = require('./middleware/auth')

// Parse JSON data
app.use(express.json());

app.use(cookieParser());


//CORS (Cross-Origin Resource Sharing) policy, a security feature implemented by web browsers to prevent unauthorized access to resources from different origins (i.e., different domains or ports).
//since frontend of port 3000 and backend on port 8000
//app.use(cors());
//const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST','DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(authRoutes);
app.use(auth);

// Use auction item routes
app.use(auctionItemRoutes);

app.use(bidRoutes);

// Create an http server instance
//When you pass the app object to http.createServer, you're essentially telling Node.js to use Express to handle incoming HTTP requests.
const server = http.createServer(app);

// Initialize the WebSocket server using the http server and associates it with the same server that your app is running on.
initWebSocketServer(server);


// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//Listen on app: When your application is relatively simple and doesn't involve WebSocket or any other protocol besides HTTP
// app.listen(port, () => {
//   console.log(`Hello Adarsh, Your Node server is running on port ${port}`);
// });

//Listen on server: When your application needs to support additional protocols or features, such as WebSocket or other real-time communication protocols.
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});