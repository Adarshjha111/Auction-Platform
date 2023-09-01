const AuctionItem = require('../../models/auctionItem');

// Controller function to add a new auction item
const addAuctionItem = async (req, res) => {
  try {
    const newItem = req.body;
    const userEmail = req.cookies.userEmail;
    const userName = req.cookies.userName;
    // Associate the email with the auction item data
    newItem.userEmail = userEmail;
    newItem.userName = userName;
    const auctionItem = await AuctionItem.create(newItem);
    res.status(201).json(auctionItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add auction item.', error: err.message });
  }
};

module.exports = {
  addAuctionItem,
};
