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
  AggregateColumnDirective,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import ResponsePopup from "../../common/ResponsePopup";
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
  const [sortDirection, setSortDirection] = useState(""); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);
  const [monthKey, setMonthKey] = useState(cMName + "_Month_Value_v1");
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  useEffect(() => {
    fetchDealerMaster();
    sortMonth();
  }, [data]);

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
    setResponseDetails({ show: false, message: "", type: "" });
  };

  const DataBoundFocused = (args) => {
    if (selectedRow.length > 0) {
      selectedRow.map((val, index) => {
        if (val.IsFocused === 1) {
          Wgt_DelearUiGridInstancePopup.current
            .getRowByIndex(index)
            .classList.add("IsFocused");
        }
      });
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
      <>
        <th
          style={{ textWrap: "nowrap" }}
          title="Creepage + OD"
        >{`Total Due (${mStartName})`}</th>
      </>
    );
  };
  const salesHeadTemplate = () => {
    return (
      <>
        <th title="V0 vs V1">{`Sales (${mStartName})`}</th>
      </>
    );
  };

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
            <button className="w3-btn btn-red" onClick={lockData}>
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
            toolbar={toolbar}
            toolbarClick={toolbarClick}
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
            allowSorting={true}
            commandClick={getMonthTarget}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="dealer_name"
                headerText={"Dealer Name"}
                width="170"
                visible={true}
                textAlign="center"
                allowEditing={false}
                Freeze={true}
              />
              <ColumnDirective
                field="dealer_code"
                headerText={"Dealer Code"}
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
                headerText={" Ytd Actual + Plan Share"}
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
                textAlign="center"
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
                headerTemplate={tDueTemplate}
                // headerText={`Total Due (${mStartName})`}
                width="150"
                textAlign="center"
                allowFiltering={false}
                allowEditing={false}
              />
              <ColumnDirective
                // field="OS"
                headerTemplate={salesHeadTemplate}
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
                commands={commmandTemplate}
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
                Sort,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
      <CustomPopup
        onClose={popupCloseHandler}
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
            allowPaging={true}
            gridLines="Both"
            editSettings={{
              allowEditing: true,
              mode: "Batch",
              persistSelection: true,
              showConfirmDialog: false,
            }}
            rowHeight={25}
            pageSettings={{ pageSize: 15, pageCount: 10 }}
            dataBound={DataBoundFocused}
            cellSaved={handleCellSaved}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="serialNo"
                headerText="#"
                width="90"
                textAlign="center"
                allowEditing={false}
              />
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
                textAlign="center"
                allowEditing={false}
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
                headerText={`LY ${monthName}`}
                width="100"
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
                headerText="Value (Lacs)"
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

            <Inject services={[Edit, Page, Sort, Aggregate]} />
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
        onClose={handleCloseResponse}
      />
    </>
  );
};
export default Wgt_Delear_Ui;
