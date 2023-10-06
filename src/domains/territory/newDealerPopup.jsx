import React, { useState } from "react";
import CustomPopup from "../CustomPopup";
import { Row, Col } from "reactstrap";
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
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
export const DealarPopup = ({ visibility, handleOnClose }) => {
  const [formDetails, setFormDetails] = useState({
    Sno: 0,
    dealer_name: "",
    potential: 0,
    SalesValPlan: 0,
    EstOnBoardDate: () => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  });
  const [minDate, setMinDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const commmandTemplate = [
    {
      type: "Delete",
      buttonOption: {
        cssClass: "e-flat ",
        iconCss: "e-delete e-icons e-redicon",
      },
    },
  ];
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const ErrorMsg = "This Field Can't be Blank";
    if (e.target) {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };

  const handleAdd = () => {
    console.log(formDetails);
  };
  return (
    <CustomPopup
      onClose={() => handleOnClose()}
      show={visibility}
      title="dealer"
    >
      <div className="titlePopupHeader">New Dealer Planning</div>
      <div className="employeeForm-component" style={{ marginBottom: "10px" }}>
        <Row>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <label className="formlabel">Dealer Name*</label>
            <input
              type="text"
              name="dealer_name"
              value={formDetails.dealer_name}
              onChange={handleChange}
            />
            {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <label className="formlabel">City*</label>
            <input
              type="text"
              name="city"
              value={formDetails.city}
              onChange={handleChange}
            />
            {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <label className="formlabel">Potentail(Lacs)</label>
            <input
              type="number"
              name="potential"
              value={formDetails.potential}
              onChange={handleChange}
            />
            {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <label className="formlabel">Sales Value Plan(Rs.)*</label>
            <input
              type="number"
              name="SalesValPlan"
              value={formDetails.SalesValPlan}
              onChange={handleChange}
            />
            {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
          </Col>
          <Col xl={4} lg={4} md={5} sm={5} xs={5}>
            <label className="formlabel">Estimated Onboarding Date</label>
            <input
              type="date"
              name="EstOnBoardDate"
              min={minDate}
              value={formDetails.EstOnBoardDate}
              onChange={handleChange}
            />
            {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
          </Col>
          <Col xl={2} lg={2} md={2} sm={2}>
            <div style={{ marginTop: "20px" }}>
              <button className="buttonForMainUi" onClick={() => handleAdd()}>
                <span style={{ fontFamily: "Nunito sans" }}>Add</span>
              </button>{" "}
            </div>
          </Col>
        </Row>
      </div>
      <GridComponent
        locale="en-Us"
        id="new_DelearUiGridPopup_id"
        key="new_DelearUiGridPopup_id"
        allowTextWrap={true}
        allowResizing={false}
        dataSource={[
          {
            Sno: "1",
            dealer_name: "Shankar",
            city: "New Delhi",
            potential: 40,
            SalesValPlan: 484,
            EstOnBoardDate: "8757",
          },
        ]}
        enableStickyHeader={true}
        height={"auto"}
        //   ref={}
        allowPaging={false}
        gridLines="Both"
        rowHeight={25}
        //   rowDataBound={DataBoundFocused}
        //   cellSaved={handleCellSaved}
        //   frozenColumns={1}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="Sno"
            haederText="S No."
            visible={false}
            width="50"
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="dealer_name"
            headerText="Dealer Name"
            width="100"
            textAlign="left"
            allowEditing={false}
          />
          <ColumnDirective
            field="city"
            headerText="City"
            width="100"
            textAlign="left"
            allowEditing={false}
          />
          <ColumnDirective
            field="potential"
            headerText="Potential(Lacs)"
            width="100"
            textAlign="center"
            allowEditing={false}
          />
          <ColumnDirective
            field="SalesValPlan"
            headerText="Sales Value Plan(Rs)"
            width="100"
            textAlign="center"
            allowEditing={false}
          />

          <ColumnDirective
            field="EstOnBoardDate"
            headerText="Estimated Onboarding Date"
            width="130"
            textAlign="center"
            allowEditing={false}
          />
          <ColumnDirective
            headerText="Delete"
            width="70"
            textAlign="center"
            commands={commmandTemplate}
          />
        </ColumnsDirective>
        <AggregatesDirective>
          <AggregateDirective>
            <AggregateColumnsDirective>
              <AggregateColumnDirective
                field="potential"
                type="Sum"
                format="N2"
              />
              <AggregateColumnDirective
                field="SalesValPlan"
                type="Sum"
                format="N2"
              />
            </AggregateColumnsDirective>
          </AggregateDirective>
        </AggregatesDirective>

        <Inject services={[Edit, Sort, Aggregate, CommandColumn, Freeze]} />
      </GridComponent>
      <div className="titlePopupHeader" style={{ marginTop: "10px" }}>
        <button
          className="buttonForMainUi"
          style={{ backgroundColor: "#5a240e" }}
        >
          <span style={{ fontFamily: "Nunito sans" }}> Save Details</span>
        </button>
      </div>
    </CustomPopup>
  );
};
