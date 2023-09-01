const socketIo = require('socket.io');
const auth = require('./middleware/auth');

let io; // Declare the io variable to store the Socket.IO instance

// Initialize the WebSocket server
function initWebSocketServer(server) {
  try{
  io = require("socket.io")(server, {
    cors: {
      origin: 'http://localhost:3000', // Specify the allowed origin for WebSocket connections
      methods: ["GET", "POST"],
      credentials: true,
    },
    debug: true, // Enable debugging
  });

  }
  catch (error) {
    console.error("Error in function initwebsocket:", error);
  }
}

// Notify clients about bid updates
function notifyBidUpdate(auctionItemId, newBidAmount, highestBidder) {
  
  try{
    io.emit('bidUpdate', { auctionItemId, newBidAmount, highestBidder });
    }

  catch (error){
    console.error('error notifybidupdate', error);
  }
}


  


module.exports = {
  initWebSocketServer,
  notifyBidUpdate,
};
