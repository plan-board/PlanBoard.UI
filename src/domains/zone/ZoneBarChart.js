import * as React from "react";
import * as ReactDOM from "react-dom";
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
function Bar() {
  const data = [
    { country: "Jan", gold: 50, Actual: 70 },
    { country: "Feb", gold: 40, Actual: 60 },
    { country: "Mar", gold: 70, Actual: 60 },
    { country: "Apr", gold: 60, Actual: 56 },
    { country: "May", gold: 50, Actual: 45 },
    { country: "Jun", gold: 40, Actual: 30 },
    { country: "Jul", gold: 40, Actual: 35 },
    { country: "Aug", gold: 30, Actual: 25 },
    { country: "Oct", gold: 40, Actual: 35 },
    { country: "Nov", gold: 10, Actual: 15 },
  ];
  const palette = ["#e7d265", "#366a2a"];
  const primaryxAxis = { valueType: "Category", title: "Months" };
  const primaryyAxis = {
    minimum: 0,
    maximum: 80,
    interval: 20,
    title: "Amount (In Lacs)",
  };
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={primaryxAxis}
      primaryYAxis={primaryyAxis}
      palettes={palette}
      title="Zone Wise Sales"
      tooltip={{ enable: true }}
    >
      <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="country"
          yName="gold"
          name="Planning"
          legendShape="Circle"
          type="Column"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data}
          xName="country"
          yName="Actual"
          type="Column"
          name="Actual"
          legendShape="Rectangle"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
export default Bar;
