import React, { useEffect, useState } from "react";
import AllFigureText from "../components/AllFigureText";
import { CustomerPotentialForm } from "./customerPotentialForm";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import ResponsePopup from "../../common/ResponsePopup";
import Loader from "../../common/Loader";
import { useDispatch, useSelector } from "react-redux";

const CustomerPotential = () => {
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state?.auth);

  const [isLoading, setLoading] = useState(false);
  const [territoryList, setTerritoryList] = useState([]);
  const [territortId, setTerritoryId] = useState(null);
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
    if (territortId) {
      fetchCustomerList();
    }
  }, [territortId]);
  const handleFilterChange = (e) => {
    setFilterCode(e.target.value);
  };
  // const handleFilterNameChange = (e) => {
  //   setFilterName(e.target.value);
  // };
  const filteredData = employeeList.filter((item) => {
    const codeMatch =
      filterCode === "" ||
      item.CustomerCode.toLowerCase().includes(filterCode.toLowerCase());

    const nameMatch =
      filterCode === "" ||
      item.CustomerName.toLowerCase().includes(filterCode.toLowerCase());

    return codeMatch || nameMatch;
  });

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
        response.data.Data.map((val) => {
          val.change = false;
        });
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
      ZoneId: 0,
      DepotId: 0,
    };
    try {
      const response = await axiosInstance.post("TerritoryMonthPlan", payload);

      if (response?.status === 200) {
        const filteredTerr = (response?.data?.Data || []).filter((obj1) =>
          (AuthData?.Territory || []).some(
            (obj2) => obj1.territoryid === obj2.TerritoryID
          )
        );
        setTerritoryList(filteredTerr);
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const TerritoryDropdown = () => {
    return territoryList.map((item, index) => (
      <option key={index} value={item?.territoryid}>
        {item.territory_name}
      </option>
    ));
  };

  const handleChange = (e, args) => {
    if (e.target.name === "territoryId") {
      setTerritoryId(e.target.value);
    }
    if (e.target.name === "PotentialValue") {
      // console.log(e.target.name, e.target.value, args);
      if (args) {
        let data = [...employeeList];
        let matchIndex = data.findIndex(
          (val) => val.CustomerId === args.CustomerId
        );

        if (matchIndex != -1) {
          data[matchIndex].PotentialValue = parseInt(e.target.value);
          data[matchIndex].change = true;
        }
        setEmployeeList([...data]);
      }
    }
  };

  const handleSave = async () => {
    let ApiData = [];

    employeeList.map((val) => {
      if (val.change == true) {
        let changedData = {
          CustomerId: val.CustomerId,
          PotentialValue: val.PotentialValue,
        };
        ApiData.push(changedData);
      }
    });

    if (ApiData.length > 0) {
      const payload = {
        Token: localStorage.getItem("access_token"),
        PotentialParam: ApiData,
      };
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "api/Master/SetPotentialData",
          payload
        );

        if (response?.status === 200) {
          if (response.data.Status) {
            setResponseDetails({
              show: true,
              message: response.data.Message,
              type: "success",
            });
            fetchCustomerList();
            setTerritoryId(0);
          } else {
            setResponseDetails({
              show: true,
              message: response.data.Message,
              type: "error",
            });
          }
        }
        setLoading(false);
      } catch (error) {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    } else {
      setResponseDetails({
        show: true,
        message: "No Changes Found To Proceed",
        type: "error",
      });
    }
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <div style={{ display: "flex", minWidth: "100%" }}>
        <input
          type="text"
          placeholder="Filter by Customer Name or Code"
          value={filterCode}
          onChange={handleFilterChange}
          style={{
            fontSize: "14px",
            paddingLeft: "10px",
            marginLeft: "0px",
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
          onClick={() => handleSave()}
        >
          <i className="fa fa-plus"></i> Save
        </button>
      </div>
    );
  }, [filterCode, filterName, employeeList]);

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
