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

const DealerWiseMarketSecReport = ({ toggleState }) => {
  const { AuthData } = useSelector((state) => state?.auth);
  let currentDate = new Date();
  let sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 1);
  let currentDateStr = currentDate.toISOString().split("T")[0];
  let sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0];
  const [gridData, setGridData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let proPlanReportInstance = useRef();
  const [gridFormDetails, setGridFormDetails] = useState({
    formDate: sevenDaysAgoStr,
    toDate: currentDateStr,
  });

  useEffect(() => {
    fetchGridData();
  }, [toggleState]);

  const gridHandleChange = (e) => {
    setGridFormDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchGridData = async () => {
    setLoading(true);
    let employeeId = AuthData.Data[0]?.EmployeeID;
    fetch(
      ServerAPI +
        `api/GetReport/DealerWiseSale/${gridFormDetails.formDate}/${gridFormDetails.toDate}/${employeeId}`
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
  };

  const handleToolbarClick = (args) => {
    let cur_timestamp = Math.floor(Date.now() / 1000);
    let export_file_name = "DealerWiseMarketSecReport" + cur_timestamp;
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
        "Date",
        "marketsectorname",
        "Prod_Value",
      ]);
    }
  };

  return (
    <>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">From Date</label>
          <input
            type="date"
            name="formDate"
            value={gridFormDetails.formDate}
            onChange={gridHandleChange}
          />
        </Col>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">To Date</label>
          <input
            type="date"
            name="toDate"
            value={gridFormDetails.toDate}
            onChange={gridHandleChange}
          />
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3} style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fetchGridData()}
          >
            <i className="fa fa-search"></i> Search
          </button>
        </Col>
      </Row>
      {isLoading && <Loader />}
      <Row>
        <Col style={{ marginTop: "15px" }}>
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
                headerText={"Zone Name"}
                visible={true}
                // width="160"
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
                field="Date"
                headerText={" Date"}
                // width="140"
                type="date"
                format={"dd-MMM-yyyy"}
                // textAlign="center"
              />
              <ColumnDirective
                field="marketsectorname"
                headerText={"Market Sec Name"}
                // width="220"
              />
              <ColumnDirective
                field="Prod_Value"
                headerText={"Final Value"}
                // width="220"
              />
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
export default DealerWiseMarketSecReport;
