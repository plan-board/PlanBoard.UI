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

const FocusMarketGrid = ({ table1 }) => {
  return (
    <div className="grid-container">
      <GridComponent
        locale="en-Us"
        id="AchivementGrid_id"
        key="AchivementGrid_id"
        allowTextWrap={true}
        allowResizing={false}
        dataSource={table1}
        //   toolbar={toolbar}
        //   toolbarClick={toolbarClick}
        height={"390px"}
        //   ref={Wgt_DelearUiGridInstance}
        allowPaging={true}
        allowSelection={true}
        gridLines="Both"
        rowHeight={25}
        pageSettings={{ pageSize: 15, pageCount: 10 }}
        allowFiltering={true}
        filterSettings={{ type: "Excel" }}
        // frozenColumns={2}
        allowExcelExport={true}
        allowSorting={true}
        //   commandClick={getMonthTarget}
        //   rowDataBound={handleRowDataBound}
      >
        <ColumnsDirective>
          {/* <ColumnDirective
            field="Sno"
            headerText="Sno"
            width="50"
            textAlign="Right"
          /> */}
          <ColumnDirective
            field="customercode"
            headerText="Customer Code"
            width="150"
          />
          <ColumnDirective
            field="customername"
            headerText="Customer Name"
            width="150"
          />
          <ColumnDirective
            field="depot_name"
            headerText="Depot Name"
            width="110"
            textAlign="Left"
            allowFiltering={false}
          />
          <ColumnDirective
            field="zone_name"
            headerText="Zone Name"
            width="140"
            textAlign="Left"
            allowFiltering={false}
          />
          <ColumnDirective
            field="CYSale"
            headerText="CY Sale"
            width="150"
            allowFiltering={false}
          />
          <ColumnDirective
            field="LySale"
            headerText="Ly Sale"
            width="150"
            allowFiltering={false}
          />
          <ColumnDirective
            field="growthPer"
            headerText="Growth %"
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

export default FocusMarketGrid;
