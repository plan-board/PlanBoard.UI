import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommonTopSales from "../components/CommonTopSales";
import { Row, Col } from "reactstrap";
import Loader from "../../common/Loader";
import NationalZoneMonthSale from "../components/NationalZoneMonthSale";
import TerritoryMonthWiseSalesReport from "../components/TerritoryMonthWiseSalesReport";
import DealerMonthSale from "../components/DealerMonthSale";

const Segment = () => {
  const { AuthData } = useSelector((state) => state.auth);
  const SegmentData = useSelector((state) => state.auth?.AuthData?.Segment);
  const [toggleState, setToggleState] = useState(1);
  const [selectedSegement, setSelectedSegment] = useState(
    SegmentData ? parseInt(SegmentData[0]?.TerritoryID) : 0
  );
  const [isLoading, setLoading] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const depotMangerDropdown = () => {
    return SegmentData.map((item, index) => (
      <option key={index} value={item?.TerritoryID}>
        {item?.TerritoryName}
      </option>
    ));
  };
  const handleMonthChange = (event) => {
    setSelectedSegment(parseInt(event.target.value));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="main" style={{ marginLeft: "0px" }}>
        <div className="w3-row">
          <span className="main-title">Shalimar Paints Limited</span>
        </div>

        <Row className="card-box  lightblue">
          {" "}
          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            <span style={{ fontWeight: "600" }}>Segment</span>
            <select
              className="form-control"
              value={selectedSegement}
              onChange={handleMonthChange}
            >
              <option value="0">Select Segment</option>
              {SegmentData && depotMangerDropdown()}
            </select>
          </Col>
        </Row>

        {AuthData != null && (
          <CommonTopSales
            actionType={"SH"}
            selectedSegment={selectedSegement}
          />
        )}
        <div id="Wgt_Zone_Id" className="card-box lightblue">
          <div className="tbl-container">
            {AuthData != null && (
              <NationalZoneMonthSale selectedZone={selectedSegement} />
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
              <span className="h6"> Segments Monthly Plan</span>
            </div>
            <div
              className={
                toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
              }
              onClick={() => toggleTab(2)}
            >
              <span className="h6"> Segments Dealer Monthly Plan</span>
            </div>
          </div>

          <div class="w3-row w-100">
            <div className={toggleState === 1 ? "  " : " w3-hide  "}>
              <div>
                <h3>Segments Wise Monthly Plan</h3>
              </div>

              {toggleState === 1 && (
                <TerritoryMonthWiseSalesReport
                  selectedDepot={selectedSegement}
                />
              )}
            </div>
            <div className={toggleState === 2 ? "  " : " w3-hide  "}>
              <div>
                <h3>Segments Dealer Monthly Plan</h3>
              </div>

              {toggleState === 2 && (
                <DealerMonthSale selectedTerritory={selectedSegement} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Segment;
