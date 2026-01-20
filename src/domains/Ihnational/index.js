import React, { useState, useEffect, useRef } from "react";
import AllFigureText from "../components/AllFigureText";
import CommonTopSales from "../components/CommonTopSales";
import { useSelector, useDispatch } from "react-redux";
import NationalZoneMonthSale from "../components/NationalZoneMonthSale";
import DealerMonthSale from "../components/DealerMonthSale";
const Ihnational = () => {
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="main" style={{ marginLeft: "0px" }}>
        <div className="w3-row">
          <span className="main-title">
            Shalimar Paints Limited <AllFigureText />
          </span>
        </div>
        <CommonTopSales actionType="IH" selectedSegment={selectedSegment} />
        <div id="Wgt_Zone_Id" className="card-box lightblue">
          <h4>Segment Wise Monthly Plan / Achievement</h4>
          <div className="tbl-container">
            {AuthData != null && (
              <NationalZoneMonthSale selectedZone={selectedSegment} />
            )}
          </div>
        </div>
        <div class="card-box lightblue">
          <div className="w3-bar tab-container">
            <div
              className={
                toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
              }
              onClick={() => toggleTab(1)}
            >
              <span className="h6"> Segments Dealer Monthly Plan</span>
            </div>
          </div>
          <div class="w3-row w-100">
            <div className={toggleState === 1 ? "  " : " w3-hide  "}>
              <div>
                <h3>Segments Dealer Monthly Plan</h3>
              </div>

              {toggleState === 1 && (
                // <DealerMonthSale selectedTerritory={selectedSegement} />
                <DealerMonthSale selectedTerritory={0} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ihnational;
