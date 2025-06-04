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
} from "@syncfusion/ej2-react-grids";
// import { CheckboxComponent } from "../../../common/Checkbox";

export const PreJourneyGrid = ({
  gridFormDetails,
  visitedList,
  customterGridInstance,
  gridHandleChange,
  handleSearch,
  getSingleRowData,
}) => {
  const commmandTemplate = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
  ];
  return (
    <>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">From Date</label>
          <input
            type="date"
            name="formDate"
            // min={minDate}
            value={gridFormDetails.formDate}
            onChange={gridHandleChange}
          />
        </Col>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">To Date</label>
          <input
            type="date"
            name="toDate"
            // min={minDate}
            value={gridFormDetails.toDate}
            onChange={gridHandleChange}
          />
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3} style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSearch()}
          >
            <i className="fa fa-search"></i> Search
          </button>
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col xl={12} lg={12} md={12} xs={12} sm={12}>
          <GridComponent
            locale="en-Us"
            id="visitPlanMasterGrid_id"
            key="visitPlanMasterGrid_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={visitedList}
            height={"350px"}
            ref={customterGridInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            pageSettings={{ pageSize: 15, pageCount: 15 }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
            commandClick={getSingleRowData}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="zone_name"
                headerText={"Zone"}
                visible={true}
                width="130"
                textAlign="Left"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="depot_name"
                headerText={"Depot"}
                visible={true}
                textAlign="left"
                width="140"
                allowEditing={false}
                allowFiltering={true}
              />
              <ColumnDirective
                field="territoryname"
                headerText={"Area"}
                width="130"
                visible={true}
                textAlign="left"
                allowEditing={false}
              />
              <ColumnDirective
                field="customercode"
                headerText={"Customer Code"}
                width="130"
                visible={true}
                textAlign="left"
                allowEditing={false}
              />
              <ColumnDirective
                field="customername"
                headerText={"Customer Name"}
                width="130"
                format={"N2"}
                visible={true}
                textAlign="center"
                allowEditing={false}
              />
              <ColumnDirective
                field="visitdate"
                headerText={" Visit Date"}
                width="130"
                textAlign="center"
                type="date"
                format="dd-MMM-yyyy"
              />

              <ColumnDirective
                headerTemplate="Action"
                width="100"
                visible={true}
                textAlign="center"
                allowEditing={false}
                commands={commmandTemplate}
                allowSorting={false}
              />
            </ColumnsDirective>

            <Inject
              services={[
                CommandColumn,
                Page,
                Filter,
                Toolbar,
                ExcelExport,
                Sort,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>
    </>
  );
};
