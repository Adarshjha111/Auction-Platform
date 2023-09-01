const { ObjectId } = require('mongoose').Types;
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Bid = require('../models/Bid');
const User = require('../models/User');
const auth = require('../middleware/auth');
const AuctionItem = require('../models/auctionItem');
const { notifyBidUpdate } = require('../sockets'); // Import the WebSocket notifier function

// Add validation and authentication middleware as needed

// Route to submit a bid
router.post(
  '/bids/submit',
  auth,
  [
    check('id').notEmpty().withMessage('Auction item ID is required'),
    check('amount').isNumeric().withMessage('Bid amount must be a number'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, amount } = req.body;
    
      // Assuming you have authentication middleware, get the bidder's ID from the authenticated user
      let bidderId = req.user.id;
      let bidder = await User.findById(bidderId);
      let bidderName = bidder.name;

      // Save the bid in the database
      const bid = new Bid({
        bidder,
        auctionItem: id,
        amount,
      });
      await bid.save();

      // Update highestBid 
     
      const auctionItem = await AuctionItem.findById(id);

      const presentTime = new Date(); // Get the current time

      if (presentTime < auctionItem.startTime) {
        return res.status(400).json({ message: 'Auction has not started yet' });
      }

      if (presentTime > auctionItem.endTime) {
        return res.status(400).json({ message: 'Auction is already over' });
      }
      
      //const auctionItem = await req.db.collection('auctionitems').findOne({ _id: ObjectId(id) });
      if (auctionItem.highestBid < amount) {
        auctionItem.highestBid = amount;
        auctionItem.highestBidder = bidderName;
        auctionItem.version += 1; // Increment the version,If another update is attempted on the same document while a previous update is being saved, Mongoose will detect the version difference and prevent overwriting.
        await auctionItem.save();

        // Notify WebSocket clients about the bid update
        notifyBidUpdate(auctionItem._id, amount,  bidderName);
      }
      else {
        return res.status(400).json({ message: 'Bid amount is not higher than current highest bid' });
      }
    
      res.status(201).json({ message: 'Bid submitted successfully', bid });
    } catch (err) {
    console.error('Error while processing bid submission:', err);
      res.status(500).json({ message: 'Failed to submit bid', error: err.message });
    }
  }
);


// Route to get the highest bidder's information
router.get('/bids/highest-bidder/:bidderId', async (req, res) => {
  try {
    const bidderId = req.params.bidderId;

    // Assuming you have a User model to store user information
    const bidder = await User.findById(bidderId);

    if (!bidder) {
      return res.status(404).json({ message: "Bidder not found" });
    }

    // Return the bidder's information
    res.status(200).json({
      bidderName: bidder.email, // Adjust the field for name
    });
  } catch (err) {
    console.error('Error while fetching bidder information:', err);
    res.status(500).json({ message: 'Failed to fetch bidder information', error: err.message });
  }
});


module.exports = router;
