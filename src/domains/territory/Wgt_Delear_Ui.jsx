import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import CustomPopup from "../CustomPopup";
import ExportExcel from "../ExportExcel";
import { GetPercent, formatDateTimes } from "../../utils/utils";
import Loader from "../../common/Loader";
import { Row, Col } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  CommandColumn,
  Freeze,
  Page,
  Filter,
  Toolbar,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
const monthArr = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];
const date = new Date();
const cMName = date.toLocaleString("default", { month: "short" });
const mStartName = cMName.substring(0, 3);

const Wgt_Delear_Ui = ({ data }) => {
  const dispatch = useDispatch();
  let Wgt_DelearUiGridInstance = useRef();
  const [getinputs, setGetinputs] = useState({});
  const [dealerlist, setDealerlist] = useState([]);
  const [gridMonth, setGridMonth] = useState([]);
  const currentMonthCount =
    date.getMonth() < 3 ? date.getMonth() + 13 : date.getMonth() + 1;
  const [currentMonth, setCurrentMonth] = useState(currentMonthCount);
  const [visibility, setVisibility] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [sumValue, setSumValue] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [monthName, setMonthName] = useState("");

  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(""); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(""); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);
  const [monthKey, setMonthKey] = useState(cMName + "_Month_Value_v1");

  useEffect(() => {
    fetchDealerMaster();
    sortMonth();
  }, [data]);

  function onchangeInputs(e, id) {
    setGetinputs({
      ...getinputs,
      [id]: { ...getinputs[id], [e.target.name]: e.target.value },
    });
  }
  const sortMonth = () => {
    const headers = [];

    for (let i = 0; i < monthArr.length; i++) {
      const monName = monthArr[i];
      if (monName === mStartName) {
        break;
      } else {
        headers.push(monName);
      }
    }
    setGridMonth([...headers]);
  };

  const fetchDealerMaster = async () => {
    setLoading(true);
    const payload = {
      Token: localStorage.getItem("access_token"),
      TerritoryId: data,
      DealerId: 0,
    };
    try {
      const response = await axiosInstance.post("CustomerMonthPlan", payload);

      if (response?.status === 200) {
        if (response.data.Data.length > 0) {
          let res = response.data.Data;
          res.map((val) => {
            let lydata =
              val.potential != 0 ? (val.LY_Value * 100) / val.potential : 0;
            val.lYActualShare = lydata.toFixed(2);

            let YTDData =
              val.potential != 0
                ? ((val.YTD_Value + val[`${mStartName}_Month_Value_v1`]) *
                    100) /
                  val.potential
                : 0;
            val.YTDActualPlanShare = YTDData.toFixed(2);
            val.tDue = val.creepage_value + val.OD;
            let collectSum =
              val.creepage_value + val.OD + val[`${mStartName}_Month_Value_v1`];
            val.collectionVal = collectSum.toFixed(2);
          });
          setDealerlist(res);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const percentageFormatter = (field, data, column) => {
    return getValue("lYActualShare", data) + " %";
  };
  const percentageFormatterYTD = (field, data, column) => {
    return getValue("YTDActualPlanShare", data) + " %";
  };
  const templateCyTd = (args) => {
    return (
      <>
        {args.CY_Value} <hr className="hr0" /> {args.YTD_Value}
      </>
    );
  };

  const nonCurMonTemp = (args, val) => {
    return (
      <>
        {args[`${val}_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`${val}_Month_Sale`]}
      </>
    );
  };

  const salesTemplate = (args) => {
    return (
      <>
        {args[`${mStartName}_Month_Value`]}
        <hr className="hr0" />
        {args[`${mStartName}_Month_Value_v1`]}
      </>
    );
  };

  const lastTdTemplate = (args) => {
    let YTDPlusV1 = args?.YTD_Value + args[`${mStartName}_Month_Value_v1`];

    let llyYTTD =
      YTDPlusV1 != 0
        ? ((YTDPlusV1 - args?.LYYTDvsCYYTD) * 100) / args?.LYYTDvsCYYTD
        : 0;
    return (
      <>
        {args?.LYYTDvsCYYTD}/{YTDPlusV1.toFixed(2)} ({llyYTTD.toFixed(2)}){" "}
      </>
    );
  };

  const commmandTemplate = (args) => {
    return (
      <p onClick={() => getMonthTarget(args)}>
        <i
          className="fa fa-pencil c-pointer text-primary"
          title="Click to update"
        ></i>
      </p>
    );
  };

  const getMonthTarget = (item) => {
    // setVisibility(true);
    // setSumValue(0);
    // setModalData(item);
    // fetchMonthDataById(item);
    console.log("working");
  };
  const fetchMonthDataById = async (dataObj) => {
    const cMonth = new Date().getMonth() + 1;
    const date = new Date();
    setMonthName(date.toLocaleString("default", { month: "long" }));

    const payload = {
      Token: localStorage.getItem("access_token"),
      FPDealerWiseParam: [
        {
          // FYId: dataObj.FYId,
          Month: cMonth,
          DealerId: dataObj?.dealerid,
        },
      ],
    };
    try {
      const response = await axiosInstance.post(
        "GetFocusProductDealerWise",
        payload
      );

      if (response?.status === 200) {
        const result = response?.data?.Data;
        setSelectedRow(result); // add filterByDealer when data
        console.log("=====GetFocusProductDealerWise==== 65", result);

        const sumValue = result.reduce((acc, item) => {
          // Convert the Value property to a float, or use 0 if it's not a valid number
          const value = parseFloat(item.Value) || 0;

          // Add the current item's value to the accumulator
          return acc + value;
        }, 0);
        const formattedSumValue = sumValue.toFixed(2);

        setSumValue(formattedSumValue);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const popupCloseHandler = (e) => {
    setVisibility(e);
    // Close the modal by resetting the selected row and modal data
    setSelectedRow(null);
    setModalData(null);
    setSumValue(0);
  };
  const handleInputChange = (tableid, name, value, e) => {
    // Create a copy of the form data with the updated value
    const updatedFormData = selectedRow.map((row) =>
      row.tableid === tableid ? { ...row, [name]: value } : row
    );

    // Update the state with the new form data
    setSelectedRow(updatedFormData);

    const sumValue = updatedFormData.reduce((acc, item) => {
      const value = parseFloat(item.Value) || 0;

      // Add the current item's value to the accumulator
      return acc + value;
    }, 0);

    const result = sumValue.toFixed(2);
    setSumValue(result);
  };
  const handleSubmit = async (event) => {
    setSubmitForm(true);
    event.preventDefault();
    console.log("Form Data:", selectedRow);
    try {
      const payArr = selectedRow.map((item) => ({
        FYId: parseInt(item.FYId),
        Month: parseInt(item.Month),
        MarketSectorId: item.MarketSectorId,
        DealerId: modalData.dealerid,
        Value: item.Value,
        Volume: item.Volume,
      }));

      const payload = {
        Token: localStorage.getItem("access_token"),
        FocusedProductDealerWiseParam: payArr,
      };

      const response = await axiosInstance.post(
        "SetFocusedProductDealerWise",
        payload
      );

      if (response?.status === 200) {
        setDealerlist([]); //clear data
        fetchDealerMaster();
        popupCloseHandler(false);
      }
      setSubmitForm(false);
    } catch (error) {
      setSubmitForm(false);
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const lockData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      islock_id: 0,
      FYId: 5,
      month: date.getMonth() + 1,
      territory_id: data,
      islock: true,
    };
    try {
      const response = await axiosInstance.post(
        "api/Master/SetIsLockData",
        payload
      );

      if (response?.status === 200) {
        setIsLocked(true);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const getLockData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      islock_id: 0,
      FYId: 5,
      month: date.getMonth() + 1,
      territory_id: data,
    };
    try {
      const response = await axiosInstance.post(
        "api/Master/GetIsLockData",
        payload
      );

      if (response?.status === 200) {
        console.log("=====api/Master/GetIsLockData=== 65", response);
        if (response?.data?.Data.length) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  // useEffect(() => {
  //   getLockData();
  // }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          {isLocked ? (
            <button className="w3-btn btn-red">
              <i className="fa fa-lock  w3-text-red"></i>
            </button>
          ) : (
            <button className="w3-btn btn-red">
              <i className="fa fa-unlock  w3-text-yellow"></i>
            </button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <GridComponent
            locale="en-Us"
            id="Wgt_DelearUiGrid_id"
            key="Wgt_DelearUiGrid_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={dealerlist}
            // toolbar={toolbar}
            // toolbarClick={toolbarClick}
            enableStickyHeader={true}
            height={"500px"}
            ref={Wgt_DelearUiGridInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            editSettings={{
              allowEditing: true,
              mode: "Batch",
              persistSelection: true,
              showConfirmDialog: false,
            }}
            rowHeight={25}
            pageSettings={{ pageSize: 15, pageCount: 10 }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            frozenColumns={2}
            allowExcelExport={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="dealer_name"
                headerText={"Delear Name"}
                width="170"
                visible={true}
                textAlign="center"
                allowEditing={false}
                Freeze={true}
              />
              <ColumnDirective
                field="dealer_code"
                headerText={"Delear Code"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                Freeze={true}
              />
              <ColumnDirective
                field="customer_creationdate"
                headerText={"Creation Date"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                type="date"
                format="dd-MMM-yyyy"
                allowFiltering={false}
              />
              <ColumnDirective
                field="dealer_category"
                headerText={"Cat"}
                width="100"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
                // Freeze={true}
              />
              <ColumnDirective
                field="potential"
                headerText={"Potentials"}
                width="115"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
                // Freeze={true}
              />
              <ColumnDirective
                field="lYActualShare"
                headerText={" LY Actual   Share"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
                valueAccessor={percentageFormatter}
              />
              <ColumnDirective
                field="YTDActualPlanShare"
                headerText={" Ytd Actal + Plan Share"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
                valueAccessor={percentageFormatterYTD}
              />
              <ColumnDirective
                field="LY_Value"
                headerText={"LY"}
                width="100"
                visible={true}
                textAlign="center"
                allowEditing={false}
                // Freeze={true}
              />
              <ColumnDirective
                // field="Cy/Ytd"
                headerText={"CY / YTD"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                template={templateCyTd}
              />
              <ColumnDirective
                field="LastSixMonth_Avg_Sales"
                headerText={"6 month Avg. sale"}
                width="110"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field={`${mStartName}_Month_LY_Value`}
                headerText={"LY Same Month"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              {/* {generateColumns} */}

              {gridMonth.map((val) => (
                <ColumnDirective
                  headerText={val}
                  width="130"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={false}
                  template={(args) => nonCurMonTemp(args, val)}
                />
              ))}
              <ColumnDirective
                field="OS"
                headerText={`OS (${mStartName})`}
                width="120"
                allowFiltering={false}
                allowEditing={false}
              />
              <ColumnDirective
                field="OD"
                headerText={`OD (${mStartName})`}
                width="120"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
              />
              <ColumnDirective
                field="tDue"
                headerText={`Total Due (${mStartName})`}
                width="150"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
              />
              <ColumnDirective
                // field="OS"
                headerText={`Sales (${mStartName})`}
                width="100"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
                template={salesTemplate}
              />
              <ColumnDirective
                field="collectionVal"
                headerText={`Collection (${mStartName})`}
                width="150"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
              />
              <ColumnDirective
                headerText={`LYYTD vs CYYTD (${mStartName})`}
                width="180"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
                template={lastTdTemplate}
              />
              <ColumnDirective
                headerTemplate={"Action"}
                textAlign="Center"
                width="100"
                template={commmandTemplate}
              />
            </ColumnsDirective>
            <Inject
              services={[
                Edit,
                CommandColumn,
                Freeze,
                Page,
                Filter,
                Toolbar,
                ExcelExport,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};
export default Wgt_Delear_Ui;
