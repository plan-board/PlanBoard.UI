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
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../common/Loader";

const itemsPerPage = 10; // Number of items to display per page

const TerritoryMonthWiseSalesReport = ({ selectedDepot }) => {
  const dispatch = useDispatch();
  let TerritoryMonthWiseInstance = useRef();
  const [territoryMonthPlan, setTerritoryMonthPlan] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      DepotId: selectedDepot,
      TerritoryId: 0, //selectedZone
    };
    const fetchTerritoryMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "TerritoryMonthPlan",
          payload
        );
        console.log("=====TerritoryMonthPlan====", response);

        if (response?.status === 200) {
          setTerritoryMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchTerritoryMonthPlan();
  }, [selectedDepot]);

  const CyPlanYtdTemplate = (args) => {
    return (
      <>
        {fNWCommas(args?.CY_Value)} <hr className="hr0" />
        {fNWCommas(args?.YTD_Value)}
      </>
    );
  };

  const AprTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Apr_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Apr_Month_Sale`])}
        {GetPercent(args[`Apr_Month_Sale`], args[`Apr_Month_Value_v1`])}
      </>
    );
  };
  const MayTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`May_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`May_Month_Sale`])}
        {GetPercent(args[`May_Month_Sale`], args[`May_Month_Value_v1`])}
      </>
    );
  };
  const JunTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jun_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jun_Month_Sale`])}
        {GetPercent(args[`Jun_Month_Sale`], args[`Jun_Month_Value_v1`])}
      </>
    );
  };
  const JulTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jul_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jul_Month_Sale`])}
        {GetPercent(args[`Jul_Month_Sale`], args[`Jul_Month_Value_v1`])}
      </>
    );
  };
  const AugTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Aug_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Aug_Month_Sale`])}
        {GetPercent(args[`Aug_Month_Sale`], args[`Aug_Month_Value_v1`])}
      </>
    );
  };
  const SepTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Sep_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Sep_Month_Sale`])}
        {GetPercent(args[`Sep_Month_Sale`], args[`Sep_Month_Value_v1`])}
      </>
    );
  };
  const OctTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Oct_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Oct_Month_Sale`])}
        {GetPercent(args[`Oct_Month_Sale`], args[`Oct_Month_Value_v1`])}
      </>
    );
  };
  const NovTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Nov_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Nov_Month_Sale`])}
        {GetPercent(args[`Nov_Month_Sale`], args[`Nov_Month_Value_v1`])}
      </>
    );
  };
  const DecTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Dec_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Dec_Month_Sale`])}
        {GetPercent(args[`Dec_Month_Sale`], args[`Dec_Month_Value_v1`])}
      </>
    );
  };
  const JanTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jan_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jan_Month_Sale`])}
        {GetPercent(args[`Jan_Month_Sale`], args[`Jan_Month_Value_v1`])}
      </>
    );
  };
  const FebTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Feb_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Feb_Month_Sale`])}
        {GetPercent(args[`Feb_Month_Sale`], args[`Feb_Month_Value_v1`])}
      </>
    );
  };
  const MarTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Mar_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Mar_Month_Sale`])}
        {GetPercent(args[`Mar_Month_Sale`], args[`Mar_Month_Value_v1`])}
      </>
    );
  };

  const customTotalFooter = () => {
    return <span style={{ fontSize: "20px" }}>Total</span>;
  };
  const customTotalLly = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      let totalLlyValue = shownData.reduce(
        (acc, item) => acc + (parseInt(item.LLY_Value.toFixed(0)) || 0),
        0
      );

      return <>{fNWCommas(totalLlyValue)}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalLy = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      let totalLYValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.LY_Value.toFixed(0)) || 0),
        0
      );

      return <>{fNWCommas(totalLYValue1)}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalCYPlanYTD = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      let totalCYValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.CY_Value.toFixed(0)) || 0),
        0
      );
      let totalYTDValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.YTD_Value.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalCYValue1)}
          <hr className="hr0" />
          {fNWCommas(totalYTDValue1)}
          {GetPercent(totalYTDValue1, totalCYValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalApr = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      let totalAprValue1 = shownData.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Apr_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      let totalAprValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Apr_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalAprValue1)}
          <hr className="hr0" />
          {fNWCommas(totalAprValue_v2)}
          {GetPercent(totalAprValue_v2, totalAprValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalMay = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      let totalMayValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.May_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      let totalMayValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.May_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalMayValue1)}
          <hr className="hr0" />
          {fNWCommas(totalMayValue_v2)}
          {GetPercent(totalMayValue_v2, totalMayValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJun = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalJunValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jun_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJunValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Jun_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJunValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJunValue_v2)}
          {GetPercent(totalJunValue_v2, totalJunValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJul = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalJulValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jul_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJulValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Jul_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJulValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJulValue_v2)}
          {GetPercent(totalJulValue_v2, totalJulValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalAug = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalAugValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Aug_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalAugValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Aug_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalAugValue1)}
          <hr className="hr0" />
          {fNWCommas(totalAugValue_v2)}
          {GetPercent(totalAugValue_v2, totalAugValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalSep = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalSepValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Sep_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalSepValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Sep_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalSepValue1)}
          <hr className="hr0" />
          {fNWCommas(totalSepValue_v2)}
          {GetPercent(totalSepValue_v2, totalSepValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalOct = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalOctValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Oct_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalOctValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Oct_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalOctValue1)}
          <hr className="hr0" />
          {fNWCommas(totalOctValue_v2)}
          {GetPercent(totalOctValue_v2, totalOctValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalNov = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalNovValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Nov_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalNovValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Nov_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalNovValue1)}
          <hr className="hr0" />
          {fNWCommas(totalNovValue_v2)}
          {GetPercent(totalNovValue_v2, totalNovValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalDec = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalDecValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Dec_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalDecValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Dec_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalDecValue1)}
          <hr className="hr0" />
          {fNWCommas(totalDecValue_v2)}
          {GetPercent(totalDecValue_v2, totalDecValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalJan = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalJanValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jan_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJanValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Jan_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJanValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJanValue_v2)}
          {GetPercent(totalJanValue_v2, totalJanValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalFeb = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalFebValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Feb_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalFebValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Feb_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalFebValue1)}
          <hr className="hr0" />
          {fNWCommas(totalFebValue_v2)}
          {GetPercent(totalFebValue_v2, totalFebValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalMar = () => {
    if (TerritoryMonthWiseInstance.current) {
      let shownData =
        TerritoryMonthWiseInstance.current.getCurrentViewRecords();
      const totalMarValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Mar_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalMarValue_v2 = shownData?.reduce(
        (acc, item) => acc + (parseInt(item?.Mar_Month_Sale.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalMarValue1)}
          <hr className="hr0" />
          {fNWCommas(totalMarValue_v2)}
          {GetPercent(totalMarValue_v2, totalMarValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      TerritoryMonthWiseInstance.current &&
      args.item.id === "territoryMonthWiseSales_Id_excelexport"
    ) {
      const arrObj = territoryMonthPlan.map((element, index) => ({
        "S.No": index + 1,
        Depot: element.depot_name,
        Zone: element.zone_name,
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

      ExportExcel("Territory-Wise-Monthly-Plan-Achievement", arrObj);
    }
  };

  return (
    <div id="mom-north" className="w-100">
      <div id="mom-bar-north" className="row">
        {isLoading && <Loader />}
        <div className="full">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <GridComponent
                locale="en-Us"
                id="territoryMonthWiseSales_Id"
                key="territoryMonthWiseSales_Id"
                allowTextWrap={true}
                allowResizing={false}
                dataSource={territoryMonthPlan}
                toolbar={toolbar}
                toolbarClick={toolbarClick}
                enableStickyHeader={true}
                height={"500px"}
                ref={TerritoryMonthWiseInstance}
                allowPaging={true}
                allowSelection={true}
                gridLines="Both"
                rowHeight={40}
                pageSettings={{ pageSize: 15, pageCount: 10 }}
                allowFiltering={true}
                filterSettings={{ type: "Excel" }}
                frozenColumns={2}
                allowExcelExport={true}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="depot_name"
                    headerText={"Depot"}
                    width="130"
                    visible={true}
                    textAlign="center"
                    allowEditing={false}
                    Freeze={true}
                  />
                  <ColumnDirective
                    field="territory_name"
                    headerText={"Zone"}
                    width="130"
                    visible={true}
                    textAlign="center"
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
                        field="territory_name"
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
                  ]}
                />
              </GridComponent>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TerritoryMonthWiseSalesReport;
