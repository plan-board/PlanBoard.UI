import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import TotalPlan from "../../images/totalplan.png";
import AchIcon from "../../images/achievement.png";
import dealerIcon from "../../images/newDealer.jpg";
import moneyIcon from "../../images/money.png";
import AchievementGrid from "./AchevimentGrid";
import FocusMarketGrid from "./FocusMarketGrid";
import Table0 from "./table0";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";
import { ServerAPI } from "../../auth/api";
// import Bar
const Dashboard = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [table0, setTable0] = useState([]);
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);

  const fetchDashboardOne = () => {
    fetch(ServerAPI + "api/GeneralData/DashboardOne/0")
      .then((res) => res.json())
      .then((res) => {
        if (res.Status) {
          setTable0(res.Data.Table);
        }
      })
      .catch((err) => console.log("dashobard1error", err));
  };

  const fetchDashboardTwo = async () => {
    fetch(ServerAPI + "api/GeneralData/DashboardTwo/0")
      .then((res) => res.json())
      .then((res) => {
        if (res.Status) {
          setTable1(res.Data.Table);
        }
      })
      .catch((err) => console.log("dashobard2error", err));
  };

  const fetchDashboardThree = async () => {
    fetch(ServerAPI + "api/GeneralData/DashboardThree/0")
      .then((res) => res.json())
      .then((res) => {
        if (res.Status) {
          setTable2(res.Data.Table);
        }
        setLoading(false);
      })
      .catch((err) => console.log("dashobard3error", err));
  };

  useEffect(() => {
    fetchDashboardOne();
    fetchDashboardTwo();
    fetchDashboardThree();
  }, []);

  return (
    <div className="main">
      {isLoading && <Loader />}
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className="e-card lightred">
            <div className="e-card-title" style={{ background: "#007ad1" }}>
              Summary
            </div>
            <div style={{ width: "100%" }}>
              <Table0 table0={table0} />
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className="e-card lightred">
            <div className="e-card-title" style={{ background: "#007ad1" }}>
              Market Sector Wise Summary
            </div>
            <div style={{ width: "100%" }}>
              <AchievementGrid table2={table2} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "10px" }}
        >
          <div className="e-card lightred">
            <div className="e-card-title" style={{ background: "#007ad1" }}>
              Customer Wise Growth
            </div>
            <div style={{ width: "100%" }}>
              <FocusMarketGrid table1={table1} />
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row style={{ marginTop: "10px" }}>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className="e-card lightred">
            <div className="e-card-title" style={{ background: "#007ad1" }}>
              Market Sector wise Sale
            </div>
            <div style={{ width: "100%" }}>
              <FocusMarketGrid table/>
            </div>
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
