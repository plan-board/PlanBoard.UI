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

const Table0 = ({ table0 }) => {
  return (
    <div className="grid-container">
      <GridComponent
        locale="en-Us"
        id="AchivementGrid_idtable0"
        key="AchivementGrid_idtable0"
        allowTextWrap={true}
        allowResizing={false}
        dataSource={table0}
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
            field="Description"
            headerText="KPI"
            width="200"
            allowFiltering={false}
          />
          <ColumnDirective
            field="NoOfCustomer"
            headerText="Value"
            width="200"
            textAlign="Right"
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

export default Table0;
