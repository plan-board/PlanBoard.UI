import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Loader from "../../common/Loader";
import { useParams } from "react-router";
import AllFigureText from "../components/AllFigureText";
import { NewProductPlaningGrid } from "./newProductPlaningGrid";
import { useSelector } from "react-redux";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import axiosInstance from "../../auth/api";
import ResponsePopup from "../../common/ResponsePopup";
import { formatDateTime } from "../../utils/utils";
import ConfirmResponsePopup from "../../common/ResponsePopup/ConfirmResponse";
const date = new Date();
const currentMonthCount = date.getMonth() + 1;
const currentYearCount = date.getFullYear();

const NewProductPlaning = () => {
  let productPlanningGridInstance = React.useRef();
  const [isLoading, setLoading] = useState(false);
  const { zoneId, depotId } = useParams();
  const dispatch = useDispatch();
  const [monthId, setMonth] = useState(currentMonthCount);
  const [fyId, setFYear] = useState(currentYearCount);
  const { AuthData } = useSelector((state) => state.auth);
  const [confirmResponseDetails, setConfirmResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  const [selectedZone, setSelectedZone] = useState(
    AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0
  );
  const [selectedDepot, setSelectedDepot] = useState(
    AuthData?.Depot[0]?.DepotID ? AuthData?.Depot[0]?.DepotID : 0
  );
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });
  const [yearList, setYearLIst] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [productPlanningList, setProductPlanningList] = useState([]);
  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };

  const onSelectedDepoChange = (newValue) => {
    setSelectedDepot(newValue);
    setProductPlanningList([]);
  };

  useEffect(() => {
    if (zoneId != undefined) {
      setSelectedZone(parseInt(zoneId));
    }
    if (depotId != undefined) {
      setSelectedDepot(parseInt(depotId));
    }
  }, []);

  const fetchMonthList = async () => {
    setLoading(true);
    const payload = {
      _month: 0,
    };
    try {
      const res = await axiosInstance.post("api/Master/GetMonthList", payload);
      if (res?.status === 200) {
        if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
          setMonthList(res.data.Data);
        }
      }
      setLoading(false);
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: err.message });
    }
  };
  const fetchYearList = async () => {
    setLoading(true);
    const payload = {};
    try {
      const res = await axiosInstance.post("api/Master/GetYearList", payload);
      if (res?.status === 200) {
        if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
          setYearLIst(res.data.Data);
        }
      }
      setLoading(false);
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: err.message });
    }
  };
  useEffect(() => {
    fetchYearList();
    fetchMonthList();
  }, []);

  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
    setConfirmResponseDetails({
      type: "error",
      show: false,
      message: "Do you want to Lock",
    });
  };
  const confirmApproved = () => {
    if (monthId != 0 && fyId != 0 && depotId != 0) {
      if (productPlanningList.length > 0) {
        setConfirmResponseDetails({
          type: "info",
          show: true,
          message: "Are you sure you want to approve",
        });
      } else {
        setResponseDetails({
          type: "error",
          show: true,
          message: "No Data Found To Approved",
        });
      }
    } else {
      setResponseDetails({
        type: "error",
        show: true,
        message: "All fields are Mandatory",
      });
    }
  };

  const yearDropDwn = () => {
    return yearList.map((item, index) => (
      <option key={item?.Year} value={item?.Year}>
        {item?.Year}
      </option>
    ));
  };
  const monthDropDwn = () => {
    return monthList.map((item, index) => (
      <option key={item?.MonthVal} value={item?.MonthVal}>
        {item?.Month}
      </option>
    ));
  };

  const validateForm = () => {
    let formIsValid = true;
    if (selectedDepot == 0 || fyId == 0 || monthId == 0) {
      formIsValid = false;
    }
    return formIsValid;
  };

  const getProductPlanningData = async () => {
    if (validateForm()) {
      setLoading(true);
      const payload = {
        DepotId: selectedDepot,
        _month: monthId,
        _year: fyId,
      };
      try {
        const res = await axiosInstance.post(
          "GetNewProductPlanningList",
          payload
        );
        if (res?.status === 200) {
          if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
            res.data.Data.map((val, index) => {
              val.Sno = index + 1;
              // val.approvedon = formatDateTime(val.approvedon);
            });
            setProductPlanningList(res.data.Data);
          }
        }
        setLoading(false);
      } catch (error) {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    } else {
      setResponseDetails({
        type: "error",
        show: true,
        message: "All fields are Mandatory",
      });
    }
  };

  const handleCellEdit = (args) => {
    if (args.rowData.Status == "Approved") {
      args.cancel = true;
    }
  };

  const handleCellSaved = (args) => {
    if (args.rowData) {
      let newRowData = args.rowData;
      newRowData.vol_ltr = newRowData.packsize * args.value;
      newRowData.qty = args.value;
      productPlanningGridInstance.current.setRowData(
        args.rowData.skucode,
        newRowData
      );
    }
  };

  const handleApproved = async () => {
    handleCloseResponse();
    setLoading(true);
    const formatData = [];
    productPlanningList.map((val, index) => {
      formatData.push({
        newproductmastertableid: val.newproductmastertableid,
        depotid: selectedDepot,
        qty: val.qty,
        vol_ltr: val.vol_ltr,
        _month: currentMonthCount,
        _year: currentYearCount,
        userid: parseInt(AuthData.Data[0].EmployeeID),
        isapproved: 1,
        approvedby: parseInt(AuthData.Data[0].EmployeeID),
        remark: null,
      });
    });

    const payload = {
      NewProductPlanningMaster: formatData,
    };

    try {
      const res = await axiosInstance.post(
        "SetNewProductPlanningData",
        payload
      );
      if (res.status === 200) {
        if (res.data.Status == true || res.data.Status == "true") {
          setResponseDetails({
            type: "success",
            message: res.data.Message,
            show: true,
          });

          setProductPlanningList([]);
        } else {
          setResponseDetails({
            type: "error",
            message: res.data.Message,
            show: true,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const handleSave = async () => {
    if (monthId != 0 && fyId != 0 && depotId != 0) {
      let changedRecords =
        productPlanningGridInstance.current.getBatchChanges().changedRecords;
      if (changedRecords.length > 0) {
        setLoading(true);
        const formatData = [];
        changedRecords.map((val, index) => {
          formatData.push({
            newproductmastertableid: val.newproductmastertableid,
            depotid: selectedDepot,
            qty: val.qty,
            vol_ltr: val.vol_ltr,
            _month: currentMonthCount,
            _year: currentYearCount,
            userid: parseInt(AuthData.Data[0].EmployeeID),
            isapproved: 0,
            approvedby: 0,
            remark: null,
          });
        });

        const payload = {
          NewProductPlanningMaster: formatData,
        };

        try {
          const res = await axiosInstance.post(
            "SetNewProductPlanningData",
            payload
          );
          if (res.status === 200) {
            if (res.data.Status == true || res.data.Status == "true") {
              setResponseDetails({
                type: "success",
                message: res.data.Message,
                show: true,
              });
              // setMonth(0);
              // setFYear(0);

              setProductPlanningList([]);
            } else {
              setResponseDetails({
                type: "error",
                message: res.data.Message,
                show: true,
              });
            }
          }
          setLoading(false);
        } catch (error) {
          dispatch({ type: SHOW_TOAST, payload: error.message });
        }
      } else {
        setResponseDetails({
          type: "error",
          show: true,
          message: "No Changes Found To Proceed",
        });
      }
    } else {
      setResponseDetails({
        type: "error",
        show: true,
        message: "All fields are Mandatory",
      });
    }
  };

  const handleToolbarClick = (args) => {
    let cur_timestamp = Math.floor(Date.now() / 1000);
    let export_file_name = "NewProductPlanningList" + cur_timestamp;
    if (args.item.text === "Excel Export") {
      productPlanningGridInstance.current.excelExport({
        fileName: export_file_name + ".xlsx",
      });
    } else if (args.item.text === "CSV Export") {
      productPlanningGridInstance.current.csvExport({
        fileName: export_file_name + ".csv",
      });
    }
  };

  return (
    <>
      <div className="main" style={{ marginLeft: "0px" }}>
        <section>
          <div className="w3-row">
            {isLoading && <Loader />}
            <span className="main-title">Shalimar Paints Limited</span>
          </div>

          <div className="card-box lightblue">
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
                    selectedZone={selectedZone}
                    selectedDepot={selectedDepot}
                    onSelectedDepoChange={onSelectedDepoChange}
                  />
                </div>
                {/* {monthList.length > 0 && ( */}
                <div className="one-fourth">
                  <select
                    className="form-control"
                    value={monthId}
                    disabled={true}
                    // onChange={handleMonthChange}
                  >
                    <option value={0}>Select Month</option>
                    {monthDropDwn()}
                  </select>
                </div>
                {/* )} */}
                {yearList.length > 0 && (
                  <div className="one-fourth">
                    <select
                      className="form-control"
                      value={fyId}
                      disabled={true}
                      // onChange={handleYearChange}
                    >
                      <option value={0}>Select Year</option>
                      {yearDropDwn()}
                    </select>
                  </div>
                )}

                <div className="one-fourth" style={{ marginTop: "10px" }}>
                  <Button
                    style={{ background: "green", marginRight: "15px" }}
                    onClick={getProductPlanningData}
                  >
                    Get Data
                  </Button>
                  {/* </div>
                <div className="one-fourth" style={{ marginTop: "10px" }}> */}
                  <Button
                    style={{ background: "green", marginRight: "15px" }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ background: "green" }}
                    onClick={confirmApproved}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
              <>
                <div className="one-fourth">
                  <DepoSelectionBox
                    selectedZone={selectedZone}
                    selectedDepot={selectedDepot}
                    onSelectedDepoChange={onSelectedDepoChange}
                  />
                </div>

                <div className="one-fourth">
                  <select
                    className="form-control"
                    value={monthId}
                    disabled={true}
                    // onChange={handleMonthChange}
                  >
                    <option value={0}>Select Month</option>
                    {monthDropDwn()}
                  </select>
                </div>
                {/* )} */}

                <div className="one-fourth">
                  <select
                    className="form-control"
                    value={fyId}
                    disabled={true}
                    // onChange={handleYearChange}
                  >
                    <option value={0}>Select Year</option>
                    {yearDropDwn()}
                  </select>
                </div>

                <div className="one-fourth" style={{ marginTop: "10px" }}>
                  <Button
                    style={{ background: "green", marginRight: "15px" }}
                    onClick={getProductPlanningData}
                  >
                    Get Data
                  </Button>
                  <Button style={{ background: "green" }} onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </>
            ) : null}
          </div>
          <div className="card-box lightblue ">
            <div
              className="w-100"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ fontSize: "18px", fontWeight: "700" }}>
                {`Count : ${
                  productPlanningList.length ? productPlanningList.length : 0
                }`}{" "}
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "red",
                    marginLeft: "20px",
                  }}
                >
                  Monthly Sales Volume Plan
                </span>
              </span>

              <NewProductPlaningGrid
                productPlanningList={productPlanningList}
                AuthData={AuthData}
                handleCellEdit={handleCellEdit}
                handleCellSaved={handleCellSaved}
                productPlanningGridInstance={productPlanningGridInstance}
                handleToolbarClick={handleToolbarClick}
              />
            </div>
          </div>
        </section>
        <ResponsePopup
          show={responseDetails.show}
          text={responseDetails.message}
          type={responseDetails.type}
          onClose={() => handleCloseResponse()}
        />
        <ConfirmResponsePopup
          show={confirmResponseDetails.show}
          type={confirmResponseDetails.type}
          text={confirmResponseDetails.message}
          onConfirm={handleApproved}
          onClose={() => handleCloseResponse()}
        />
      </div>
    </>
  );
};

export default NewProductPlaning;
