import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Online Auction Platform. All rights reserved.</p>
        <p>
          Designed by <a href="https://in.linkedin.com/in/adarsh-jha-947562265">Adarsh Jha</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
