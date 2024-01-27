import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import axiosInstance from "../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";
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
import { CheckboxComponent } from "../../../common/Checkbox";

const CustomerMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const commmandTemplate = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
  ];
  const toolbar = ["ExcelExport", "Search"];
  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="employeeForm-component">
          <Row>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Customer Code*</label>
              <input
                type="text"
                name="employee_code"
                // value={formDetails.employee_code}
                // onChange={handleChange}
              />
              {/* {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )} */}
            </Col>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Customer Name*</label>
              <input
                type="text"
                name="employee_name"
                // value={formDetails.employee_name}
                // onChange={handleChange}
              />
              {/* {errors.employee_name && (
                <span style={{ color: "red" }}>{errors.employee_name}</span>
              )} */}
            </Col>

            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Territory</label>
              <select
                className="from_dropDownCss"
                name="type"
                // onChange={handleChange}
                // value={formDetails.type}
              >
                <option value="0">Select</option>
                <option value="HOD">HOD</option>
                <option value="ZM">ZM</option>
                <option value="DM">DM</option>
                <option value="AM">AM</option>
              </select>
              {/* {errors.type && (
                <span style={{ color: "red" }}>{errors.type}</span>
              )} */}
            </Col>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Address 1*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Address 2*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Address 3*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Postal Code*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">District*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Payment Terms*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>

            <Col xl={3} lg={3} md={6} sm={12} xs={12}>
              <label className="formlabel">Potential*</label>
              <input
                type="text"
                name="employee_email"
                // value={formDetails.employee_email}
                // onChange={handleChange}
              />
              {/* {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )} */}
            </Col>
            <Col
              xl={2}
              lg={2}
              md={4}
              sm={6}
              xs={6}
              style={{ marginTop: "1.5rem" }}
            >
              <CheckboxComponent label={"Active"} checked={true} />
            </Col>
            <Col xl={1} lg={1} md={2} sm={2} xs={2}></Col>
            <Col
              xl={1}
              lg={1}
              md={2}
              sm={2}
              xs={2}
              style={{ marginTop: "1.5rem" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                // onClick={() => handleSave()}
              >
                <i className="fa fa-plus"></i> Save
              </button>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "15px" }}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <GridComponent
              locale="en-Us"
              id="employeeMasterGrid_id"
              key="employeeMasterGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              //   dataSource={employeeList}
              height={"350px"}
              // ref={zoneMasterInstance}
              toolbar={toolbar}
              allowPaging={true}
              allowSelection={true}
              gridLines="Both"
              rowHeight={30}
              pageSettings={{ pageSize: 15, pageCount: 15 }}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              allowExcelExport={true}
              allowSorting={true}
              //   commandClick={getSingleRowData}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="employee_code"
                  headerText={"Customer code"}
                  visible={true}
                  width="180"
                  textAlign="Left"
                  allowEditing={false}
                  allowFiltering={true}
                />
                <ColumnDirective
                  field="employee_name"
                  headerText={"Customer Name"}
                  visible={true}
                  textAlign="left"
                  width="180"
                  allowEditing={false}
                  allowFiltering={true}
                />
                <ColumnDirective
                  field="employee_email"
                  headerText={"Territory"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="employee_mobile"
                  headerText={"Created On"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="role_Name"
                  headerText={"Status"}
                  width="130"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
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
      </section>
    </>
  );
};
export default CustomerMaster;
