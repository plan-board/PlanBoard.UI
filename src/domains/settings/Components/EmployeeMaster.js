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
const EmployeeMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [designatioList, setDesignationList] = useState([]);
  const [reportingMgrList, setReportingMgrList] = useState([]);

  const [formDetails, setFormDetails] = useState({
    employee_code: "",
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_id: 0,
    role_id: 0,
    designation_id: 0,
    reportingmgr_id: 0,
    employee_Password: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    employee_code: "",
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_Password: "",
    role_id: "",
    type: "",
  });
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });
  const renderIconColumn = (row) => {
    return (
      <span onClick={() => getSingleRowData(row)}>
        <i
          className="fa fa-pencil c-pointer text-primary"
          title="Click to update"
        ></i>
      </span>
    );
  };
  // let some = {
  //   employee_id: 2,
  //   isValid: 1,
  //   employee_code: "500627",
  //   employee_name: "Suresh Nair",
  //   employee_email: "suresh.nair@shalimarpaints.com",
  //   employee_mobile: 9833610000,
  //   role_id: 7,
  //   role_Name: "Sales Manager",
  //   designation_id: 0,
  //   designation_name: null,
  //   reportingmgr_id: 1,
  //   reportingmgr_name: "Kuldip Raina",
  //   reportinngmgr_code: "D501190",
  //   type: null,
  //   TTY: null,
  //   DEPO: null,
  // };
  const columns = [
    {
      name: "Employee Code",
      selector: (row) => row.employee_code,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.employee_email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.employee_mobile,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role_Name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation_name,
      sortable: true,
    },
    {
      name: "Reporting Manager Name",
      selector: (row) => row.reportingmgr_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: renderIconColumn,
      width: "100px",
    },
  ];
  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
  };
  useEffect(() => {
    fetchEmployeeList();
    fetchReportingManagerData();
    fetchRoleListData();
    fetchDesignationListData();
  }, [toggleState]);

  const fetchEmployeeList = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      EmployeeId: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("GetEmployeeData", payload);

      if (response?.status === 200) {
        setEmployeeList(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const resetForm = () => {
    setFormDetails({
      employee_code: "",
      employee_name: "",
      employee_email: "",
      employee_mobile: "",
      employee_id: 0,
      role_id: 0,
      designation_id: 0,
      reportingmgr_id: 0,
      employee_Password: "",
      type: "",
    });
    setErrors({
      employee_code: "",
      employee_name: "",
      employee_email: "",
      employee_mobile: "",
      employee_Password: "",
      role_id: "",
      type: "",
    });
  };

  const getSingleRowData = async (args) => {
    resetForm();
    const payload = {
      Token: localStorage.getItem("access_token"),
      EmployeeId: args.rowData.employee_id,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("GetEmployeeData", payload);
      if (response?.status === 200) {
        setFormDetails({
          employee_code: response.data.Data[0].employee_code,
          employee_name: response.data.Data[0].employee_name,
          employee_email: response.data.Data[0].employee_email,
          employee_mobile: response.data.Data[0].employee_mobile,
          employee_id: response.data.Data[0].employee_id,
          role_id: response.data.Data[0].role_id,
          designation_id: response.data.Data[0].designation_id,
          reportingmgr_id: response.data.Data[0].reportingmgr_id,
          type: response.data.Data[0].type,
          employee_Password: "",
        });
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const fetchReportingManagerData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      EmployeeId: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("GetEmployeeData", payload);

      if (response?.status === 200) {
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.map((val) => {
            val.reportingManagerName =
              val.employee_name + " (" + val.employee_code + ")";
          });
          sortData.sort((a, b) => {
            return a.employee_name?.localeCompare(b.employee_name);
          });
          setReportingMgrList(sortData);
        }
        // setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const fetchRoleListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/GetRoleList",
        payload
      );

      if (response?.status === 200) {
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.sort((a, b) => {
            return a.zone_name?.localeCompare(b.zone_name);
          });
          setRoleList(sortData);
        }
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const fetchDesignationListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/GetDesignationList",
        payload
      );

      if (response?.status === 200) {
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.sort((a, b) => {
            return a.zone_name?.localeCompare(b.zone_name);
          });
          setDesignationList(sortData);
        }
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const ReportingMgrDropdown = () => {
    return reportingMgrList.map((item, index) => (
      <option key={item?.employee_id} value={item?.employee_id}>
        {item?.reportingManagerName}
      </option>
    ));
  };

  const RoleDropdown = () => {
    return roleList.map((item, index) => (
      <option key={item?.role_ID} value={item?.role_ID}>
        {item?.role_Name}
      </option>
    ));
  };
  const DesignationDropdown = () => {
    return designatioList.map((item, index) => (
      <option key={item?.designation_id} value={item?.designation_id}>
        {item?.designation_name}
      </option>
    ));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const ErrorMsg = "This Field Can't be Blank";
    // setFormDetails
    if (name === "employee_email") {
      let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailRegex.test(e.target.value)) {
        setFormDetails({ ...formDetails, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setFormDetails({ ...formDetails, [name]: value });
        setErrors({ ...errors, [name]: "Not A Valid Email Address" });
      }
    } else if (name === "employee_mobile") {
      let mobileRegex =
        /^(?:\+?1[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
      if (mobileRegex.test(e.target.value)) {
        setFormDetails({ ...formDetails, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setFormDetails({ ...formDetails, [name]: value });
        setErrors({ ...errors, [name]: "Not A Valid Mobile Number" });
      }
    } else {
      setFormDetails({ ...formDetails, [name]: value });
      setErrors({
        ...errors,
        [name]: value ? "" : "This Field Can't be Blank",
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let error = errors;
    const ErrorMsg = "This Field Can't be Blank";
    if (formDetails["employee_code"] == "") {
      formIsValid = false;
      error["employee_code"] = ErrorMsg;
    }
    if (formDetails["employee_name"] == "") {
      formIsValid = false;
      error["employee_name"] = ErrorMsg;
    }
    if (formDetails["employee_email"] == "") {
      formIsValid = false;
      error["employee_email"] = ErrorMsg;
    }
    if (formDetails["employee_mobile"] == "") {
      formIsValid = false;
      error["employee_mobile"] = ErrorMsg;
    }
    if (formDetails["employee_Password"] == "") {
      formIsValid = false;
      error["employee_Password"] = ErrorMsg;
    }
    if (formDetails["role_id"] == "" || formDetails["role_id"] == 0) {
      formIsValid = false;
      error["role_id"] = ErrorMsg;
    }
    if (formDetails["type"] == "" || formDetails["type"] == 0) {
      formIsValid = false;
      error["type"] = ErrorMsg;
    }

    setErrors({ ...error });
    return formIsValid;
  };

  const handleSave = async (e) => {
    if (validateForm()) {
      setLoading(true);
      let payload = {};
      if (formDetails.employee_id == 0) {
        payload = {
          Token: localStorage.getItem("access_token"),
          employee_id: 0,
          isValid: 1,
          employee_code: formDetails.employee_code,
          employee_name: formDetails.employee_name,
          employee_email: formDetails.employee_email,
          employee_mobile: formDetails.employee_email,
          role_id: parseInt(formDetails.role_id),
          designation_id: parseInt(formDetails.designation_id),
          reportingmgr_id: parseInt(formDetails.reportingmgr_id),
          reportinngmgr_code: "",
          type: formDetails.type,
          password: formDetails.employee_Password,
          TTY: "",
          DEPO: "",
        };
      } else {
        payload = {
          Token: localStorage.getItem("access_token"),
          employee_id: parseInt(formDetails.employee_id),
          isValid: 1,
          employee_code: formDetails.employee_code,
          employee_name: formDetails.employee_name,
          employee_email: formDetails.employee_email,
          employee_mobile: formDetails.employee_email,
          role_id: parseInt(formDetails.role_id),
          designation_id: parseInt(formDetails.designation_id),
          reportingmgr_id: parseInt(formDetails.reportingmgr_id),
          reportinngmgr_code: "",
          type: formDetails.type,
          password: formDetails.employee_Password,
          TTY: "",
          DEPO: "",
        };
      }
      try {
        const response = await axiosInstance.post("SetEmployeeData", payload);

        if (response?.status === 200) {
          if (response.data.Status) {
            setResponseDetails({
              show: true,
              message: response.data.Message,
              type: "error",
            });
            resetForm();
            fetchEmployeeList();
          } else {
            setResponseDetails({
              show: true,
              message: response.data.Message,
              type: "error",
            });
          }
        }
        setLoading(false);
      } catch (error) {}
    } else {
      setResponseDetails({
        show: true,
        message: "Please Fill All Mandatory Fields",
        type: "error",
      });
    }
  };
  const commmandTemplate = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
  ];

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="employeeForm-component">
          <Row>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Employee Code*</label>
              <input
                type="text"
                name="employee_code"
                value={formDetails.employee_code}
                onChange={handleChange}
              />
              {errors.employee_code && (
                <span style={{ color: "red" }}>{errors.employee_code}</span>
              )}
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Employee Name*</label>
              <input
                type="text"
                name="employee_name"
                value={formDetails.employee_name}
                onChange={handleChange}
              />
              {errors.employee_name && (
                <span style={{ color: "red" }}>{errors.employee_name}</span>
              )}
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Email*</label>
              <input
                type="text"
                name="employee_email"
                value={formDetails.employee_email}
                onChange={handleChange}
              />
              {errors.employee_email && (
                <span style={{ color: "red" }}>{errors.employee_email}</span>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Mobile*</label>
              <input
                type="text"
                name="employee_mobile"
                value={formDetails.employee_mobile}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.employee_mobile && (
                <span style={{ color: "red" }}>{errors.employee_mobile}</span>
              )}
            </Col>

            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Role*</label>
              <select
                className="from_dropDownCss"
                name="role_id"
                onChange={handleChange}
                value={formDetails.role_id}
              >
                <option value="0">Select</option>
                {RoleDropdown()}
              </select>
              {errors.role_id && (
                <span style={{ color: "red" }}>{errors.role_id}</span>
              )}
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Designation</label>
              <select
                className="from_dropDownCss"
                name="designation_id"
                onChange={handleChange}
                value={formDetails.designation_id}
              >
                <option value="0">Select</option>
                {DesignationDropdown()}
              </select>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Reporting Manager</label>
              <select
                className="from_dropDownCss"
                name="reportingmgr_id"
                onChange={handleChange}
                value={formDetails.reportingmgr_id}
              >
                <option value="0">Select</option>
                {ReportingMgrDropdown()}
              </select>
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Type</label>
              <select
                className="from_dropDownCss"
                name="type"
                onChange={handleChange}
                value={formDetails.type}
              >
                <option value="0">Select</option>
                <option value="HOD">HOD</option>
                <option value="ZM">ZM</option>
                <option value="DM">DM</option>
                <option value="AM">AM</option>
              </select>
              {errors.type && (
                <span style={{ color: "red" }}>{errors.type}</span>
              )}
            </Col>

            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
              <label className="formlabel">Password*</label>
              <input
                type="text"
                name="employee_Password"
                value={formDetails.employee_Password}
                onChange={handleChange}
              />
              {errors.employee_Password && (
                <span style={{ color: "red" }}>{errors.employee_Password}</span>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xl={1} lg={1} md={2} sm={2} xs={2}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSave()}
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
              dataSource={employeeList}
              enableStickyHeader={true}
              height={"350px"}
              // ref={zoneMasterInstance}
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
                  field="employee_code"
                  headerText={"Employee Code"}
                  visible={true}
                  width="180"
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={true}
                />
                <ColumnDirective
                  field="employee_name"
                  headerText={"Employee Name"}
                  visible={true}
                  textAlign="left"
                  width="180"
                  allowEditing={false}
                  allowFiltering={true}
                />
                <ColumnDirective
                  field="employee_email"
                  headerText={"Email"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="employee_mobile"
                  headerText={"Mobile"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="role_Name"
                  headerText={"Role"}
                  width="130"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="designation_name"
                  headerText={"Designation"}
                  width="150"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="reportingmgr_name"
                  headerText={"Reporting Manager Name"}
                  width="150"
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
        <ResponsePopup
          show={responseDetails.show}
          text={responseDetails.message}
          type={responseDetails.type}
          onClose={handleCloseResponse}
        />
      </section>
    </>
  );
};

export default EmployeeMaster;
