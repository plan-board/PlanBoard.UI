import React from "react";
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
  Toolbar,
  ExcelExport,
  AggregateColumnDirective,
  Sort,
  ForeignKey,
} from "@syncfusion/ej2-react-grids";
// import "./App.css";

const AchievementGrid = ({ table2 }) => {
  return (
    <div className="grid-container">
      <GridComponent
        locale="en-Us"
        id="AchivementGrid_id"
        key="AchivementGrid_id"
        allowTextWrap={true}
        allowResizing={false}
        dataSource={table2}
        height={"400px"}
        allowPaging={true}
        allowSelection={true}
        gridLines="Both"
        rowHeight={25}
        pageSettings={{ pageSize: 15, pageCount: 10 }}
        allowFiltering={true}
        filterSettings={{ type: "Excel" }}
        allowExcelExport={true}
        allowSorting={true}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="marketsectorname"
            headerText="Market Sector Name"
            width="200"
            allowFiltering={false}
          />
          <ColumnDirective
            field="CYSale"
            headerText="CY Sale"
            width="150"
            textAlign="Right"
          />
          <ColumnDirective field="LySale" headerText="LY Sale" width="150" />
          <ColumnDirective field="YTDPer" headerText="YTD %" width="150" />
          <ColumnDirective
            field="Target"
            headerText="Target"
            width="110"
            textAlign="Left"
            allowFiltering={false}
          />
          <ColumnDirective
            field="CYMTDSale"
            headerText="CYMTD Sale"
            width="140"
            textAlign="Left"
            allowFiltering={false}
          />
          <ColumnDirective
            field="LYMTDSale"
            headerText="LYMTD Sale"
            width="150"
            allowFiltering={false}
          />

          <ColumnDirective
            field="MTDPer"
            headerText="MTD %"
            width="150"
            allowFiltering={false}
          />
        </ColumnsDirective>
        <Inject
          services={[
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
  );
};

export default AchievementGrid;
