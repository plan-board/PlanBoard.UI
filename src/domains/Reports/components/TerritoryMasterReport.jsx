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
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../../common/Loader";
import { useReducer } from "react";

const TerritoryMasterReport = ({ toggleState }) => {
  const { AuthData } = useSelector((state) => state?.auth);
  const [gridData, setGridData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let proPlanReportInstance = useRef();

  useEffect(() => {
    fetchGridData();
  }, [toggleState]);

  const fetchGridData = async () => {
    let employeeId = AuthData.Data[0]?.EmployeeID;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `api/GetReportWithOutParameter/TerritoryMaster/${employeeId}`
      );
      if (res.status === 200) {
        if (
          Array.isArray(res.data.Data.Table) &&
          res?.data?.Data?.Table.length > 0
        ) {
          res.data.Data.Table.map((val, index) => {
            val.Sno = index + 1;
          });
          setGridData(res.data.Data.Table);
        } else {
          setGridData([]);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log("Error While trying to get the territory Master Report");
    }
  };

  const handleToolbarClick = (args) => {
    let cur_timestamp = Math.floor(Date.now() / 1000);
    let export_file_name = "TerritoryMasterReport" + cur_timestamp;
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

  return (
    <>
      {isLoading && <Loader />}
      <Row>
        <Col>
          <GridComponent
            locale="en-Us"
            id="territoryMasterReportGridId"
            key="territoryMasterReportGridId"
            allowTextWrap={true}
            autoFit={true}
            allowResizing={true}
            autoFitColumns={true}
            dataSource={gridData}
            height={"400px"}
            ref={proPlanReportInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            toolbar={["CsvExport", "Search"]}
            pageSettings={{
              pageSizes: [10, 20, 30, 40, 50, 60, "All"],
              pageCount: 15,
            }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
            toolbarClick={handleToolbarClick}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="Sno"
                headerText={"S No"}
                visible={true}
                width="120"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={false}
              />

              <ColumnDirective
                field="zone_name"
                headerText={"Zone Name"}
                visible={true}
                width="170"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="depot_code"
                headerText={"Depot Code"}
                visible={true}
                width="160"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="depot_name"
                headerText={"Depot Name"}
                visible={true}
                textAlign="left"
                width="250"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="area_code"
                headerText={"TTY Code"}
                width="180"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={true}
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="Status"
                headerText={"Status"}
                width="140"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
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
                field="ModifyDate"
                headerText={"Modify Date"}
                width="220"
                type="date"
                format={"dd-MMM-yyyy"}
                textAlign="center"
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
                Edit,
                InfiniteScroll,
                Resize,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};

export default TerritoryMasterReport;
