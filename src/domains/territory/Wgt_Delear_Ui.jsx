import React, { useState, useEffect, useRef, useMemo } from "react";
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
  AggregateColumnDirective,
  Sort,
  ForeignKey,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import ResponsePopup from "../../common/ResponsePopup";
import ConfirmResponsePopup from "../../common/ResponsePopup/ConfirmResponse";
import Popup from "../../common/DialogPopup/DialogPopup";
import { formatDate } from "../../common/dateFormat";
// import CustomPopup1 from "../../common/DialogPopup/DialogPopup";
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

const Wgt_Delear_Ui = ({ data, handleDealerPopup }) => {
  const dispatch = useDispatch();
  let Wgt_DelearUiGridInstance = useRef();
  let dealerPopupInstance = useRef();
  let Wgt_DelearUiGridInstancePopup = useRef();
  const [getinputs, setGetinputs] = useState({});
  const [dealerlist, setDealerlist] = useState([]);
  const [gridMonth, setGridMonth] = useState([]);
  const currentMonthCount =
    date.getMonth() < 3 ? date.getMonth() + 13 : date.getMonth() + 1;
  const [currentMonth, setCurrentMonth] = useState(currentMonthCount);
  const [visibility, setVisibility] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);

  const [selectedRow, setSelectedRow] = useState([]);
  const [sumValue, setSumValue] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [monthName, setMonthName] = useState("");

  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(""); // To store the current sorting field (empty for no sorting)
  const [openDealerPopup, setopenDealerPopup] = useState(false); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);
  const [monthKey, setMonthKey] = useState(cMName + "_Month_Value_v1");
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });
  const [minDate, setMinDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [formDetails, setFormDetails] = useState({
    Sno: 0,
    dealer_name: "",
    city: "",
    potential: 0,
    SalesValPlan: 0,
    EstOnBoardDate: "",
  });
  const [errors, setErrorDetails] = useState({
    dealer_name: "",
    city: "",
    SalesValPlan: "",
    EstOnBoardDate: "",
    potential: "",
  });

  const [confirmResponseDetails, setConfirmResponseDetails] = useState({
    type: "error",
    show: false,
    message: "Do you want to Lock",
  });
  const [dealerPopupGridData, setDealerPoupGridData] = useState([]);

  useEffect(() => {
    fetchDealerMaster();
    sortMonth();
    getNewDealerData();
  }, [data]);

  const getNewDealerData = async () => {
    const cMonth = new Date().getMonth() + 1;
    const payload = {
      Token: localStorage.getItem("access_token"),
      TerritoryId: data,
      Month: cMonth,
    };

    try {
      const response = await axiosInstance.post("GetNewDealerPlan", payload);

      if (response?.status === 200) {
        const result = response?.data?.Data;
        let changeFormat = [];
        if (result.length > 0) {
          result.map((val, index) => {
            changeFormat.push({
              Sno: val.tableid,
              dealer_name: val.dealer_name,
              city: val.city,
              potential: parseInt(val.potential),
              SalesValPlan: parseInt(val.salesvalueplan),
              EstOnBoardDate: val.salesvalueplan,
            });
          });
          setDealerPoupGridData([...changeFormat]);
        }
      }

      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

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

  const commmandTemplate = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
  ];
  const getMonthTarget = (item) => {
    let rowData = item.rowData;
    setLoading(true);
    setVisibility(true);
    setSumValue(0);
    setModalData(rowData);
    fetchMonthDataById(rowData);
  };
  const fetchMonthDataById = async (dataObj) => {
    const cMonth = new Date().getMonth() + 1;
    const date = new Date();
    let monthName1 = date.toLocaleString("default", { month: "long" });
    setMonthName(monthName1);

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
        if (result.length > 0) {
          result.map((val, index) => {
            val.serialNo = index + 1;
          });
        }
        setSelectedRow(result);
        const sumValue = result.reduce((acc, item) => {
          const value = parseFloat(item.Value) || 0;
          return acc + value;
        }, 0);
        const formattedSumValue = sumValue.toFixed(2);

        setSumValue(formattedSumValue);
      }

      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const popupCloseHandler = (e) => {
    Wgt_DelearUiGridInstance.current.refresh();

    setVisibility(false);
    setSelectedRow([]);
    setModalData(null);
    setSumValue(0);
  };

  const handleCellSaved = (args) => {
    let change_records = [...selectedRow];
    if (args.columnName == "Volume") {
      change_records.map((val) => {
        if (args.rowData.tableid == val.tableid) {
          val.Volume = args.value;
        }
      });
    }
    if (args.columnName == "Value") {
      change_records.map((val) => {
        if (args.rowData.tableid == val.tableid) {
          val.Value = args.value;
        }
      });
    }

    setSelectedRow([...change_records]);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setSubmitForm(true);
    event.preventDefault();

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
        if (response?.data?.Status == true) {
          setResponseDetails({
            type: "success",
            show: true,
            message: response?.data?.Data[0].MESSAGE,
          });
          setDealerlist([]); //clear data
          fetchDealerMaster();
          popupCloseHandler(false);
        } else {
          setResponseDetails({
            type: "error",
            show: true,
            message: response?.data?.Data[0].MESSAGE,
          });
        }
      }
      setSubmitForm(false);
      setLoading(false);
    } catch (error) {
      setSubmitForm(false);
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const handleCloseResponse = () => {
    setConfirmResponseDetails({ show: false });
    setResponseDetails({ show: false, message: "", type: "" });
  };

  const DataBoundFocused = (args) => {
    if (args.row) {
      if (getValue("IsFocused", args.data) === 1) {
        args.row.classList.add("IsFocused");
      }
    }
  };
  const lockData = async () => {
    setLoading(true);
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
        handleCloseResponse();
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  // Lock / Unlock
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

  useEffect(() => {
    getLockData();
  }, [data]);

  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      Wgt_DelearUiGridInstance.current &&
      args.item.id === "Wgt_DelearUiGrid_id_excelexport"
    ) {
      const arrObj = dealerlist.map((element, index) => ({
        "S.No": index + 1,
        "Dealer Name": element.dealer_name,
        "Dealer Code": element.dealer_code,
        "Creation Date": formatDateTimes(element.customer_creationdate),
        Category: element.dealer_category,
        Potential: element.potential,
        "LY Actual Share (%)": element.lYActualShare,
        "Ytd Actual + Plan Share(%)": element.YTDActualPlanShare,
        LY: element.LY_Value,
        "CY Plan": element.CY_Value,
        YTD: element.YTD_Value,
        "6 month": element.LastSixMonth_Avg_Sales,
        OS: element.OS,
        OD: element.OD,
        "LYYTD vs CYYTD": element.LYYTDvsCYYTD,
        Apr: element.Apr_Month_Value_v1,
        "Apr Sale": element.Apr_Month_Sale,
        May: element.May_Month_Value_v1,
        "May Sale": element.May_Month_Sale,
        Jun: element.Jun_Month_Value_v1,
        "Jun Sale": element.Jun_Month_Sale,
        Jul: element.Jul_Month_Value_v1,
        "Jul Sale": element.Jul_Month_Sale,
        Aug: element.Aug_Month_Value_v1,
        "Aug Sale": element.Aug_Month_Sale,
        Sep: element.Sep_Month_Value_v1,
        "Sep Sale": element.Sep_Month_Sale,
        Oct: element.Oct_Month_Value_v1,
        "Oct Sale": element.Oct_Month_Sale,
        Nov: element.Nov_Month_Value_v1,
        "Nov Sale": element.Nov_Month_Sale,
        Dec: element.Dec_Month_Value_v1,
        "Dec Sale": element.Dec_Month_Sale,
        Jan: element.Jan_Month_Value_v1,
        "Jan Sale": element.Feb_Month_Sale,
        Feb: element.Feb_Month_Value_v1,
        "Feb Sale": element.Feb_Month_Sale,
        Mar: element.Mar_Month_Value_v1,
        "Mar Sale": element.Mar_Month_Sale,
      }));
      ExportExcel("ssDealer-Wise-Monthly-Plan-Achievement", arrObj);
    }
  };
  const tDueTemplate = () => {
    return (
      <span>
        <th
          style={{ textWrap: "nowrap", paddingLeft: "0px" }}
          title="Creepage + OD"
        >{`Total Due`}</th>
      </span>
    );
  };
  const salesHeadTemplate = () => {
    return (
      <>
        <th title="V0 vs V1">{`Sales `}</th>
      </>
    );
  };

  const Rows = useMemo(() => {
    const rows = [
      {
        field: "dealer_name",
        headerText: "Dealer Name",
        width: "170",
        visible: true,
        freeze: "Left",
      },
      {
        field: "dealer_code",
        headerText: "Dealer Code",
        width: "130",
        visible: true,
        freeze: "Left",
      },
      {
        field: "customer_creationdate",
        headerText: "Creation Date",
        width: "130",
        visible: true,
        textAlign: "center",
        allowEditing: false,
        type: "date",
        format: "dd-MMM-yyyy",
        allowFiltering: false,
      },
      {
        field: "dealer_category",
        headerText: "Category",
        width: "130",
        visible: true,
        allowFiltering: true,
      },
      {
        field: "potential",
        headerText: "Potentials",
        width: "115",
        visible: true,
        allowFiltering: false,
      },
      {
        field: "lYActualShare",
        headerText: "LY Actual Share",
        width: "130",
        visible: true,
        allowFiltering: false,
        valueAccessor: percentageFormatter,
      },
      {
        field: "YTDActualPlanShare",
        headerText: "Ytd Actual + Plan Share",
        width: "130",
        visible: true,
        allowFiltering: false,
        valueAccessor: percentageFormatterYTD,
      },
      {
        field: "LY_Value",
        headerText: "LY",
        width: "100",
        visible: true,
        allowFiltering: false,
      },
      {
        // field: "LY_Value",
        headerText: "CY / YTD",
        width: "100",
        visible: true,
        allowFiltering: false,
        textAlign: "center",
        template: templateCyTd,
      },
      {
        field: "LastSixMonth_Avg_Sales",
        headerText: "6 month Avg. sale",
        width: "115",
        visible: true,
        allowFiltering: false,
      },
      {
        field: `${mStartName}_Month_LY_Value`,
        headerText: "LY Same Month",
        width: "130",
        visible: true,
        allowFiltering: false,
      },
    ];
    gridMonth.map((val) => {
      rows.push({
        headerText: val,
        width: "130",
        allowFiltering: false,
        textAlign: "center",
        template: (args) => nonCurMonTemp(args, val),
      });
    });
    rows.push({
      columns: [
        {
          // format: "C2",
          field: "OS",
          headerText: "OS",
          width: 90,
          allowEditing: false,
          allowFiltering: false,
        },
        {
          // format: "C2",
          field: "OD",
          headerText: "OD",
          width: 90,
          allowEditing: false,
          allowFiltering: false,
        },
        {
          // format: "C2",
          field: "tDue",
          headerText: "Total Due",
          width: 100,
          headerTemplate: tDueTemplate,
          allowEditing: false,
          allowFiltering: false,
        },
        {
          // format: "C2",
          field: "LY_Value",
          headerTemplate: salesHeadTemplate,
          width: 100,
          textAlign: "center",
          allowEditing: false,
          allowFiltering: false,
          template: salesTemplate,
        },
        {
          // format: "C2",
          field: "tDue",
          headerText: "Collection",
          width: 120,
          allowEditing: false,
          allowFiltering: false,
        },
        {
          headerText: "LYYTD vs CYYTD",
          width: 180,
          textAlign: "center",
          allowEditing: false,
          allowFiltering: false,
          template: lastTdTemplate,
        },
        {
          headerTemplate: "Action",
          textAlign: "center",
          width: "100",
          commands: commmandTemplate,
          // freeze: "Right",
        },
      ],
      headerText: mStartName,
      textAlign: "center",
    });

    return rows;
  }, [dealerlist]);

  const handleRowDataBound = (args) => {
    if (args.row) {
      let limitPercentage = (20 / 100) * getValue("OS", args.data);
      if (getValue("OD", args.data) > limitPercentage) {
        args.row.classList.add("below-20");
      }
    }
  };
  const handleDealerPopupOpen = () => {
    setopenDealerPopup(true);
  };
  const handleDealerPopupClose = () => {
    setopenDealerPopup(false);
  };
  const commmandTemplateDel = [
    {
      type: "Delete",
      buttonOption: {
        cssClass: "e-flat ",
        iconCss: "e-delete e-icons e-redicon",
      },
    },
  ];

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const ErrorMsg = "This Field Can't be Blank";
    if (e.target) {
      if (name === "potential" || name === "SalesValPlan") {
        setFormDetails({ ...formDetails, [name]: parseInt(value) });
        setErrorDetails({
          ...errors,
          [name]: value ? "" : ErrorMsg,
        });
      } else {
        setFormDetails({ ...formDetails, [name]: value });
        setErrorDetails({
          ...errors,
          [name]: value ? "" : ErrorMsg,
        });
      }
    }
  };
  const validateForm = () => {
    let formIsValid = true;
    let error = errors;
    const ErrorMsg = "This Field Can't be Blank";
    if (formDetails["dealer_name"] == "") {
      formIsValid = false;
      error["dealer_name"] = ErrorMsg;
    }
    if (formDetails["city"] == "") {
      formIsValid = false;
      error["city"] = ErrorMsg;
    }
    if (formDetails["SalesValPlan"] == "" || formDetails["SalesValPlan"] == 0) {
      formIsValid = false;
      error["SalesValPlan"] = ErrorMsg;
    }
    if (formDetails["potential"] == "" || formDetails["potential"] == 0) {
      formIsValid = false;
      error["potential"] = ErrorMsg;
    }
    if (formDetails["EstOnBoardDate"] == "") {
      formIsValid = false;
      error["EstOnBoardDate"] = ErrorMsg;
    }

    setErrorDetails({ ...error });
    return formIsValid;
  };

  const handleAdd = () => {
    if (validateForm()) {
      let newDetails = { ...formDetails };
      if (dealerPopupGridData.length !== 0) {
        newDetails.Sno = dealerPopupGridData.length + 1;
      }
      setDealerPoupGridData([...dealerPopupGridData, newDetails]);
    }
  };

  const handlePopupDataSubmit = async () => {
    let apidata = [...dealerPopupGridData];
    let change_records =
      dealerPopupInstance.current.getBatchChanges().changedRecords;
    let deleted_records =
      dealerPopupInstance.current.getBatchChanges().deletedRecords;
    if (change_records.length > 0) {
      change_records.map((val) => {
        let matchIndex = apidata.findIndex((itm) => itm.Sno === val.Sno);
        if (matchIndex > -1) {
          apidata[matchIndex] = val;
        }
      });
    }
    if (deleted_records.length > 0) {
      deleted_records.map((val) => {
        let matchIndex = apidata.findIndex((itm) => itm.Sno === val.Sno);
        if (matchIndex > -1) {
          apidata.splice(matchIndex, 1);
        }
      });
    }
    //  const
    const cMonth = new Date().getMonth() + 1;

    let newDealerPayload = [];
    apidata.map((val) => {
      newDealerPayload.push({
        TerritoryId: data,
        Month: cMonth,
        DealerName: val.dealer_name,
        City: val.city,
        Potential: parseInt(val.potential),
        SalesValuePlan: parseInt(val.SalesValPlan),
        OnBoaringDate: formatDate(val.EstOnBoardDate),
      });
    });
    const payload = {
      Token: localStorage.getItem("access_token"),
      PlanNewDealerParam: newDealerPayload,
    };

    try {
      const response = await axiosInstance.post("SetNewDealerPlan", payload);
      if (response?.status === 200) {
        if (response?.data?.Status == true) {
          setopenDealerPopup(false);

          setTimeout(() => {
            setResponseDetails({
              type: "success",
              show: true,
              message: response.data.Message,
            });
          }, 2000);
          setFormDetails({
            Sno: 0,
            dealer_name: "",
            city: "",
            potential: 0,
            SalesValPlan: 0,
            EstOnBoardDate: "",
          });
          setDealerPoupGridData([]);
        } else {
          setResponseDetails({
            type: "error",
            show: true,
            message: response.data.Message,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <Row>
          <Col xl={1} lg={1} md={2} sm={2} className="pr-0">
            {isLocked ? (
              <button className=" icon-button">
                <i className="fa fa-lock  w3-text-red"></i>
              </button>
            ) : (
              <button
                className=" icon-button"
                onClick={() =>
                  setConfirmResponseDetails({
                    ...confirmResponseDetails,
                    show: true,
                  })
                }
              >
                <i className="fa fa-unlock  w3-text-yellow"></i>
              </button>
            )}
          </Col>
          <Col xl={3} lg={3} md={3} sm={4} className="pl-0">
            {" "}
            <button className="buttonForMainUi" onClick={handleDealerPopupOpen}>
              <span style={{ fontFamily: "Nunito sans" }}>
                New Dealer Planning
              </span>
            </button>{" "}
          </Col>
        </Row>
        <Row>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ marginTop: "15px" }}
          >
            <GridComponent
              locale="en-Us"
              id="Wgt_DelearUiGrid_id"
              key="Wgt_DelearUiGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={dealerlist}
              toolbar={toolbar}
              toolbarClick={toolbarClick}
              height={"500px"}
              ref={Wgt_DelearUiGridInstance}
              allowPaging={true}
              allowSelection={true}
              gridLines="Both"
              rowHeight={25}
              pageSettings={{ pageSize: 15, pageCount: 10 }}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              frozenColumns={2}
              allowExcelExport={true}
              allowSorting={true}
              commandClick={getMonthTarget}
              rowDataBound={handleRowDataBound}
              columns={Rows}
            >
              <Inject
                services={[
                  CommandColumn,
                  Freeze,
                  Page,
                  Filter,
                  Toolbar,
                  ExcelExport,
                  Sort,
                  ForeignKey,
                ]}
              />
            </GridComponent>
          </Col>
        </Row>
        <CustomPopup
          onClose={() => popupCloseHandler()}
          show={visibility}
          title={
            modalData?.dealer_name +
            "(" +
            modalData?.dealer_code +
            ") - Month : " +
            monthName
          }
        >
          <span className="h6 w3-small">
            (Dealer Month Sales Plan + Focus Sector Breakup )
          </span>
          <span className="h6 w3-small" style={{ color: "red" }}>
            (Double click on Cell to edit* )
          </span>
          <hr />

          <form className="w3-container" onSubmit={handleSubmit}>
            <table className="w3-table table-bordered w3-small ">
              <tr className="w3-gray">
                <td colspan="30">
                  A : Sales Plan Produced by Dealer Level Rules
                </td>
              </tr>
              <tr className="">
                <td style={{ width: "90%" }}>
                  Rule 1 : Active Dealer <br />
                  Rule 2 : Category based % impact <br />
                </td>
                <td style={{ width: "10%" }}>
                  <input
                    type="text"
                    value={modalData ? modalData[monthKey] : ""}
                    className="inp40 text-center"
                    readOnly={true}
                  />
                </td>
              </tr>
            </table>
            <table className="w3-table table-bordered w3-small ">
              <tr className="w3-gray">
                <td colspan="29">
                  B ( Focus Sector List for Month of {monthName} ) * Add values
                  / volume
                  <span style={{ float: "right" }}>
                    Hight lighted rows are focus product for current month
                  </span>
                </td>
              </tr>
            </table>
            <GridComponent
              locale="en-Us"
              id="Wgt_DelearUiGridPopup_id"
              key="Wgt_DelearUiGridPopup_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={selectedRow}
              enableStickyHeader={true}
              height={"400px"}
              ref={Wgt_DelearUiGridInstancePopup}
              allowPaging={false}
              gridLines="Both"
              editSettings={{
                allowEditing: true,
                mode: "Batch",
                persistSelection: true,
                // showConfirmDialog: false,
              }}
              rowHeight={25}
              rowDataBound={DataBoundFocused}
              cellSaved={handleCellSaved}
              frozenColumns={1}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="tableid"
                  haederText="table Id"
                  visible={false}
                  isPrimaryKey={true}
                />
                <ColumnDirective
                  field="MarketSectorName"
                  headerText="Focus Product Sector"
                  width="150"
                  textAlign="left"
                  allowEditing={false}
                  freeze="Left"
                />
                <ColumnDirective
                  field="LLY"
                  headerText="LLY"
                  width="100"
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="LY"
                  headerText="LY"
                  width="100"
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="YTD"
                  headerText="YTD"
                  width="100"
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="Last6MonthAvgSales"
                  headerText="6 Mo. Avg"
                  width="100"
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="SameMonthLY"
                  headerText={`LY (${mStartName})`}
                  width="80"
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="Volume"
                  headerText="Volume (Ltrs.)"
                  width="150"
                  textAlign="center"
                  editType="numericedit"
                  allowEditing={true}
                />
                <ColumnDirective
                  field="Value"
                  headerText="Value (Rs.)"
                  width="150"
                  editType="numericedit"
                  textAlign="center"
                  allowEditing={true}
                />
              </ColumnsDirective>
              <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective
                      field="Value"
                      type="Sum"
                      format="N2"
                    />
                  </AggregateColumnsDirective>
                </AggregateDirective>
              </AggregatesDirective>

              <Inject
                services={[Edit, Sort, Aggregate, CommandColumn, Freeze]}
              />
            </GridComponent>
            <table className="w3-table table-bordered w3-small ">
              <tr className="w3-gray">
                <td colspan="30">
                  Net Sales Plan ( {monthName} ) Total Sale A + B
                </td>
              </tr>
              <tr className="">
                <td style={{ width: "80%" }}>
                  ( This total will be updated to Dealers Sales Plan ( v1 ) and
                  the list will will be added in transaction table as dealers
                  breakup )
                </td>
                <td style={{ width: "10%" }} align="right">
                  {isLocked ? null : submitForm ? (
                    <i className="w3-button fa fa-spinner"></i>
                  ) : (
                    <button className="w3-button w3-indigo">Submit</button>
                  )}
                </td>
              </tr>
            </table>
          </form>
        </CustomPopup>
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
          onConfirm={lockData}
          onClose={() => handleCloseResponse()}
        />
        {openDealerPopup ? (
          <Popup isOpen={openDealerPopup} onClose={handleDealerPopupClose}>
            <div className="paddingForPopupTerritory">
              <div className="titlePopupHeader">New Dealer Planning</div>
              <div
                className="employeeForm-component"
                style={{ marginBottom: "10px" }}
              >
                <Row>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <label className="formlabel">Dealer Name*</label>
                    <input
                      type="text"
                      name="dealer_name"
                      value={formDetails.dealer_name}
                      onChange={handleChange}
                    />
                    {errors.dealer_name && (
                      <span style={{ color: "red" }}>{errors.dealer_name}</span>
                    )}
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <label className="formlabel">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formDetails.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <span style={{ color: "red" }}>{errors.city}</span>
                    )}
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <label className="formlabel">Potentail(Lacs)</label>
                    <input
                      type="number"
                      name="potential"
                      value={formDetails.potential}
                      onChange={handleChange}
                    />
                    {errors.potential && (
                      <span style={{ color: "red" }}>{errors.potential}</span>
                    )}
                  </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <label className="formlabel">Sales Value Plan(Rs.)*</label>
                    <input
                      type="number"
                      name="SalesValPlan"
                      value={formDetails.SalesValPlan}
                      onChange={handleChange}
                    />
                    {errors.SalesValPlan && (
                      <span style={{ color: "red" }}>
                        {errors.SalesValPlan}
                      </span>
                    )}
                  </Col>
                  <Col xl={4} lg={4} md={5} sm={5} xs={5}>
                    <label className="formlabel">
                      Estimated Onboarding Date
                    </label>
                    <input
                      type="date"
                      name="EstOnBoardDate"
                      min={minDate}
                      value={formDetails.EstOnBoardDate}
                      onChange={handleChange}
                    />
                    {errors.EstOnBoardDate && (
                      <span style={{ color: "red" }}>
                        {errors.EstOnBoardDate}
                      </span>
                    )}
                  </Col>
                  <Col xl={2} lg={2} md={2} sm={2}>
                    <div style={{ marginTop: "20px" }}>
                      <button
                        className="buttonForMainUi"
                        onClick={() => handleAdd()}
                      >
                        <span style={{ fontFamily: "Nunito sans" }}>Add</span>
                      </button>{" "}
                    </div>
                  </Col>
                </Row>
              </div>
              <div id={"hjfcjh"}>
                <GridComponent
                  locale="en-Us"
                  id="new_DelearUiGridPopup_id"
                  key="new_DelearUiGridPopup_id"
                  allowTextWrap={true}
                  allowResizing={false}
                  dataSource={dealerPopupGridData}
                  editSettings={{
                    allowEditing: true,
                    mode: "Batch",
                    persistSelection: true,
                    allowDeleting: true,
                    // showConfirmDialog: false,
                  }}
                  enableStickyHeader={true}
                  height={"300px"}
                  toolbar={["Delete"]}
                  ref={dealerPopupInstance}
                  allowPaging={false}
                  gridLines="Both"
                  rowHeight={25}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="Sno"
                      haederText="S No."
                      visible={false}
                      width="50"
                      isPrimaryKey={true}
                    />
                    <ColumnDirective
                      field="dealer_name"
                      headerText="Dealer Name"
                      width="100"
                      textAlign="left"
                      allowEditing={true}
                    />
                    <ColumnDirective
                      field="city"
                      headerText="City"
                      width="100"
                      textAlign="left"
                      allowEditing={true}
                    />
                    <ColumnDirective
                      field="potential"
                      headerText="Potential(Lacs)"
                      width="100"
                      textAlign="center"
                      editType="numericedit"
                      allowEditing={true}
                    />
                    <ColumnDirective
                      field="SalesValPlan"
                      headerText="Sales Value Plan(Rs)"
                      width="100"
                      textAlign="center"
                      editType="numericedit"
                      allowEditing={true}
                    />

                    <ColumnDirective
                      field="EstOnBoardDate"
                      headerText="Estimated Onboarding Date"
                      width="130"
                      textAlign="center"
                      allowEditing={true}
                      editType="datepickeredit"
                      type="date"
                      format="dd-MMM-yyyy"
                    />
                  </ColumnsDirective>
                  <AggregatesDirective>
                    <AggregateDirective>
                      <AggregateColumnsDirective>
                        <AggregateColumnDirective
                          field="potential"
                          type="Sum"
                          format="N2"
                        />
                        <AggregateColumnDirective
                          field="SalesValPlan"
                          type="Sum"
                          format="N2"
                        />
                      </AggregateColumnsDirective>
                    </AggregateDirective>
                  </AggregatesDirective>

                  <Inject
                    services={[Edit, Sort, Aggregate, CommandColumn, Freeze]}
                  />
                </GridComponent>
              </div>
              {isLocked ? null : (
                <div className="titlePopupHeader" style={{ marginTop: "10px" }}>
                  <button
                    className="buttonForMainUi"
                    style={{ backgroundColor: "#5a240e" }}
                    onClick={handlePopupDataSubmit}
                  >
                    <span style={{ fontFamily: "Nunito sans" }}>
                      {" "}
                      Save Details
                    </span>
                  </button>
                </div>
              )}
            </div>
          </Popup>
        ) : null}
      </section>
    </>
  );
};
export default Wgt_Delear_Ui;
