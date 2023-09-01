const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  auctionItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionItem',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
