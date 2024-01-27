import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import {
  MultiSelectComponent,
  CheckBoxSelection,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { Inject } from "@syncfusion/ej2-react-grids";

export const PreJourneyForm = ({
  handleChange,
  customerList,
  customterMultiInstance,
  formDetails,
  handleSave,
}) => {
  const [minDate, setMinDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  return (
    <>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">Customer*</label>
          {/* <MultiSelectComponent
            id={"customerid"}
            key={"customerid"}
            dataSource={customerList}
            ref={customterMultiInstance}
            fields={{ text: "customername", value: "customerid" }}
            placeholder={"Select Customer"}
            //   mode={modes}
            showSelectAll={false}
            showDropDownIcon={true}
            filterBarPlaceholder={"Customer"}
            popupHeight={"185px"}
            change={handleChange}
            cssClass={"e-outline"}
            floatLabelType="Never"
            enabled={true}
          >
            <Inject services={[CheckBoxSelection]} />
          </MultiSelectComponent> */}
          <DropDownListComponent
            id={"customerid"}
            key={"customerid"}
            dataSource={customerList}
            ref={customterMultiInstance}
            fields={{ text: "customername", value: "customerid" }}
            placeholder={"Select Customer"}
            showDropDownIcon={true}
            filterBarPlaceholder={"Search Customer"}
            popupHeight={"185px"}
            change={handleChange}
            cssClass={"e-outline"}
            floatLabelType="Never"
            enabled={true}
            allowFiltering={true}
          />
        </Col>

        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">Date*</label>
          <input
            type="date"
            name="visitdate"
            min={minDate}
            value={formDetails.visitdate}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col xl={9} lg={9} md={9} sm={9} xs={9}>
          <label className="formlabel">Description*</label>
          <textarea
            type="text"
            name="visitpurpose"
            value={formDetails.visitpurpose}
            onChange={handleChange}
          />
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3} style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSave()}
          >
            <i className="fa fa-plus"></i> Save
          </button>
        </Col>
      </Row>
    </>
  );
};
