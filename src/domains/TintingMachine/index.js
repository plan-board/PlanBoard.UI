import React, { useState } from "react";

const TintingMachine = () => {
  const [toggleState, toggleTab] = useState(1);
  return (
    <>
      <div className="main" style={{ marginLeft: "0px" }}>
        <div className="w3-row">
          <span className="main-title">Shalimar Paints Limited</span>
        </div>
        <div className="w3-bar tab-container" style={{ marginTop: "10px" }}>
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6">Customer Mapping</span>
          </div>
          <div
            className={
              toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6">Product Mapping</span>
          </div>
          <div
            className={
              toggleState === 3 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(3)}
          >
            <span className="h6">
              Tinting Machine Dealer Sales Report Month Wise
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TintingMachine;
