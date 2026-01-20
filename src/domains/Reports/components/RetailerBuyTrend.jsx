import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import { useDispatch, useSelector } from "react-redux";
import LoadingPlaceholder from "../../../components/LoadingPlaceholder";
import ExportExcel from "../../ExportExcel";
import { GetPercent, fNWCommas, getMonths } from "../../../utils/utils";
import { Row, Col, Button } from "reactstrap";
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
  AggregateColumnDirective,
  Toolbar,
  ExcelExport,
  Sort,
  InfiniteScroll,
  Resize,
  Group,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../../common/Loader";
import { useReducer } from "react";
import { ServerAPI } from "../../../auth/api";

const RetailBuyTrendReport = ({ toggleState }) => {
  const { AuthData } = useSelector((state) => state?.auth);
  let dispatch = useDispatch();
  const [gridData, setGridData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [yearList, setYearLIst] = useState([]);
  const [fyId, setFYear] = useState(0);
  let proPlanReportInstance = useRef();

  useEffect(() => {
    // fetchGridData();
    fetchYearList();
  }, [toggleState]);

  const fetchGridData = async () => {
    let employeeId = AuthData.Data[0]?.EmployeeID;
    if (fyId != 0) {
      setLoading(true);
      fetch(
        ServerAPI +
          `api/GetReportWithOutParameter/RetailerBuyingTrend/${fyId}/${employeeId}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            if (Array.isArray(res.Data.Table) && res?.Data?.Table.length > 0) {
              res.Data.Table.map((val, index) => {
                val.Sno = index + 1;
              });
              setGridData(res.Data.Table);
            } else {
              setGridData([]);
            }
          }
          setLoading(false);
        })
        .catch((err) =>
          console.log("Error While trying to get the DealerPotentialReport  ")
        );
    }
  };

  const handleToolbarClick = (args) => {
    let cur_timestamp = Math.floor(Date.now() / 1000);
    let export_file_name = "RetailBUyTrendReport" + cur_timestamp;
    if (args.item.text === "Excel Export") {
      proPlanReportInstance.current.excelExport({
        fileName: export_file_name + ".xlsx",
      });
    } else if (args.item.text === "CSV Export") {
      proPlanReportInstance.current.csvExport({
        fileName: export_file_name + ".csv",
      });
    }
  };

  const dataBound = () => {
    if (proPlanReportInstance.current) {
      proPlanReportInstance.current.autoFitColumns([
        "Sno",
        "zone_name",
        "depot_code",
        "depot_name",
        "area_code",
        "area_name",
        "employee_name",
        "CustomerType",
        "customercode",
        "customername",
        "CustomerStatus",
        "Apr_Month_Sale_act",
        "May_Month_Sale_act",
        "Jun_Month_Sale_act",
        "Jul_Month_Sale_act",
        "Aug_Month_Sale_act",
        "Sep_Month_Sale_act",
        "Oct_Month_Sale_act",
        "Nov_Month_Sale_act",
        "Dec_Month_Sale_act",
        "Jan_Month_Sale_act",
        "Feb_Month_Sale_act",
        "Mar_Month_Sale_act",
      ]);
    }
  };

  const fetchYearList = async () => {
    setLoading(true);
    const payload = {
      Token: localStorage.getItem("access_token"),
      FPDealerWiseParam: [
        {
          FYId: 0,
        },
      ],
    };
    try {
      const res = await axiosInstance.post("api/Master/GetFYList", payload);
      if (res?.status === 200) {
        if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
          setYearLIst(res.data.Data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const yearDropDwn = () => {
    return yearList.map((item, index) => (
      <option key={item?.fy_id} value={item?.fy_id}>
        {item?.fy_name}
      </option>
    ));
  };

  const handleYearChange = (event) => {
    setFYear(parseInt(event.target.value));
    setGridData([]);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <span style={{ fontWeight: "600" }}>Year</span>
          <select
            className="form-control"
            value={fyId}
            onChange={handleYearChange}
          >
            <option value="0">Select Year</option>
            {yearDropDwn()}
          </select>
        </Col>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <Button
            style={{ background: "green", border: "none", marginTop: "1.4rem" }}
            disabled={fyId == 0 ? true : false}
            onClick={fetchGridData}
          >
            <i className="fa fa-refresh" style={{ marginRight: "3px" }}></i>Get
            Report
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "10px" }}>
          <GridComponent
            locale="en-Us"
            id="DealerPotentialGrid_id"
            key="DealerPotentialGrid_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={gridData}
            height={"450px"}
            ref={proPlanReportInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            pageSettings={{
              pageSizes: [10, 20, 30, 40, 50, 60, "All"],
              pageCount: 15,
            }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
            toolbar={["ExcelExport", "Search"]}
            allowGrouping={true}
            toolbarClick={handleToolbarClick}
            dataBound={dataBound}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="Sno"
                headerText={"S No"}
                visible={true}
                // width="120"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={false}
              />

              <ColumnDirective
                field="zone_name"
                headerText={"Zone Code"}
                visible={true}
                // width="170"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="depot_code"
                headerText={"Depot Code"}
                visible={true}
                // width="160"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="depot_name"
                headerText={"Depot Name"}
                visible={true}
                textAlign="left"
                // width="250"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="area_code"
                headerText={"TTY Code"}
                // width="180"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={true}
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="employee_name"
                headerText={"FSS Name"}
                // width="140"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="CustomerType"
                headerText={"Type"}
                // width="140"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="customercode"
                headerText={"Dealer Code"}
                // width="220"
              />
              <ColumnDirective
                field="customername"
                headerText={"Dealer Name"}
                // width="220"
              />
              <ColumnDirective
                field="CreatedDate"
                headerText={"Creation date"}
                width="220"
                type="date"
                format={"dd-MMM-yyyy"}
                textAlign="center"
              />
              <ColumnDirective
                field="CustomerStatus"
                headerText={"Dealer Status"}
                // width="140"
                // type="date"
                // format={"dd-MMM-yyyy"}
                // textAlign="center"
              />
              <ColumnDirective field="Apr_Month_Sale_act" headerText={"Apr"} />
              <ColumnDirective field="May_Month_Sale_act" headerText={"May"} />
              <ColumnDirective field="Jun_Month_Sale_act" headerText={"Jun"} />
              <ColumnDirective field="Jul_Month_Sale_act" headerText={"Jul"} />
              <ColumnDirective field="Aug_Month_Sale_act" headerText={"Aug"} />
              <ColumnDirective field="Sep_Month_Sale_act" headerText={"Sep"} />
              <ColumnDirective field="Oct_Month_Sale_act" headerText={"Oct "} />
              <ColumnDirective field="Nov_Month_Sale_act" headerText={"Nov "} />
              <ColumnDirective field="Dec_Month_Sale_act" headerText={"Dec "} />
              <ColumnDirective field="Jan_Month_Sale_act" headerText={"Jan "} />
              <ColumnDirective field="Feb_Month_Sale_act" headerText={"Feb "} />
              <ColumnDirective field="Mar_Month_Sale_act" headerText={"Mar "} />
            </ColumnsDirective>

            <Inject
              services={[
                CommandColumn,
                Page,
                Filter,
                Toolbar,
                ExcelExport,
                Sort,
                Group,
                Resize,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};

export default RetailBuyTrendReport;
