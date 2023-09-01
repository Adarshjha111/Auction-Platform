import React, { useState, useEffect,useRef } from 'react';
import AuctionCard from '../components/AuctionCard';
import '../styles/AuctionListing.css';

const AuctionListing = () => {
  // State to store the fetched auction items
  const [auctionItems, setAuctionItems] = useState([]);
  const hasEffectRun = useRef(false); // Create a ref to track whether the effect has run

  //after deletion of an item call this
  const updateAuctionItems = (itemId) => {
    setAuctionItems(prevAuctionItems => {
      const updatedItems = prevAuctionItems.filter(item => item._id !== itemId);
      return updatedItems;
    });
  };
  
  // Fetch auction items from the backend
  useEffect(() => {
    if (!hasEffectRun.current) {
      // Check if the effect has not run yet
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please join us to explore!");
        window.location.href = '/login'; 
        hasEffectRun.current = true; // Set the ref to true to indicate that the effect has run
        return; // Exit early to prevent the fetch request
      }

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      };

      fetch('http://localhost:8000/auction-items', { headers, credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
          setAuctionItems(data);
        })
        .catch((error) => console.error('Error fetching auction items:', error));
    }
  }, []);
  
  return (
    <div className="container">
      <h1 className="heading">Auction Listing</h1>
      <div className="auction-list">
        {auctionItems.map((item) => (
          <AuctionCard key={item._id || item._doc._id } auctionItem={item} updateAuctionItems={updateAuctionItems}/>
        ))}
      </div>
    </div>
  );
};

export default AuctionListing;
