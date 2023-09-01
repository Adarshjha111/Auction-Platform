import React from "react";
import Banner from "../components/Banner"; 
import Step from "../components/Step"; 
import "../styles/Home.css"; 

const Home = () => {

  const buyItemSteps = [
    { number: 1, description: "Find the item you are looking to buy" },
    { number: 2, description: "Check the time at which the auction will start" },
    { number: 3, description: "Be present when the auction starts" },
    { number: 4, description: "Start bidding to achieve the highest bid and purchase the item"},
    { number: 5, description: "At the end of the auction, if you are the highest bidder, wait for further actions from our side. The seller will contact you shortly."},
  ];

  const sellItemSteps = [
    { number: 1, description: "Go to add-auction item page" },
    { number: 2, description: "Fill the required details for the item you want to auction" },
    { number: 3, description: "Be present when the auction starts" },
    { number: 4, description: "After the completion will will contact you to complete the transaction"},
  ];



  return (
    <div className="home-page">
      <Banner />

      <section className="how-it-works">
  <div className="how-it-works-container">
    <div className="how-it-works-section">
      <h2>How It Works - Buy Item</h2>
      <div className="steps">
        {buyItemSteps.map((step,index) => (
          <Step key={index} description={step.description} />
        ))}
      </div>
    </div>

    <div className="how-it-works-sell-section">
    <div className="how-it-works-section">
      <h2>How It Works - Sell Items</h2>
      <div className="steps">
        {sellItemSteps.map((step,index) => (
          <Step  key={index} description={step.description} />
        ))}
      </div>
    </div>
    </div>
  </div>
</section>

      
    </div>
  );
};

export default Home;
