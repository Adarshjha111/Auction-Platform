const mongoose = require('mongoose');

const  auctionItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type:String, required: true},
    startingBid: {type:Number, required: true},
    startTime: {type:Date, required: true},
    endTime: { type: Date, required: true },
  highestBid: { type: Number, default: 0 },
  version: { type: Number, default: 0, },
  highestBidder: { type: String, default: null },
  userEmail:{type: String},
  userName:{type: String},
});

const AuctionItem = mongoose.model('AuctionItem',auctionItemSchema);

module.exports = AuctionItem;
