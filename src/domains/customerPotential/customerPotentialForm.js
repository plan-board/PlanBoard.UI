import React from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
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
} from "@syncfusion/ej2-react-grids";
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#f2f2f2",
    },
  },
};

export const CustomerPotentialForm = ({
  employeeList,
  customterGridInstance,
  handleSave,
}) => {
  const toolbar = ["Search"];

  return (
    <>
      {employeeList.length > 0 ? (
        <Row>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ marginTop: "10px" }}
          >
            <GridComponent
              locale="en-Us"
              id="Wgt_DelearUiGrid_id"
              key="Wgt_DelearUiGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={employeeList}
              toolbar={toolbar}
              // toolbarClick={toolbarClick}

              height={"500px"}
              ref={customterGridInstance}
              allowPaging={true}
              allowSelection={true}
              gridLines="Both"
              editSettings={{
                allowEditing: true,
                mode: "Batch",
                persistSelection: true,
                showConfirmDialog: false,
              }}
              rowHeight={40}
              pageSettings={{ pageSize: 15, pageCount: 10 }}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              allowExcelExport={true}
              allowSorting={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="serialNo"
                  headerText="Serial No"
                  textAlign="center"
                  width="50"
                  allowFiltering={false}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="CustomerCode"
                  headerText="Customer Code"
                  textAlign="left"
                  width="150"
                  allowFiltering={true}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="CustomerName"
                  headerText="Customer Name"
                  textAlign="left"
                  width="150"
                  allowFiltering={true}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="DealerCategory"
                  headerText="Dealer Category"
                  textAlign="center"
                  width="100"
                  allowFiltering={false}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="PotentialValue"
                  headerText="Potential"
                  textAlign="center"
                  width="100"
                  editType="numericedit"
                  allowFiltering={false}
                  allowEditing={true}
                />
              </ColumnsDirective>
              <Inject
                services={[
                  Edit,
                  CommandColumn,
                  Freeze,
                  Page,
                  Filter,
                  Toolbar,
                  ExcelExport,
                ]}
              />
            </GridComponent>
          </Col>
        </Row>
      ) : (
        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontFamily: "sans-serif",
            color: "GrayText",
          }}
        >
          NO RECORDS TO DISPLAY
        </div>
      )}
    </>
  );
};
