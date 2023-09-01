import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuctionCard.css'; 
import deleteButton from '../images/deleteButton.png';

const AuctionCard = ({ auctionItem,updateAuctionItems }) => {
  const {deleteOption:canDelete} = auctionItem;
  const { _id, title, description, startingBid,userEmail,userName} = auctionItem._doc || auctionItem;
  const token = localStorage.getItem('token'); 
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': token, 
  };

  const handleDelete = async (itemId) => {
    try {
      const shouldDelete = window.confirm(`Are you sure you want to delete: ${title}`);
      if (shouldDelete) {
      const response = await axios.delete(`http://localhost:8000/auction-items/${itemId}`, { headers });
      updateAuctionItems(itemId);
    }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Seller: {userName}</p>
        <p className="card-text">Email: {userEmail}</p>
        <p className="card-text">Starting Bid: ${startingBid}</p>
        {canDelete && (
        <div className="delete-icon-container">
          <img
            src={deleteButton}
            alt="Delete"
            className="delete-icon"
            onClick={() => handleDelete(_id)}
          />
        </div>
      )}
        <Link
          to={`/auctions/${_id}`}
          className="bid-button"
          headers={headers}
        >
          Place Bid
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
