/**
 * Sample for Line Series
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  DateTime,
  Tooltip,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
export let data1 = [
  { x: new Date(2012, 6, 11), y: 13.5 },
  { x: new Date(2013, 6, 11), y: 12.4 },
  { x: new Date(2014, 6, 11), y: 12.7 },
  { x: new Date(2015, 6, 11), y: 12.5 },
  { x: new Date(2016, 6, 11), y: 12.7 },
  { x: new Date(2017, 6, 11), y: 13.7 },
  { x: new Date(2018, 6, 11), y: 13.4 },
  { x: new Date(2019, 6, 11), y: 12.9 },
  { x: new Date(2020, 6, 11), y: 11.0 },
];
export let data2 = [
  { x: new Date(2012, 6, 11), y: 5.3 },
  { x: new Date(2013, 6, 11), y: 5.6 },
  { x: new Date(2014, 6, 11), y: 5.9 },
  { x: new Date(2015, 6, 11), y: 5.7 },
  { x: new Date(2016, 6, 11), y: 7.8 },
  { x: new Date(2017, 6, 11), y: 10.3 },
  { x: new Date(2018, 6, 11), y: 15.5 },
  { x: new Date(2019, 6, 11), y: 17.5 },
  { x: new Date(2020, 6, 11), y: 19.5 },
];
export let data3 = [
  { x: new Date(2012, 6, 11), y: 5.6 },
  { x: new Date(2013, 6, 11), y: 4.7 },
  { x: new Date(2014, 6, 11), y: 4.3 },
  { x: new Date(2015, 6, 11), y: 3.8 },
  { x: new Date(2016, 6, 11), y: 2.8 },
  { x: new Date(2017, 6, 11), y: 2.8 },
  { x: new Date(2018, 6, 11), y: 4.1 },
  { x: new Date(2019, 6, 11), y: 6.8 },
  { x: new Date(2020, 6, 11), y: 7.1 },
];
export let data4 = [
  { x: new Date(2012, 6, 11), y: 6.6 },
  { x: new Date(2013, 6, 11), y: 6.8 },
  { x: new Date(2014, 6, 11), y: 6.5 },
  { x: new Date(2015, 6, 11), y: 5.5 },
  { x: new Date(2016, 6, 11), y: 5.0 },
  { x: new Date(2017, 6, 11), y: 6.8 },
  { x: new Date(2018, 6, 11), y: 7.8 },
  { x: new Date(2019, 6, 11), y: 7.3 },
  { x: new Date(2020, 6, 11), y: 8.2 },
];
export let data5 = [
  { x: new Date(2012, 6, 11), y: 2.3 },
  { x: new Date(2013, 6, 11), y: 2.6 },
  { x: new Date(2014, 6, 11), y: 4.4 },
  { x: new Date(2015, 6, 11), y: 4.9 },
  { x: new Date(2016, 6, 11), y: 4.8 },
  { x: new Date(2017, 6, 11), y: 5.3 },
  { x: new Date(2018, 6, 11), y: 6.2 },
  { x: new Date(2019, 6, 11), y: 7.8 },
  { x: new Date(2020, 6, 11), y: 9.3 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const NationalBarChart = () => {
  const onChartLoad = (args) => {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  };
  //   const load = (args) => {
  //     let selectedTheme = location.hash.split("/")[1];
  //     selectedTheme = selectedTheme ? selectedTheme : "Material";
  //     args.chart.theme = (
  //       selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
  //     )
  //       .replace(/-dark/i, "Dark")
  //       .replace(/contrast/i, "Contrast");
  //   };
  const primaryxAxis = { valueType: "Category", title: "Months" };
  const primaryyAxis = {
    minimum: 0,
    maximum: 4500,
    interval: 600,
    title: "Amount (In Lacs)",
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "DateTime",
            edgeLabelPlacement: "Shift",
            majorGridLines: { width: 0 },
            labelFormat: "y",
          }}
          //   load={load.bind(this)}
          primaryYAxis={{
            title: "Million Metric Tons",
            rangePadding: "None",
            minimum: 0,
            maximum: 20,
            interval: 4,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          legendSettings={{ enableHighlight: true }}
          width={"100%"}
          title="All Zone Month Sale"
          loaded={onChartLoad.bind(this)}
        >
          <Inject
            services={[LineSeries, DateTime, Legend, Tooltip, Highlight]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data2}
              xName="x"
              yName="y"
              name="East"
              width={2}
              marker={{
                visible: true,
                width: 7,
                height: 7,
                shape: "Circle",
                isFilled: true,
              }}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              name="West"
              width={2}
              marker={{
                visible: true,
                width: 6,
                height: 6,
                shape: "Triangle",
                isFilled: true,
              }}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data3}
              xName="x"
              yName="y"
              name="North 1"
              width={2}
              marker={{
                visible: true,
                width: 7,
                height: 7,
                shape: "Diamond",
                isFilled: true,
              }}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data4}
              xName="x"
              yName="y"
              name="North 2"
              width={2}
              marker={{
                visible: true,
                width: 5,
                height: 5,
                shape: "Rectangle",
                isFilled: true,
              }}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data5}
              xName="x"
              yName="y"
              name="South"
              width={2}
              marker={{
                visible: true,
                width: 7,
                height: 7,
                shape: "Pentagon",
                isFilled: true,
              }}
              type="Line"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};
export default NationalBarChart;
