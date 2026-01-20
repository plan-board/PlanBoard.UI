import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Page,
  Filter,
  Toolbar,
  ExcelExport,
  Sort,
  Edit,
  InfiniteScroll,
} from "@syncfusion/ej2-react-grids";
export const NewProductPlaningGrid = ({
  productPlanningList,
  AuthData,
  handleCellEdit,
  handleCellSaved,
  productPlanningGridInstance,
  handleToolbarClick,
}) => {
  const integerParams = {
    params: {
      decimals: 0,
      format: "N",
      min: 0,
      validateDecimalOnType: true,
    },
  };
  return (
    <>
      <Row>
        <Col xl={12} lg={12} md={12} xs={12} sm={12}>
          <GridComponent
            locale="en-Us"
            id="productPlanning_id"
            key="productPlanning_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={productPlanningList}
            height={"400px"}
            ref={productPlanningGridInstance}
            // allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            toolbar={["ExcelExport", "Search"]}
            // pageSettings={{ pageSize: 15, pageCount: 15 }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
            editSettings={{
              allowEditing: true,
              mode: "Batch",
              persistSelection: true,
            }}
            enableInfiniteScrolling={true}
            cellEdit={handleCellEdit}
            cellSaved={handleCellSaved}
            toolbarClick={handleToolbarClick}
            // commandClick={getSingleRowData}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="Sno"
                headerText={"S No"}
                visible={true}
                width="120"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="categoryname"
                headerText={"Category Name"}
                visible={true}
                width="150"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="skuname"
                headerText={"SKU Name"}
                visible={true}
                textAlign="left"
                width="220"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="skucode"
                headerText={"SKU Code"}
                width="150"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={true}
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="packsize"
                headerText={"Pack Size"}
                width="150"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="qty"
                headerText={"Quantity"}
                width="130"
                format={"N2"}
                visible={true}
                editType="numericedit"
                textAlign="center"
                allowEditing={true}
                allowFiltering={false}
                edit={integerParams}
              />
              <ColumnDirective
                field="vol_ltr"
                headerText={"Volume(ltr)"}
                width="150"
                format={"N2"}
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />

              <ColumnDirective
                field="Status"
                headerText={"Status"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={true}
              />
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="approvedbyname"
                  headerText={"Approved By"}
                  width="150"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="approvedon"
                  headerText={"Approved On"}
                  width="200"
                  format="dd-MMM-yyyy,hh:mm"
                  type="dateTime"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
              {(AuthData?.Data[0].EmployeeTpye === "HOD" ||
                AuthData?.Data[0].EmployeeTpye === "ZM") && (
                <ColumnDirective
                  field="remark"
                  headerText={"Approved Remark"}
                  width="190"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
              )}
            </ColumnsDirective>

            <Inject
              services={[
                CommandColumn,
                Page,
                Filter,
                Toolbar,
                ExcelExport,
                Sort,
                Edit,
                InfiniteScroll,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};
