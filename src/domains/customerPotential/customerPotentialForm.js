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
  TerritoryDropdown,
  handleChange,
  territoryId,
  employeeList,
  customterGridInstance,
  handleSave,
}) => {
  const toolbar = ["Search"];
  const numericParams = {
    params: {
      decimals: 0,
      format: "N",
      validateDecimalOnType: true,
    },
  };
  return (
    <>
      <Row>
        <Col xl={5} lg={5} md={6} sm={12} xs={12}>
          <label className="formlabel">Territory*</label>
          <div style={{ display: "flex" }}>
            <select
              className="from_dropDownCss"
              name="territoryId"
              onChange={handleChange}
              value={territoryId}
            >
              <option value="">Select</option>
              {TerritoryDropdown()}
            </select>
            <button
              type="button"
              className="btn btn-success"
              style={{
                marginLeft: "20px",
              }}
              onClick={() => handleSave()}
            >
              <i className="fa fa-plus"></i> Save
            </button>
          </div>
        </Col>
      </Row>

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
              enableStickyHeader={true}
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
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="serialNo"
                  headerText="Serial No"
                  textAlign="center"
                  width="100"
                  allowFiltering={false}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="CustomerCode"
                  headerText="Customer Code"
                  textAlign="center"
                  width="150"
                  allowFiltering={true}
                  allowEditing={false}
                />
                <ColumnDirective
                  field="CustomerName"
                  headerText="Customer Name"
                  textAlign="center"
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
