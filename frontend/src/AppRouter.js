import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuctionListing from './pages/AuctionListing';
import NotFound from './pages/NotFound';
import AddAuctionItem from './pages/AddAuctionItem';
import Navbar from './components/Navbar';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import AuctionBid from './components/AuctionBid';

const AppRouter = () => {
  return (
    
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<AuctionListing />} />
        <Route path="/auctions/:id" element={<AuctionBid />} />
        <Route path="/add-auction" element={<AddAuctionItem />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
