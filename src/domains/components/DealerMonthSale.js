import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMonths } from "../../utils/utils";
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
  AggregateColumnDirective,
  Toolbar,
  ExcelExport,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../common/Loader";

const DealerMonthSale = ({ selectedTerritory }) => {
  const dispatch = useDispatch();
  let DealerMonthWiseInstance = useRef();
  const [isLoading, setLoading] = useState(true);
  const [dealerMonthPlan, setDealerMonthPlan] = useState([]);

  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(""); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(""); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);

  const getZoneMonthPlan = async () => {
    try {
      const payload = {
        Token: localStorage.getItem("access_token"),
        ZoneId: 0,
        DepotId: 0,
        TerritoryId: selectedTerritory,
      };
      const response = await axiosInstance.post("CustomerMonthPlan", payload);

      if (response?.status === 200) {
        setDealerMonthPlan(
          response.data.Data != null ? response.data.Data : []
        );
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    if (selectedTerritory != 0) {
      setLoading(true);
      getZoneMonthPlan();
    }
  }, [selectedTerritory]);

  const CyPlanYtdTemplate = (args) => {
    return (
      <>
        {args?.CY_Value} <hr className="hr0" />
        {args?.YTD_Value}
      </>
    );
  };
  const AprTemplate = (args) => {
    return (
      <>
        {args[`Apr_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Apr_Month_Sale`]}
      </>
    );
  };
  const MayTemplate = (args) => {
    return (
      <>
        {args[`May_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`May_Month_Sale`]}
      </>
    );
  };
  const JunTemplate = (args) => {
    return (
      <>
        {args[`Jun_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Jun_Month_Sale`]}
      </>
    );
  };
  const JulTemplate = (args) => {
    return (
      <>
        {args[`Jul_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Jul_Month_Sale`]}
      </>
    );
  };
  const AugTemplate = (args) => {
    return (
      <>
        {args[`Aug_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Aug_Month_Sale`]}
      </>
    );
  };
  const SepTemplate = (args) => {
    return (
      <>
        {args[`Sep_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Sep_Month_Sale`]}
      </>
    );
  };
  const OctTemplate = (args) => {
    return (
      <>
        {args[`Oct_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Oct_Month_Sale`]}
      </>
    );
  };
  const NovTemplate = (args) => {
    return (
      <>
        {args[`Nov_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Nov_Month_Sale`]}
      </>
    );
  };
  const DecTemplate = (args) => {
    return (
      <>
        {args[`Dec_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Dec_Month_Sale`]}
      </>
    );
  };
  const JanTemplate = (args) => {
    return (
      <>
        {args[`Jan_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Jan_Month_Sale`]}
      </>
    );
  };
  const FebTemplate = (args) => {
    return (
      <>
        {args[`Feb_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Feb_Month_Sale`]}
      </>
    );
  };
  const MarTemplate = (args) => {
    return (
      <>
        {args[`Mar_Month_Value_v1`]}
        <hr className="hr0" />
        {args[`Mar_Month_Sale`]}
      </>
    );
  };

  const customTotalFooter = () => {
    return <span style={{ fontSize: "20px" }}>Total</span>;
  };
  const customTotalLly = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      let totalLlyValue = shownData.reduce(
        (acc, item) => acc + (item.LLY_Value || 0),
        0
      );

      return <>{totalLlyValue}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalLy = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      let totalLYValue1 = shownData.reduce(
        (acc, item) => acc + (item.LY_Value || 0),
        0
      );

      return <>{totalLYValue1}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalCYPlanYTD = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      let totalCYValue1 = shownData.reduce(
        (acc, item) => acc + (item.CY_Value || 0),
        0
      );
      let totalYTDValue1 = shownData.reduce(
        (acc, item) => acc + (item.YTD_Value || 0),
        0
      );

      return (
        <>
          {totalCYValue1}
          <hr className="hr0" />
          {totalYTDValue1}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalApr = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      let totalAprValue1 = shownData.reduce(
        (acc, item) => acc + (item?.Apr_Month_Value_v1 || 0),
        0
      );
      let totalAprValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Apr_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalAprValue1}
          <hr className="hr0" />
          {totalAprValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalMay = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      let totalMayValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.May_Month_Value_v1 || 0),
        0
      );
      let totalMayValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.May_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalMayValue1}
          <hr className="hr0" />
          {totalMayValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJun = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalJunValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Jun_Month_Value_v1 || 0),
        0
      );
      const totalJunValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Jun_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalJunValue1}
          <hr className="hr0" />
          {totalJunValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJul = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalJulValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Jul_Month_Value_v1 || 0),
        0
      );
      const totalJulValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Jul_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalJulValue1}
          <hr className="hr0" />
          {totalJulValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalAug = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalAugValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Aug_Month_Value_v1 || 0),
        0
      );
      const totalAugValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Aug_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalAugValue1}
          <hr className="hr0" />
          {totalAugValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalSep = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalSepValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Sep_Month_Value_v1 || 0),
        0
      );
      const totalSepValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Sep_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalSepValue1}
          <hr className="hr0" />
          {totalSepValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalOct = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalOctValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Oct_Month_Value_v1 || 0),
        0
      );
      const totalOctValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Oct_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalOctValue1}
          <hr className="hr0" />
          {totalOctValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalNov = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalNovValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Nov_Month_Value_v1 || 0),
        0
      );
      const totalNovValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Nov_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalNovValue1}
          <hr className="hr0" />
          {totalNovValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalDec = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalDecValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Dec_Month_Value_v1 || 0),
        0
      );
      const totalDecValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Dec_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalDecValue1}
          <hr className="hr0" />
          {totalDecValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalJan = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalJanValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Jan_Month_Value_v1 || 0),
        0
      );
      const totalJanValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Jan_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalJanValue1}
          <hr className="hr0" />
          {totalJanValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalFeb = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalFebValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Feb_Month_Value_v1 || 0),
        0
      );
      const totalFebValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Feb_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalFebValue1}
          <hr className="hr0" />
          {totalFebValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalMar = () => {
    if (DealerMonthWiseInstance.current) {
      let shownData = DealerMonthWiseInstance.current.getCurrentViewRecords();
      const totalMarValue1 = shownData?.reduce(
        (acc, item) => acc + (item?.Mar_Month_Value_v1 || 0),
        0
      );
      const totalMarValue_v2 = shownData?.reduce(
        (acc, item) => acc + (item?.Mar_Month_Sale || 0),
        0
      );

      return (
        <>
          {totalMarValue1}
          <hr className="hr0" />
          {totalMarValue_v2}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      DealerMonthWiseInstance.current &&
      args.item.id === "dealerMonthWiseSales_Id_excelexport"
    ) {
      const arrObj = dealerMonthPlan.map((element, index) => ({
        "S.No": index + 1,
        Territory: element.territory_name,
        "Dealer Name": element.dealer_name,
        LLY: element.LLY_Value,
        LY: element.LY_Value,
        "CY Plan": element.CY_Value,
        YTD: element.YTD_Value,
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

      ExportExcel("Dealer-Wise-Monthly-Plan-Achievement", arrObj);
    }
  };

  return (
    <>
      <div id="mom-north" className="w-100">
        <div id="mom-bar-north" className="row">
          {isLoading && <Loader />}
          <div className="full">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <GridComponent
                  locale="en-Us"
                  id="dealerMonthWiseSales_Id"
                  key="dealerMonthWiseSales_Id"
                  allowTextWrap={true}
                  allowResizing={false}
                  dataSource={dealerMonthPlan}
                  toolbar={toolbar}
                  toolbarClick={toolbarClick}
                  enableStickyHeader={true}
                  height={"500px"}
                  ref={DealerMonthWiseInstance}
                  allowPaging={true}
                  allowSelection={true}
                  gridLines="Both"
                  rowHeight={40}
                  pageSettings={{ pageSize: 15, pageCount: 10 }}
                  allowFiltering={true}
                  filterSettings={{ type: "Excel" }}
                  frozenColumns={2}
                  allowExcelExport={true}
                  allowSorting={true}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="territory_name"
                      headerText={"Territory"}
                      width="130"
                      visible={true}
                      textAlign="left"
                      allowEditing={false}
                      Freeze={true}
                    />
                    <ColumnDirective
                      field="dealer_name"
                      headerText={"Delear Name"}
                      width="130"
                      visible={true}
                      textAlign="left"
                      allowEditing={false}
                      Freeze={true}
                    />
                    <ColumnDirective
                      field="LLY_Value"
                      headerText={"LLY"}
                      width="100"
                      format={"N2"}
                      visible={true}
                      textAlign="center"
                      allowEditing={false}
                    />
                    <ColumnDirective
                      field="LY_Value"
                      headerText={"LY"}
                      width="100"
                      visible={true}
                      textAlign="center"
                      allowEditing={false}
                    />

                    <ColumnDirective
                      field="cyPLan/ytd"
                      headerText={"CY Plan / YTD"}
                      width="170"
                      textAlign="center"
                      allowFiltering={false}
                      template={CyPlanYtdTemplate}
                    />
                    <ColumnDirective
                      headerText={"Apr"}
                      field="Apr"
                      width="130"
                      visible={true}
                      textAlign="center"
                      allowFiltering={false}
                      template={AprTemplate}
                      allowEditing={false}
                    />
                    <ColumnDirective
                      field="May"
                      headerText={"May"}
                      width="130"
                      textAlign="center"
                      allowFiltering={false}
                      template={MayTemplate}
                    />
                    <ColumnDirective
                      field="Jun"
                      headerText={"Jun"}
                      width="130"
                      textAlign="center"
                      allowFiltering={false}
                      template={JunTemplate}
                    />
                    <ColumnDirective
                      field="Jul"
                      headerText={"Jul"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={JulTemplate}
                    />
                    <ColumnDirective
                      field="Aug"
                      headerText={"Aug"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={AugTemplate}
                    />
                    <ColumnDirective
                      field="Sep"
                      headerText={"Sep"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={SepTemplate}
                    />
                    <ColumnDirective
                      field="Oct"
                      headerText={"Oct"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={OctTemplate}
                    />
                    <ColumnDirective
                      field="Nov"
                      headerText={"Nov"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={NovTemplate}
                    />
                    <ColumnDirective
                      field="Dec"
                      headerText={"Dec"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={DecTemplate}
                    />
                    <ColumnDirective
                      field="Jan"
                      headerText={"Jan"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={JanTemplate}
                    />
                    <ColumnDirective
                      field="Feb"
                      headerText={"Feb"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={FebTemplate}
                    />
                    <ColumnDirective
                      field="Mar"
                      headerText={"Mar"}
                      width="130"
                      textAlign={"center"}
                      allowFiltering={false}
                      template={MarTemplate}
                    />
                  </ColumnsDirective>
                  <AggregatesDirective>
                    <AggregateDirective>
                      <AggregateColumnsDirective>
                        <AggregateColumnDirective
                          field="dealer_name"
                          type="Custom"
                          footerTemplate={customTotalFooter}
                        />
                        <AggregateColumnDirective
                          field="LLY_Value"
                          type="Custom"
                          footerTemplate={customTotalLly}
                        />
                        <AggregateColumnDirective
                          field="LY_Value"
                          type="Custom"
                          footerTemplate={customTotalLy}
                        />
                        <AggregateColumnDirective
                          field="cyPLan/ytd"
                          type="Custom"
                          footerTemplate={customTotalCYPlanYTD}
                        />
                        <AggregateColumnDirective
                          field="Apr"
                          type="Custom"
                          footerTemplate={customTotalApr}
                        />
                        <AggregateColumnDirective
                          field="May"
                          type="Custom"
                          footerTemplate={customTotalMay}
                        />
                        <AggregateColumnDirective
                          field="Jun"
                          type="Custom"
                          footerTemplate={customTotalJun}
                        />
                        <AggregateColumnDirective
                          field="Jul"
                          type="Custom"
                          footerTemplate={customTotalJul}
                        />
                        <AggregateColumnDirective
                          field="Aug"
                          type="Custom"
                          footerTemplate={customTotalAug}
                        />
                        <AggregateColumnDirective
                          field="Sep"
                          type="Custom"
                          footerTemplate={customTotalSep}
                        />
                        <AggregateColumnDirective
                          field="Oct"
                          type="Custom"
                          footerTemplate={customTotalOct}
                        />
                        <AggregateColumnDirective
                          field="Nov"
                          type="Custom"
                          footerTemplate={customTotalNov}
                        />
                        <AggregateColumnDirective
                          field="Dec"
                          type="Custom"
                          footerTemplate={customTotalDec}
                        />
                        <AggregateColumnDirective
                          field="Jan"
                          type="Custom"
                          footerTemplate={customTotalJan}
                        />
                        <AggregateColumnDirective
                          field="Feb"
                          type="Custom"
                          footerTemplate={customTotalFeb}
                        />
                        <AggregateColumnDirective
                          field="Mar"
                          type="Custom"
                          footerTemplate={customTotalMar}
                        />
                      </AggregateColumnsDirective>
                    </AggregateDirective>
                  </AggregatesDirective>
                  <Inject
                    services={[
                      Edit,
                      CommandColumn,
                      Freeze,
                      Page,
                      Filter,
                      Aggregate,
                      Toolbar,
                      ExcelExport,
                      Sort,
                    ]}
                  />
                </GridComponent>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerMonthSale;
