import { useState } from "react";
import { Row, Col } from "reactstrap";
import TotalPlan from "../../images/totalplan.png";
import AchIcon from "../../images/achievement.png";
import dealerIcon from "../../images/newDealer.jpg";
import moneyIcon from "../../images/money.png";
import { Link, useNavigate } from "react-router-dom";

// import Bar
const TerritoryDashboard = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate.push("/");
  };
  return (
    <div className="main">
      <div className="card-box_dashboard">
        <Row>
          <Col
            xl={2}
            lg={2}
            md={3}
            sm={3}
            xs={3}
            style={{ marginBottom: "1rem" }}
          >
            <Link to={"/territory/:zoneId?/:depotId?/:territoryId?"}>
              {" "}
              <button className="fancy-button">
                <i className="fa fa-arrow-left">{"   Go Back "}</i>{" "}
              </button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "#ffca1c", maxWidth: "30%" }}
              >
                <img src={TotalPlan} alt="ext" height="50px" />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">Total Plan</div>
                </div>
                <hr className="hr0" />
                <div className="e-card-content" style={{ color: "#FFC107" }}>
                  20 Lacs
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6} className="CardGapFOrTab">
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{
                  background: "green",
                  maxWidth: "30%",
                }}
              >
                <img
                  src={AchIcon}
                  alt="ext"
                  height="50px"
                  style={{ mixBlendMode: "color-burn" }}
                />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">Achivement </div>
                </div>
                <hr className="hr0" />
                <div className="e-card-content" style={{ color: "green" }}>
                  15
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "rgb(0 122 209)", maxWidth: "30%" }}
              >
                <img
                  src={dealerIcon}
                  alt="ext"
                  height="50px"
                  style={{ mixBlendMode: "darken" }}
                />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">New Dealer Count </div>
                </div>
                <hr className="hr0" />
                <div
                  className="e-card-content"
                  style={{ color: "rgb(0 122 209)" }}
                >
                  5
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "#8BC34A", maxWidth: "30%" }}
              >
                <img src={moneyIcon} alt="ext" height="50px" />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div
                    className="e-card-header-title"
                    style={{ fontSize: "18px" }}
                  >
                    New Dealer Planed value{" "}
                  </div>
                </div>
                <hr className="hr0" />
                <div className="e-card-content" style={{ color: "#8BC34A" }}>
                  3 Lacs
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xl={3} lg={3} md={6} sm={6} xs={6} className="CardGapFOrTab">
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "rgb(0 122 209)", maxWidth: "30%" }}
              >
                <img
                  src={dealerIcon}
                  alt="ext"
                  height="50px"
                  style={{ mixBlendMode: "darken" }}
                />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">Actual New Dealer </div>
                </div>
                <hr className="hr0" />
                <div
                  className="e-card-content"
                  style={{ color: "rgb(0 122 209)" }}
                >
                  2
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "#8BC34A", maxWidth: "30%" }}
              >
                <img src={moneyIcon} alt="ext" height="50px" />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">
                    New Dealer Bill Value{" "}
                  </div>
                </div>
                <hr className="hr0" />
                <div className="e-card-content" style={{ color: "#8BC34A" }}>
                  2 Lacs
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "rgb(0 122 209)", maxWidth: "30%" }}
              >
                <img
                  src={dealerIcon}
                  alt="ext"
                  height="50px"
                  style={{ mixBlendMode: "darken" }}
                />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">OS vs OD</div>
                </div>
                <hr className="hr0" />
                <div
                  className="e-card-content"
                  style={{ color: "rgb(0 122 209)" }}
                >
                  23 || 38
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={3} md={6} sm={6} xs={6}>
            <div className="e-card e-card-horizontal">
              <div
                className="e-card-image"
                style={{ background: "rgb(0 122 209)", maxWidth: "30%" }}
              >
                <img
                  src={dealerIcon}
                  alt="ext"
                  height="50px"
                  style={{ mixBlendMode: "darken" }}
                />
              </div>

              <div className="e-card-stacked">
                <div className="e-card-header">
                  <div className="e-card-header-title">
                    Plan Visit Vs Actual{" "}
                  </div>
                </div>
                <hr className="hr0" />
                <div
                  className="e-card-content"
                  style={{ color: "rgb(0 122 209)" }}
                >
                  38 || 40
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <Row>

      </Row> */}
    </div>
  );
};

export default TerritoryDashboard;
