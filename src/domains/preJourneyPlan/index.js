import React, { useEffect, useState, useRef } from "react";
import AllFigureText from "../components/AllFigureText";
// import { CustomerPotentialForm } from "./customerPotentialForm";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import ResponsePopup from "../../common/ResponsePopup";
import Loader from "../../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";
import TerritorySelectionBox from "../components/TerritorySelectionBox";
import { PreJourneyForm } from "./PreJourneyForm";
import { PreJourneyGrid } from "./PreJourneyGrid";
import { formatDate } from "../../common/dateFormat";
import TodayActivityGrid from "./TodayActivity";
import { DataManager, Query } from "@syncfusion/ej2-data";
const date = new Date();
const cMName = date.toLocaleString("default", { month: "short" });
const mStartName = cMName.substring(0, 3);
const PreJourneyPlan = () => {
  const dispatch = useDispatch();
  let todayActivityGridInstance = useRef();
  let customterGridInstance = useRef();
  let customterMultiInstance = useRef();
  const { zoneId, depotId, territoryId } = useParams();
  const { AuthData } = useSelector((state) => state?.auth);
  const [todayActivityOpen, setTodayActivityOpen] = useState(false);
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
  const currentMonthCount =
    date.getMonth() < 3 ? date.getMonth() + 13 : date.getMonth() + 1;
  const [todayActivityData, setTodayaActivityData] = useState([]);

  const [customerList, setCustomerList] = useState([]);
  const [formDetails, setFormDetails] = useState({
    tableid: 0,
    customerid: "",
    visitdate: "",
    visitpurpose: "",
  });

  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  const [gridFormDetails, setGridFormDetails] = useState({
    formDate: "",
    toDate: "",
  });

  const [visitedList, setVisitedList] = useState([]);

  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };
  const onSelectedDepoChange = (newValue) => {
    setSelectedDepot(newValue);
  };
  const onSelectedTerritoryChange = (newValue) => {
    setSelectedTerritory(newValue);
  };

  useEffect(() => {
    if (selectedTerritory) {
      fetchCustomer();
    }
  }, [selectedTerritory]);

  useEffect(() => {
    handlegetData();
  }, []);

  const fetchCustomer = async () => {
    customterMultiInstance.current.value = [];
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `api/GeneralData/GetCustomerByTerritoryid/${selectedTerritory}`
      );

      if (response?.status === 200) {
        if (response.data.Data != null) {
          setCustomerList(response.data.Data.Table);
        }
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const handleChange = (e) => {
    if (e.element) {
      let newCustomerIds = e.value;
      setFormDetails((prevstate) => ({
        ...prevstate,
        customerid: newCustomerIds,
      }));
    } else {
      setFormDetails((prevstate) => ({
        ...prevstate,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const getSingleRowData = (args) => {
    customterMultiInstance.current.value = args.rowData.customerid;
    setFormDetails({
      tableid: args.rowData.tableid,
      customerid: args.rowData.customerid,
      visitdate: formatDate(args.rowData.visitdate),
      visitpurpose: args.rowData.visitpurpose,
    });
  };

  const validateForm = () => {
    let formIsValid = true;

    if (formDetails.customerid == 0) {
      formIsValid = false;
    }
    if (formDetails["visitdate"] == "") {
      formIsValid = false;
    }
    if (formDetails["visitpurpose"] == "") {
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleTodayActivityClose = () => {
    setTodayActivityOpen(false);
  };

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      let payload = {};
      if (formDetails.tableid == 0) {
        payload = {
          action: "Save",
          tableid: 0,
          territoryid: selectedTerritory,
          customerid: formDetails.customerid,
          visitdate: formDetails.visitdate,
          visitpurpose: formDetails.visitpurpose,
          createdby: parseInt(AuthData?.Data[0].EmployeeID),
        };
      } else {
        payload = {
          action: "Update",
          tableid: formDetails.tableid,
          territoryid: selectedTerritory,
          customerid: formDetails.customerid,
          visitdate: formDetails.visitdate,
          visitpurpose: formDetails.visitpurpose,
          createdby: parseInt(AuthData?.Data[0].EmployeeID),
        };
      }

      try {
        const response = await axiosInstance.post("api/SaveVisitPlan", payload);

        if (response?.status === 200) {
          if (response?.data?.Status == true) {
            // console.log(response);
            setResponseDetails({
              type: "success",
              show: true,
              message: response?.data?.Message,
            });
            setFormDetails({
              tableid: 0,
              customerid: "",
              visitdate: "",
              visitpurpose: "",
            });
            customterMultiInstance.current.value = null;
            handlegetData();
          } else {
            setResponseDetails({
              type: "error",
              show: true,
              message: response?.data?.Message,
            });
          }
        }

        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    } else {
      setResponseDetails({
        show: true,
        message: "Please Fill All Fields",
        type: "error",
      });
    }
  };

  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
  };

  const gridHandleChange = (e) => {
    setGridFormDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async () => {
    if (gridFormDetails.formDate != "" && gridFormDetails.toDate != "") {
      setLoading(true);
      let dataNo = parseInt(AuthData?.Data[0].ReportingManagerID);
      try {
        const response = await axiosInstance.get(
          `api/GetVisitPlan/${dataNo}/${gridFormDetails.formDate}/${gridFormDetails.toDate}`
        );
        if (response?.status === 200) {
          if (response.data.Data != null) {
            setVisitedList(response.data.Data.Table);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    } else {
      handlegetData();
      setResponseDetails({
        show: true,
        message: "Please Fill All Fields",
        type: "error",
      });
    }
  };

  const handlegetData = async () => {
    try {
      let dataNo = parseInt(AuthData?.Data[0]?.EmployeeID);
      const response = await axiosInstance.get(
        `api/GetVisitPlan/${dataNo}/0/0`
      );
      if (response?.status === 200) {
        if (response.data.Data != null) {
          setVisitedList(response.data.Data.Table);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const handleTodatActivity = async () => {
    // setTodayActivityOpen(true);
    setLoading(true);

    try {
      let dataNo = parseInt(AuthData?.Data[0]?.EmployeeID);
      const response = await axiosInstance.get(`api/TodayActivity/${dataNo}`);
      if (response?.status === 200) {
        if (response.data.Data != null) {
          setTodayaActivityData(response.data.Data.Table);
        }
        setTodayActivityOpen(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }

    // https://salesplandemoapi.mayanksoftwares.co/api/TodayActivity/358
  };
  const childGridColumns = [
    {
      field: "MarketSectorName",
      headerText: "Market Sector Name",
      width: "150",
      textAlign: "left",
      allowEditing: false,
      freeze: "left",
    },
    {
      field: "LLY",
      headerText: "LLY",
      width: "100",
      textAlign: "center",
      allowEditing: false,
    },
    {
      field: "LY",
      headerText: "LY",
      width: "100",
      textAlign: "center",
      allowEditing: false,
    },
    {
      field: "YTD",
      headerText: "YTD",
      width: "100",
      textAlign: "center",
      allowEditing: false,
    },
    {
      field: "Last6MonthAvgSales",
      headerText: "6 Mo. Avg",
      width: "100",
      textAlign: "center",
      allowEditing: false,
      visible: false,
    },
    {
      field: "SameMonthLY",
      headerText: `LY (${mStartName})`,
      width: "100",
      textAlign: "center",
      allowEditing: false,
    },
    {
      field: "Value",
      headerText: "Value (Rs.)",
      width: "100",
      textAlign: "center",
      allowEditing: true,
    },
    {
      field: "MTD",
      headerText: "MTD",
      width: "100",
      textAlign: "center",
      allowEditing: true,
    },
  ];

  const onLoadChild = async (args) => {
    const cMonth = new Date().getMonth() + 1;
    if (args.data.customerid) {
      try {
        const payload = {
          Token: localStorage.getItem("access_token"),
          FPDealerWiseParam: [
            {
              // FYId: dataObj.FYId,
              Month: cMonth,
              DealerId: args.data.customerid,
            },
          ],
        };
        const response = await axiosInstance.post(
          "GetFocusProductDealerWise",
          payload
        );
        if (response?.status === 200) {
          if (response?.data?.Data) {
            const result = response?.data?.Data;
            args.childGrid.query = new Query();
            args.childGrid.dataSource = result;
          }
        }
      } catch (error) {
        setLoading(false);
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    }
  };
  const GrandChildGridOptions = {
    columns: childGridColumns,
  };
  const onLoad = (args) => {
    let primarhyKeyField =
      todayActivityGridInstance.current.getPrimaryKeyFieldNames()[0];
    let primarhyKeyValue = args.data[primarhyKeyField];
    console.log(primarhyKeyValue);
    let matchedData = new DataManager(todayActivityData).executeLocal(
      new Query().where(primarhyKeyField, "equal", primarhyKeyValue)
    );
    args.childGrid.query = new Query();
    args.childGrid.dataSource = matchedData;
    args.childGrid.childGrid = GrandChildGridOptions;
  };
  return (
    <>
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
                    className="buttonForMainUi"
                    style={{ paddingTop: "6px" }}
                    onClick={handleTodatActivity}
                  >
                    <span style={{ fontFamily: "Nunito sans" }}>
                      Today Activity
                    </span>
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
                    className="buttonForMainUi"
                    style={{ paddingTop: "6px" }}
                    onClick={handleTodatActivity}
                  >
                    <span style={{ fontFamily: "Nunito sans" }}>
                      Today Activity
                    </span>
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
                    className="buttonForMainUi"
                    style={{ paddingTop: "6px" }}
                    onClick={handleTodatActivity}
                  >
                    <span style={{ fontFamily: "Nunito sans" }}>
                      Today Activity
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div class="card-box lightblue">
            <div class="row w-100">
              <div className="full">
                <PreJourneyForm
                  customerList={customerList}
                  customterMultiInstance={customterMultiInstance}
                  handleChange={handleChange}
                  formDetails={formDetails}
                  handleSave={handleSave}
                />
              </div>
            </div>
          </div>
          <div class="card-box lightblue">
            <div class="row w-100">
              <div className="full">
                <PreJourneyGrid
                  gridFormDetails={gridFormDetails}
                  customterGridInstance={customterGridInstance}
                  visitedList={visitedList}
                  gridHandleChange={gridHandleChange}
                  handleSearch={handleSearch}
                  getSingleRowData={getSingleRowData}
                />
              </div>
            </div>
          </div>
          <TodayActivityGrid
            todayActivityOpen={todayActivityOpen}
            handleTodayActivityClose={handleTodayActivityClose}
            todayActivityData={todayActivityData}
            onLoad={onLoad}
            onLoadChild={onLoadChild}
            todayActivityGridInstance={todayActivityGridInstance}
          />
          <ResponsePopup
            show={responseDetails.show}
            text={responseDetails.message}
            type={responseDetails.type}
            onClose={handleCloseResponse}
          />
        </section>
      </div>
    </>
  );
};

export default PreJourneyPlan;
