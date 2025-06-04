import React from "react";
import Popup from "../../common/DialogPopup/DialogPopup";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
  GridComponent,
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
  ForeignKey,
} from "@syncfusion/ej2-react-grids";
import { DetailRow, Inject } from "@syncfusion/ej2-react-grids";
const date = new Date();
const cMName = date.toLocaleString("default", { month: "short" });
const mStartName = cMName.substring(0, 3);
const TodayActivityGrid = ({
  todayActivityOpen,
  handleTodayActivityClose,
  todayActivityData,
  todayActivityGridInstance,
  onLoad,
  onLoadChild,
}) => {
  const parentGridColumns = [
    {
      field: "CY_ValuePlanV1",
      headerText: "CY Value",
      width: "100",
      textAlign: "center",
      allowEditing: false,
      allowSorting: true,
      allowFiltering: true,
    },
    // {
    //   field: "LLY_Value",
    //   headerText: "LYYTD Value",
    //   width: "120",
    //   textAlign: "center",
    //   allowEditing: false,
    //   allowSorting: true,
    //   allowFiltering: true,
    // },
    {
      field: "LLY_Value",
      headerText: "LLY Value",
      width: "80",
      textAlign: "center",
      allowEditing: false,
      allowSorting: true,
      allowFiltering: true,
    },
    {
      field: "LY_Value",
      headerText: "LY Value",
      width: "80",
      textAlign: "center",
      allowEditing: false,
      allowSorting: true,
      allowFiltering: true,
    },

    {
      field: "YTD_Value",
      headerText: `YTD Value`,
      width: "120",
      textAlign: "center",
      allowEditing: false,
      allowSorting: true,
      allowFiltering: true,
    },
    {
      field: "LastSixMonth_Avg_Sales",
      headerText: "Last Six Month Avg. Sales",
      width: "150",
      textAlign: "center",
      allowEditing: false,
      allowSorting: true,
      allowFiltering: true,
    },
  ];

  const orderChildGridOptions = {
    columns: parentGridColumns,
    childGrid: "todayActivityCHild",
    detailDataBound: onLoadChild,
  };
  return (
    <>
      <Popup
        isOpen={todayActivityOpen}
        onClose={handleTodayActivityClose}
        isWidth={true}
      >
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "10px" }}
        >
          Today Activity
        </div>
        <div style={{ padding: "1rem" }} className="TodayActivityGrid_class">
          <GridComponent
            locale="en-Us"
            id="TodayActivityGrid_id"
            key="TodayActivityGrid_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={todayActivityData}
            height={"500px"}
            ref={todayActivityGridInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={25}
            pageSettings={{ pageSize: 15, pageCount: 10 }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
            childGrid={orderChildGridOptions}
            detailDataBound={onLoad}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="customercode"
                headerText={"Customer Code"}
                width="150"
                visible={true}
                textAlign="left"
                allowEditing={false}
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="customername"
                headerText={"Customer Name"}
                width="150"
                format={"N2"}
                visible={true}
                textAlign="center"
                allowEditing={false}
              />
              <ColumnDirective
                field="visitpurpose"
                headerText={"Visit Purpose"}
                width="140"
                visible={true}
                textAlign="center"
                allowEditing={false}
              />
              <ColumnDirective
                field="creepage_value"
                headerText={"Creepage Value"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowSorting={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="OS"
                headerText={"OS"}
                width="80"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowSorting={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="OD"
                headerText={"OD"}
                width="80"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowSorting={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="Sale_Plan"
                headerText={`Sales Plan (${mStartName})`}
                width="120"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowSorting={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="Sale_Act"
                headerText={"Sales Actual"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowSorting={false}
                allowFiltering={false}
              />
            </ColumnsDirective>
            <Inject
              services={[
                DetailRow,
                CommandColumn,
                Freeze,
                Page,
                Filter,
                Toolbar,
                ExcelExport,
                Sort,
                ForeignKey,
              ]}
            />
          </GridComponent>
        </div>
      </Popup>
    </>
  );
};
export default TodayActivityGrid;
