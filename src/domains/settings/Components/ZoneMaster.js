import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import { Row, Col } from "reactstrap";
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

// import CustomPopup from "../../CustomPopup";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";

const ZoneMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  let zoneMasterInstance = useRef();
  const [isLoading, setLoading] = useState(false);
  const [zoneListData, setZoneListData] = useState([]);
  const [zoneManagerList, setZoneManagerList] = useState([]);
  const [formDetails, setFormDetails] = useState({
    zonemgr_id: 0,
    zone_name: "",
    zone_code: "",
    tenant_id: 0,
    zonemgr_code: "",
    zone_group: "",
    zone_id: 0,
  });
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  useEffect(() => {
    fetchZoneListData();
    fetchZoneManagerData();
  }, [toggleState]);

  const fetchZoneListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/Master/ZoneData", payload);

      if (response?.status === 200) {
        setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const fetchZoneManagerData = async () => {
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
            val.zoneManagerName =
              val.employee_name + " (" + val.employee_code + ")";
          });
          sortData.sort((a, b) => {
            return a.employee_name?.localeCompare(b.employee_name);
          });
          setZoneManagerList(sortData);
        }
        // setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
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

  const getSingleRowData = async (args) => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      // Token: "19F38171-3B54-400D-ABA8-0882CE93319",
      entity_id: args.rowData.zone_id,
    };

    setLoading(true);
    try {
      const response = await axiosInstance.post("api/Master/ZoneData", payload);

      if (response?.status === 200) {
        if (response.data.Status && response.data.Data.length > 0) {
          setFormDetails({
            zone_id: response.data.Data[0].zone_id,
            zone_name: response.data.Data[0].zone_name,
            zone_group: response.data.Data[0].zone_group
              ? response.data.Data[0].zone_group
              : "",
            zonemgr_code: response.data.Data[0]?.zonemgr_code
              ? response.data.Data[0]?.zonemgr_code
              : "",
            tenant_id: response.data.Data[0]?.tenant_id
              ? response.data.Data[0]?.tenant_id
              : 0,
            zone_code: response.data.Data[0].zone_code,
            zonemgr_id: response.data.Data[0]?.zonemgr_id,
          });
        } else {
          setResponseDetails({
            show: true,
            message: response.data.Message,
            type: "error",
          });
        }
        setLoading(false);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const zoneMangerDropdown = () => {
    return zoneManagerList.map((item, index) => (
      <option key={item?.employee_id} value={item?.employee_id}>
        {item?.zoneManagerName}
      </option>
    ));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSetZoneProduct = async () => {
    let payload = {};

    if (formDetails.zone_id === 0) {
      payload = {
        Token: localStorage.getItem("access_token"),
        zone_id: 0,
        isValid: 1,
        tenant_id: 0,
        zone_code: formDetails.zone_code,
        zone_name: formDetails.zone_name,
        zonemgr_id: parseInt(formDetails.zonemgr_id),
        zonemgr_code: "",
      };
    } else {
      payload = {
        Token: localStorage.getItem("access_token"),
        zone_id: formDetails.zone_id,
        isValid: 1,
        tenant_id: formDetails.tenant_id,
        zone_code: formDetails.zone_code,
        zone_name: formDetails.zone_name,
        zonemgr_id: parseInt(formDetails.zonemgr_id),
        zonemgr_code: formDetails.zonemgr_code,
      };
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/SetZoneData",
        payload
      );

      if (response?.status === 200) {
        setLoading(false);
        if (response.data.Status) {
          setResponseDetails({
            show: true,
            message: response.data.Message,
            type: "success",
          });
          setFormDetails({
            zonemgr_id: 0,
            zone_name: "",
            zone_code: "",
            tenant_id: 0,
            zonemgr_code: "",
            zone_group: "",
            zone_id: 0,
          });
          fetchZoneListData();
        } else {
          setResponseDetails({
            show: true,
            message: response.data.Message,
            type: "error",
          });
        }
        // setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
  };
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
        <form>
          <table className="table-bordered table-striped equal-width-table">
            <thead style={{ color: "#000", background: "#e0e0e0" }}>
              <tr>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Zone Code
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Zone Name
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Zone Manager
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "32%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Zone Code"
                    name="zone_code"
                    value={formDetails.zone_code}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "32%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Zone Name"
                    name="zone_name"
                    value={formDetails.zone_name}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "32%" }}>
                  <select
                    className="form-control"
                    value={formDetails.zonemgr_id}
                    onChange={handleChange}
                    name="zonemgr_id"
                  >
                    <option value="0">Select</option>
                    {zoneMangerDropdown()}
                  </select>
                </td>
                <td style={{ width: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={
                      formDetails.zone_code != "" &&
                      formDetails.zone_name != "" &&
                      formDetails.zonemgr_id != 0
                        ? false
                        : true
                    }
                    onClick={() => handleSetZoneProduct()}
                  >
                    <i className="fa fa-plus"></i> Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Row style={{ marginTop: "15px" }}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <GridComponent
              locale="en-Us"
              id="zoneMasterGrid_id"
              key="zoneMasterGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={zoneListData}
              height={"350px"}
              ref={zoneMasterInstance}
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
              commandClick={getSingleRowData}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="zone_id"
                  headerText={"S.No"}
                  width="130"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="zone_code"
                  headerText={"Zone Code"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="zone_name"
                  headerText={"Zone Name"}
                  width="90"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="zonemgr_code"
                  headerText={"Zone Manager Code"}
                  width="130"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="zonemgr_name"
                  headerText={"Zone Manager Name"}
                  width="130"
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

export default ZoneMaster;
