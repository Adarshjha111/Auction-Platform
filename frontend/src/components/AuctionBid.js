import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "../styles/AuctionBid.css";

const AuctionDetails = ({ auctionItemId }) => {
  const [auctionItem, setAuctionItem] = useState(null);
  const [biddingAmount, setBiddingAmount] = useState(0); // Default bidding amount
  const [newBiddingAmount, setNewBiddingAmount] = useState(0);
  const [notification, setNotification] = useState(null);
  const [highestBidder, setHighestBidder] = useState(null);
  const [socket, setSocket] = useState(null); // Define a state variable to store the socket instance
  const { id } = useParams(); // Retrieve the ID of the auction item from the URL

  const showBid = (newValue) => {
    // Calculate the new bidding amount
    if (newValue > auctionItem.highestBid) {
      const calculatedBiddingAmount = parseInt(newValue, 10);
      setNewBiddingAmount(calculatedBiddingAmount); // Update the state
    }
  };

  const handleBidInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setBiddingAmount(value); // Update the bidding amount in the state
    showBid(value); // Update the calculated bidding amount
  };

  useEffect(() => {
    // Fetch the auction item details from the backend
    axios
      .get(`http://localhost:8000/auction-items/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAuctionItem(response.data);
        const token = localStorage.getItem("token");
        if (token !== undefined) {
          const socket = io("http://localhost:8000", {
            transports: ["websocket"], // Explicitly use WebSocket transport
            extraHeaders: {
              "x-auth-token": token,
            },
          });

          socket.on("connect", () => {
          });
          socket.on("bidUpdate", (data) => {
            setAuctionItem((prevAuctionItem) => {
              return {
                ...prevAuctionItem,
                highestBid: data.newBidAmount,
                highestBidder: data.highestBidder,
              };
            });
          });
        }

        // Fetch the highest bidder details
        if (response.data.highestBidder) {
          axios
            .get(
              `http://localhost:8000/bids/highest-bidder/${response.data.highestBidder}`,
              {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              }
            )
            .then((bidderResponse) => {
              setHighestBidder(bidderResponse.data.bidderName); // Set the highest bidder's name
            })
            .catch((error) => {
              console.error("Failed to fetch highest bidder details:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch auction item details:", error);
      });
  }, [id, socket]);

  const handleBid = () => {
    // Submit the bid to the backend
    const newBiddingAmount = biddingAmount;

    axios
      .post(
        "http://localhost:8000/bids/submit",
        {
          id,
          amount: newBiddingAmount,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include the JWT token from localStorage
          },
        }
      )
      .then(() => {
        setNotification("Bid placed successfully!");

        // Fetch the updated auction item details from the backend
        axios
          .get(`http://localhost:8000/auction-items/${id}`, {
            headers: {
              "x-auth-token": localStorage.getItem("token"), // Include the JWT token from localStorage
            },
          })
          .then((response) => {
            setAuctionItem(response.data);
          })
          .catch((error) => {
            setNotification("Failed to place bid");
            console.error(
              "Failed to fetch updated auction item details:",
              error
            );
          })
          .finally(() => {
            setBiddingAmount(0); // Reset the biddingAmount to the default value
          });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "Auction has not started yet") {
            setNotification("Auction has not started yet");
          } else if (
            error.response.data.message === "Auction is already over"
          ) {
            setNotification("Auction is already over");
          } else {
            setNotification("Failed to place bid"); // Handle other possible errors
          }
        } else {
          setNotification("Failed to place bid"); // Handle non-400 errors
        }
        //console.error("Failed to submit bid:", error);
      });
  };

  if (!auctionItem) {
    return <div>Loading...</div>;
  }

  const startTime = new Date(auctionItem.startTime);
  const endTime = new Date(auctionItem.endTime);
  return (
    <div className="auction-details-container">
      <h2>{auctionItem.title}</h2>
      <p className="description">Description: {auctionItem.description}</p>
      <p>Start Time: {startTime.toLocaleString("en-IN")}</p>
      <p>Start Bid: {auctionItem.startBid}</p>
      <p>End Time: {endTime.toLocaleString("en-IN")}</p>

      <p className={`highest-bid ${notification ? "fade-animation" : ""}`}>
        Highest Bid: {auctionItem.highestBid} by {auctionItem.highestBidder}
      </p>
      <div className="bid-buttons">
        <button
          onClick={() => {
            setBiddingAmount(auctionItem.highestBid + 100);
            showBid(auctionItem.highestBid + 100); // Call showBid with the increment value
          }}
        >
          Bid +100
        </button>
        <button
          onClick={() => {
            setBiddingAmount(auctionItem.highestBid + 500);
            showBid(auctionItem.highestBid + 500); // Call showBid with the increment value
          }}
        >
          Bid +500
        </button>
        <button
          onClick={() => {
            setBiddingAmount(auctionItem.highestBid + 1000);
            showBid(auctionItem.highestBid + 1000); // Call showBid with the increment value
          }}
        >
          Bid +1000
        </button>
        <button
          onClick={() => {
            setBiddingAmount(10000);
            showBid(10000); // Call showBid with the increment value
          }}
        >
          Bid +10000
        </button>
      </div>
      <div className="bid-input">
        <input
          type="number"
          value={biddingAmount}
          onChange={handleBidInputChange}
        />
        <button onClick={handleBid}>Place Bid</button>
      </div>
      <div>
        <p>Your New Bid Amount Will Be: {newBiddingAmount}</p>
      </div>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default AuctionDetails;
