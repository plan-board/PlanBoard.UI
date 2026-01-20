import React, { useState, useEffect } from "react";
// import NewProductPlanningReport from "./components/newProductPlanning";
import TerritoryMasterReport from "./components/TerritoryMasterReport";
import DealerPotentialReport from "./components/DealerPotentialReport";
import DealerMasterReport from "./components/DealerMasterReport";
import VisitPlanPurposeReport from "./components/VisitPlanReport";
import RetailBuyTrendReport from "./components/RetailerBuyTrend";
import { Button } from "reactstrap";
import DealerVsActPanWiseReport from "./components/DealerVsActPanWiseReport";
import SysSuggestPlaWiseReport from "./components/SysSuggestPlaWiseReport";
import DealerWiseMarketSecReport from "./components/DealerWiseMarketSecReport";

const Reports = () => {
  const [toggleState, setToggleState] = useState(2);
  const [pageIndex, setPageIndex] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const prevpageChange = () => {
    setPageIndex(1);
    toggleTab(0);
  };

  const nextPageChange = () => {
    setPageIndex(2);
    toggleTab(0);
  };
  return (
    <>
      <div className="main" style={{ marginLeft: "0px" }}>
        <div className="w3-row">
          <span className="main-title">Shalimar Paints Limited</span>
          <span style={{ float: "right" }}>
            {pageIndex === 1 ? (
              <Button
                style={{
                  color: "Green",
                  background: "#fff",
                  fontWeight: "600",
                  border: "none",
                }}
                onClick={() => nextPageChange()}
              >
                {"Click to See Remaining Tabs >>>"}
              </Button>
            ) : (
              <Button
                style={{
                  color: "Green",
                  background: "#fff",
                  fontWeight: "600",
                  border: "none",
                }}
                onClick={() => prevpageChange()}
              >
                {"<<< Go Back"}
              </Button>
            )}
          </span>
        </div>
        <div className="w3-bar tab-container" style={{ marginTop: "10px" }}>
          {pageIndex === 1 && (
            <>
              {/* <div
                className={
                  toggleState === 1
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(1)}
              >
                <span className="h6"> New Product Planning </span>
              </div> */}
              <div
                className={
                  toggleState === 2
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(2)}
              >
                <span className="h6">Territory master</span>
              </div>
              <div
                className={
                  toggleState === 3
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(3)}
              >
                <span className="h6">Dealer Potential</span>
              </div>
              <div
                className={
                  toggleState === 4
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(4)}
              >
                <span className="h6">Dealer Master</span>
              </div>
              <div
                className={
                  toggleState === 5
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(5)}
              >
                <span className="h6">Retailer Buying trend</span>
              </div>
              <div
                className={
                  toggleState === 6
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(6)}
              >
                <span className="h6">Visit Plan report</span>
              </div>
              {/* <div
                className={
                  toggleState === 7
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(7)}
              >
                <span className="h6">User Login History</span>
              </div> */}
              <div
                className={
                  toggleState === 8
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(8)}
              >
                <span className="h6">Dealer Plan vs Ach Month wise</span>
              </div>
            </>
          )}
          {pageIndex === 2 && (
            <>
              <div
                className={
                  toggleState === 9
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(9)}
              >
                <span className="h6">Sys sugg. plan Month wise</span>
              </div>
              <div
                className={
                  toggleState === 10
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(10)}
              >
                <span className="h6">Dealer wise Market Sector sale</span>
              </div>
              {/* <div
                className={
                  toggleState === 11
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(11)}
              >
                <span className="h6">Bill Wise Report</span>
              </div>
              <div
                className={
                  toggleState === 12
                    ? "w3-button tab tab-active"
                    : "w3-button tab"
                }
                onClick={() => toggleTab(12)}
              >
                <span className="h6">Town Master Sales report</span>
              </div> */}
            </>
          )}
        </div>
        <div class="w-100">
          {/* {toggleState === 1 && (
            <NewProductPlanningReport toggleState={toggleState} />
          )} */}
          {toggleState === 2 && (
            <TerritoryMasterReport toggleState={toggleState} />
          )}
          {toggleState === 3 && (
            <DealerPotentialReport toggleState={toggleState} />
          )}
          {toggleState === 4 && (
            <DealerMasterReport toggleState={toggleState} />
          )}
          {toggleState === 5 && (
            <RetailBuyTrendReport toggleState={toggleState} />
          )}
          {toggleState === 6 && (
            <VisitPlanPurposeReport toggleState={toggleState} />
          )}
          {/* {toggleState === 7 && "shankar6"} */}
          {toggleState === 8 && (
            <DealerVsActPanWiseReport toggleState={toggleState} />
          )}
          {toggleState === 9 && (
            <SysSuggestPlaWiseReport toggleState={toggleState} />
          )}
          {toggleState === 10 && (
            <DealerWiseMarketSecReport toggleState={toggleState} />
          )}
        </div>
      </div>
    </>
  );
};
export default Reports;



// fulladdress	city	postalcode	district	division	telephone	telephone2	parentdalercode	statename