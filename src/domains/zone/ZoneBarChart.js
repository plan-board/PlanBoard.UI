import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";
import Loader from "../../common/Loader";
// const monthArr = [
//   { month: "Apr", totalV1: 10, totalSale: 10 },
//   { month: "May", totalV1: 10, totalSale: 10 },
//   { month: "Jun", totalV1: 10, totalSale: 10 },
//   { month: "Jul", totalV1: 10, totalSale: 10 },
//   { month: "Aug", totalV1: 10, totalSale: 10 },
//   { month: "Sep", totalV1: 10, totalSale: 10 },
//   { month: "Oct", totalV1: 10, totalSale: 10 },
//   { month: "Nov", totalV1: 10, totalSale: 10 },
//   { month: "Dec", totalV1: 10, totalSale: 10 },
//   { month: "Jan", totalV1: 10, totalSale: 10 },
//   { month: "Feb", totalV1: 10, totalSale: 10 },
//   { month: "Mar", totalV1: 10, totalSale: 10 },
// ];
const ZoneBar = ({ selectedZone, monthWiseSalesData, isLoading }) => {
  const [monthArr, setMonthErr] = useState([
    { month: "Apr", totalV1: 0, totalSale: 0 },
    { month: "May", totalV1: 0, totalSale: 0 },
    { month: "Jun", totalV1: 0, totalSale: 0 },
    { month: "Jul", totalV1: 0, totalSale: 0 },
    { month: "Aug", totalV1: 0, totalSale: 0 },
    { month: "Sep", totalV1: 0, totalSale: 0 },
    { month: "Oct", totalV1: 0, totalSale: 0 },
    { month: "Nov", totalV1: 0, totalSale: 0 },
    { month: "Dec", totalV1: 0, totalSale: 0 },
    { month: "Jan", totalV1: 0, totalSale: 0 },
    { month: "Feb", totalV1: 0, totalSale: 0 },
    { month: "Mar", totalV1: 0, totalSale: 0 },
  ]);

  useEffect(() => {
    calcMonthBarData();
  }, [monthWiseSalesData]);

  const calcMonthBarData = () => {
    let NewMonth = [...monthArr];
    let totalAprValue1 = monthWiseSalesData.reduce(
      (acc, item) => acc + (parseInt(item?.Apr_Month_Value_v1.toFixed(0)) || 0),
      0
    );
    let totalAprValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Apr_Month_Sale_act.toFixed(0)) || 0),
      0
    );
    let totalMayValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.May_Month_Value_v1.toFixed(0)) || 0),
      0
    );
    let totalMayValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.May_Month_Sale_act.toFixed(0)) || 0),
      0
    );
    let totalJunValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jun_Month_Value_v1.toFixed(0)) || 0),
      0
    );
    let totalJunValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jun_Month_Sale_act.toFixed(0)) || 0),
      0
    );
    let totalJulValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jul_Month_Value_v1.toFixed(0)) || 0),
      0
    );
    let totalJulValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jul_Month_Sale_act.toFixed(0)) || 0),
      0
    );
    let totalAugValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Aug_Month_Value_v1.toFixed(0)) || 0),
      0
    );
    let totalAugValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Aug_Month_Sale_act.toFixed(0)) || 0),
      0
    );
    let totalSepValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Sep_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalSepValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Sep_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalOctValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Oct_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalOctValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Oct_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalNovValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Nov_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalNovValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Nov_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalDecValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Dec_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalDecValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Dec_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalJanValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jan_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalJanValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Jan_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalFebValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Feb_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalFebValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Feb_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    let totalMarValue1 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Mar_Month_Value_v1.toFixed(0)) || 0),
      0
    );

    let totalMarValue_v2 = monthWiseSalesData?.reduce(
      (acc, item) => acc + (parseInt(item?.Mar_Month_Sale_act.toFixed(0)) || 0),
      0
    );

    NewMonth.map((val) => {
      if (val.month == "Apr") {
        val.totalV1 = totalAprValue1;
        val.totalSale = totalAprValue_v2;
      } else if (val.month == "May") {
        val.totalV1 = totalMayValue1;
        val.totalSale = totalMayValue_v2;
      } else if (val.month == "Jun") {
        val.totalV1 = totalJunValue1;
        val.totalSale = totalJunValue_v2;
      } else if (val.month == "Jul") {
        val.totalV1 = totalJulValue1;
        val.totalSale = totalJulValue_v2;
      } else if (val.month == "Aug") {
        val.totalV1 = totalAugValue1;
        val.totalSale = totalAugValue_v2;
      } else if (val.month == "Sep") {
        val.totalV1 = totalSepValue1;
        val.totalSale = totalSepValue_v2;
      } else if (val.month == "Oct") {
        val.totalV1 = totalOctValue1;
        val.totalSale = totalOctValue_v2;
      } else if (val.month == "Nov") {
        val.totalV1 = totalNovValue1;
        val.totalSale = totalNovValue_v2;
      } else if (val.month == "Dec") {
        val.totalV1 = totalDecValue1;
        val.totalSale = totalDecValue_v2;
      } else if (val.month == "Jan") {
        val.totalV1 = totalJanValue1;
        val.totalSale = totalJanValue_v2;
      } else if (val.month == "Feb") {
        val.totalV1 = totalFebValue1;
        val.totalSale = totalFebValue_v2;
      } else if (val.month == "Mar") {
        val.totalV1 = totalMarValue1;
        val.totalSale = totalMarValue_v2;
      }
    });
    setMonthErr(NewMonth);
  };

  let palette = ["#e7d265", "#366a2a"];
  const primaryxAxis = { valueType: "Category", title: "Months" };
  const primaryyAxis = {
    minimum: 0,
    maximum: 4500,
    interval: 600,
    title: "Amount (In Lacs)",
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <ChartComponent
          id="charts"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          palettes={palette}
          title="Zone Wise Sales"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={monthArr}
              xName="month"
              yName="totalV1"
              name="Planning"
              legendShape="Circle"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={monthArr}
              xName="month"
              yName="totalSale"
              type="Column"
              name="Actual"
              legendShape="Rectangle"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>
    </>
  );
};
export default ZoneBar;
