const express = require('express');
const router = express.Router();
const AuctionItem = require('../models/auctionItem');
const { addAuctionItem } = require('./controllers/auctionItemController');



// Create a new auction item (from controller function)
router.post('/auction-items', addAuctionItem);

//Not using the below approach and instead using controller because controller separates the route handling logic from the business logic ,easier to understand and maintain independently
//creating a new auction item
// router.post('/auction-items', async(req, res) => {
//     try{
//         const newItem = req.body;
//         const auctionItem = await AuctionItem.create(newItem);
//         res.status(201).json(auctionItem);
//     }
//     catch (err){
//         res.status(500).json({message: 'failed to create auction item.', error: err.message });
//     }
// });

//Get all auction items
router.get('/auction-items', async (req, res) => {
    try{
        const auctionItems = await AuctionItem.find();
        const userCookieEmail = req.cookies.userEmail; // Retrieve the user's email from the cookie
    
        // Iterate through auction items and add "delete" parameter where emails match
        const modifiedAuctionItems = auctionItems.map((item) => {
          if (item.userEmail === userCookieEmail) {
            return { ...item, deleteOption: true };
          }
          return item;
        });
    
        res.json(modifiedAuctionItems);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get auction items.', error:err.message});
    }
});

//Get a signle auction item by ID
router.get('/auction-items/:id', async (req,res) => {
    try{
        const auctionItem = await AuctionItem.findById(req.params.id);
        res.json(auctionItem);
    }
    catch (err) {
        res.status(404).json({message: 'Auction item not found.', error: err.message });
    }
});

//Update an auction item by ID
router.put('/auction-items/:id', async (req,res) => {
    try{
        const updatedItem = req.body;
        const auctionItem = await AuctionItem.findByIdAndUpdate(req.params.id, updatedItem, {
            new: true, // Return the updated document in the response
        });
        res.json(auctionItem);
    }
    catch (err) {
        res.status(404).json({ message: 'Auction item not found.', error: err.message });
      }
    });


// Delete an auction item by ID
router.delete('/auction-items/:id', async (req, res) => {
    try {
      const deletedItem = await AuctionItem.findByIdAndRemove(req.params.id);
      res.json(deletedItem);
    } catch (err) {
      res.status(404).json({ message: 'Auction item not found.', error: err.message });
    }
  });
  
  module.exports = router;