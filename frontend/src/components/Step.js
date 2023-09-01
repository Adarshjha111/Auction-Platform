import React from "react";
import "../styles/Step.css";

const Step = ({ number, description }) => {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <div className="step-description">{description}</div>
    </div>
  );
};

export default Step;
