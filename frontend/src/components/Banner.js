import React from "react";
import { Link } from "react-router-dom";
import "../styles/Banner.css"; 

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>
          <Link to="/auctions">
            Discover Thrilling Auctions on Your own Auction Platform
          </Link>
        </h1>
      </div>
    </section>
  );
};

export default Banner;
