import React, { useEffect, useState, useRef } from "react";
import AllFigureText from "../components/AllFigureText";
import { CustomerPotentialForm } from "./customerPotentialForm";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import ResponsePopup from "../../common/ResponsePopup";
import Loader from "../../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";
import TerritorySelectionBox from "../components/TerritorySelectionBox";

const CustomerPotential = () => {
  const dispatch = useDispatch();
  let customterGridInstance = useRef();
  const { zoneId, depotId, territoryId } = useParams();
  const { AuthData } = useSelector((state) => state?.auth);
  const flag = useSelector((state) => state.sidebarStatus.flag);
  const [isLoading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState(
    zoneId ?? (AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0)
  );
  const [selectedTerritory, setSelectedTerritory] = useState(territoryId ?? 0);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(
    depotId
      ? depotId
      : AuthData?.Depot[0]?.DepotID
      ? AuthData?.Depot[0]?.DepotID
      : 0
  );

  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  useEffect(() => {
    if (selectedTerritory) {
      fetchCustomerList();
    }
  }, [selectedTerritory]);

  const fetchCustomerList = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      territory_id: parseInt(selectedTerritory),
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Customer/GetPotentialData",
        payload
      );

      if (response?.status === 200) {
        response.data.Data.map((val, index) => {
          val.serialNo = index + 1;
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

  const handleSave = async () => {
    let ApiData = [];
    let changed_records = [];
    if (employeeList.length > 0) {
      changed_records =
        customterGridInstance.current.getBatchChanges().changedRecords;
    }

    changed_records.map((val) => {
      let changedData = {
        CustomerId: val.CustomerId,
        PotentialValue: val.PotentialValue,
      };
      ApiData.push(changedData);
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
            setSelectedTerritory(0);
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
  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };
  const onSelectedDepoChange = (newValue) => {
    setSelectedDepot(newValue);
  };
  const onSelectedTerritoryChange = (newValue) => {
    setSelectedTerritory(newValue);
  };

  return (
    <div className="main" style={{ marginLeft: flag ? "150px" : "0px" }}>
      <section>
        <div className="w3-row">
          {isLoading && <Loader />}
          <span className="main-title">
            Shalimar Paints Limited <AllFigureText />
          </span>
        </div>
        <div className="card-box lightblue" style={{ display: "flex" }}>
          {AuthData?.Data[0].EmployeeTpye === "HOD" ||
          AuthData?.Data[0].EmployeeTpye === "ZM" ? (
            <div className="row w-100">
              <div className="one-fourth">
                <ZoneSelectionBox
                  selectedZone={selectedZone}
                  onValueChange={handleSelectionChange}
                />
              </div>
              <div className="one-fourth">
                <DepoSelectionBox
                  selectedDepot={selectedDepot}
                  selectedZone={selectedZone}
                  onSelectedDepoChange={onSelectedDepoChange}
                />
              </div>
              <div className="one-fourth">
                <TerritorySelectionBox
                  selectedZone={selectedZone}
                  selectedDepot={selectedDepot}
                  selectedTerritory={selectedTerritory}
                  onSelectedTerritoryChange={onSelectedTerritoryChange}
                />
              </div>
              <div className="one-fourth">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={() => handleSave()}
                >
                  <i className="fa fa-plus"></i> Save
                </button>
              </div>
            </div>
          ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
            <div className="row w-100">
              <div className="one-fourth">
                <DepoSelectionBox
                  selectedZone={selectedZone}
                  selectedDepot={selectedDepot}
                  onSelectedDepoChange={onSelectedDepoChange}
                />
              </div>
              <div className="one-fourth">
                <TerritorySelectionBox
                  selectedZone={selectedZone}
                  selectedDepot={selectedDepot}
                  onSelectedDepoChange={onSelectedDepoChange}
                  onSelectedTerritoryChange={onSelectedTerritoryChange}
                />
              </div>
              <div className="one-fourth">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={() => handleSave()}
                >
                  <i className="fa fa-plus"></i> Save
                </button>
              </div>
            </div>
          ) : AuthData?.Data[0].EmployeeTpye === "AM" ? (
            <>
              <div className="one-fourth">
                <TerritorySelectionBox
                  selectedZone={selectedZone}
                  selectedDepot={selectedDepot}
                  onSelectedDepoChange={onSelectedDepoChange}
                  onSelectedTerritoryChange={onSelectedTerritoryChange}
                />
              </div>
              <div className="one-fourth">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={() => handleSave()}
                >
                  <i className="fa fa-plus"></i> Save
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div class="card-box lightblue">
          <div class="row w-100">
            {" "}
            <div className="full">
              {" "}
              <CustomerPotentialForm
                customterGridInstance={customterGridInstance}
                employeeList={employeeList}
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
