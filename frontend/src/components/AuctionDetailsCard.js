import React from 'react';

const AuctionDetailsCard = ({ auctionItem }) => {
  const { title, description, startingBid, startTime, endTime } = auctionItem;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Starting Bid: ${startingBid}</p>
        <p className="card-text">Start Time: {new Date(startTime).toLocaleString()}</p>
        <p className="card-text">End Time: {new Date(endTime).toLocaleString()}</p>
        {/* Add additional details or buttons as needed */}
      </div>
    </div>
  );
};

export default AuctionDetailsCard;
