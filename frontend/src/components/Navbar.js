import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token'); //!! is a shorthand way to convert a value to its boolean representation

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Online Auction Platform
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/auctions">
              Auction Listings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-auction">
              Add Auction Item
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
            <Link className="nav-link" to="#" onClick={handleLogout}>
              Logout
            </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

