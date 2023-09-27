import React, { useEffect, useState, useMemo } from "react";
import AllFigureText from "../components/AllFigureText";
import { CustomerPotentialForm } from "./customerPotentialForm";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import ResponsePopup from "../../common/ResponsePopup";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

const CustomerPotential = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [territoryList, setTerritoryList] = useState([]);
  const [territortId, setTerritoryId] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });
  useEffect(() => {
    fetchTerritoryList();
  }, []);
  useEffect(() => {
    fetchCustomerList();
  }, [territortId]);
  const handleFilterChange = (e) => {
    setFilterCode(e.target.value);
  };
  const handleFilterNameChange = (e) => {
    setFilterName(e.target.value);
  };
  const filteredData = employeeList.filter((item) => {
    const codeMatch =
      filterCode === "" ||
      item.CustomerCode.toLowerCase().includes(filterCode.toLowerCase());
    const nameMatch =
      filterName === "" ||
      item.CustomerName.toLowerCase().includes(filterName.toLowerCase());
    return codeMatch && nameMatch;
  });
  const handleSave = () => {
    console.log(territortId);
  };
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <div style={{ display: "flex", minWidth: "100%" }}>
        <input
          type="text"
          placeholder="Filter by Customer Code"
          value={filterCode}
          onChange={handleFilterChange}
          style={{
            fontSize: "14px",
            paddingLeft: "10px",
            marginLeft: "0px",
            width: "30%",
          }}
        />

        <input
          type="text"
          placeholder="Filter by CustomerName"
          value={filterName}
          onChange={handleFilterNameChange}
          style={{
            fontSize: "14px",
            paddingLeft: "10px",
            marginLeft: "30px",
            width: "30%",
          }}
        />

        <button
          type="button"
          className="btn btn-primary"
          style={{
            fontSize: "14px",
            paddingLeft: "10px",
            marginLeft: "32%",
            // right: 0,
          }}
          onClick={handleSave}
        >
          <i className="fa fa-plus"></i> Save
        </button>
      </div>
    );
  }, [filterCode, filterName]);

  const fetchCustomerList = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      territory_id: parseInt(territortId),
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Customer/GetPotentialData",
        payload
      );

      if (response?.status === 200) {
        setEmployeeList(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
  };

  const fetchTerritoryList = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    try {
      const response = await axiosInstance.post("api/Master/AreaData", payload);

      if (response?.status === 200) {
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.sort((a, b) => {
            return a.area_name?.localeCompare(b.area_name);
          });
          setTerritoryList(sortData);
        }
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const TerritoryDropdown = () => {
    return territoryList.map((item, index) => (
      <option key={item?.area_id} value={item?.area_id}>
        {item?.area_name}
      </option>
    ));
  };

  const handleChange = (e, args) => {
    if (e.target.name === "territoryId") {
      setTerritoryId(e.target.value);
    }
    // if (e.target.name === "PotentialValue") {
    //   // console.log(e.target.name, e.target.value, args);
    //   if(args ==)
    // }
  };

  return (
    <div className="main">
      <section>
        <div className="w3-row">
          {isLoading && <Loader />}
          <span className="main-title">
            Shalimar Paints Limited <AllFigureText />
          </span>
        </div>
        <div class="card-box lightgreen">
          <div class="row w-100">
            {" "}
            <div className="full">
              {" "}
              <CustomerPotentialForm
                territortId={territortId}
                TerritoryDropdown={TerritoryDropdown}
                handleChange={handleChange}
                employeeList={filteredData}
                subHeaderComponentMemo={subHeaderComponentMemo}
              />
            </div>
          </div>
        </div>
        <ResponsePopup
          show={responseDetails.show}
          text={responseDetails.message}
          type={responseDetails.type}
          onClose={handleCloseResponse}
        />
      </section>
    </div>
  );
};

export default CustomerPotential;
