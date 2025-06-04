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

const NewProductPlanningReport = ({ toggleState }) => {
  let dispatch = useDispatch();
  let proPlanReportInstance = useRef();
  const { AuthData } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [monthId, setMonth] = useState(0);
  const [fyId, setFYear] = useState(0);
  const [yearList, setYearLIst] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [productPlanningList, setProductPlanningList] = useState([]);

  useEffect(() => {
    fetchMonthList();
    fetchYearList();
  }, [toggleState]);

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

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
    setProductPlanningList([]);
  };

  const handleYearChange = (event) => {
    setFYear(parseInt(event.target.value));
    setProductPlanningList([]);
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
  const handleToolbarClick = (args) => {
    let cur_timestamp = Math.floor(Date.now() / 1000);
    let export_file_name = "NewProductPlanningListReport" + cur_timestamp;
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

  const getProductPlanningData = async () => {
    setLoading(true);
    const payload = {
      _month: monthId,
      _year: fyId,
    };
    try {
      const res = await axiosInstance.post(
        "GetNewProductPlanningReportData",
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
  };

  return (
    <>
      {isLoading && <Loader />}
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <span style={{ fontWeight: "600" }}>Month</span>
          <select
            className="form-control"
            value={monthId}
            onChange={handleMonthChange}
          >
            <option value="0">Select Month</option>
            {monthDropDwn()}
          </select>
        </Col>
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
            disabled={monthId == 0 && fyId == 0 ? true : false}
            onClick={getProductPlanningData}
          >
            <i className="fa fa-refresh" style={{ marginRight: "3px" }}></i>Get
            Report
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col xl={12} lg={12} md={12} xs={12} sm={12}>
          <GridComponent
            locale="en-Us"
            id="productPlanning_id"
            key="productPlanning_id"
            allowTextWrap={true}
            autoFit={true}
            allowResizing={true}
            autoFitColumns={true}
            dataSource={productPlanningList}
            height={"400px"}
            ref={proPlanReportInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            toolbar={["ExcelExport", "Search"]}
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
                width="100"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={false}
              />

              <ColumnDirective
                field="depot_name"
                headerText={"Depot"}
                visible={true}
                width="130"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="categoryname"
                headerText={"Category"}
                visible={true}
                width="150"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="skuname"
                headerText={"SKU Name"}
                visible={true}
                textAlign="left"
                width="250"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="skucode"
                headerText={"SKU Code"}
                // width="150"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={true}
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="packsize"
                headerText={"Pack Size"}
                width="120"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="qty"
                headerText={"Quantity"}
                width="120"
                format={"N2"}
                visible={true}
                editType="numericedit"
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="vol_ltr"
                headerText={"Volume(ltr)"}
                width="120"
                format={"N2"}
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />

              <ColumnDirective
                field="Status"
                headerText={"Status"}
                width="120"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={true}
              />
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="createdby"
                  headerText={"Created By"}
                  width="150"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="createdon"
                  headerText={"Created On"}
                  width="200"
                  format="dd-MMM-yyyy,hh:mm"
                  type="dateTime"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="UpdatedBy"
                  headerText={"Updated By"}
                  width="150"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="ApprovedBy"
                  headerText={"Approved By"}
                  width="150"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
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
export default NewProductPlanningReport;
