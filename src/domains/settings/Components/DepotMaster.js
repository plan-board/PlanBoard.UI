import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";
import { useDispatch } from "react-redux";
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
const DepotMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [depotListData, setDepotListData] = useState([]);
  const [depotManagerList, setDepotManagerList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [formDetails, setFormDetails] = useState({
    zone_id: 0,
    zone_code: "",
    Depot_id: 0,
    Depot_code: "",
    Depot_name: "",
    tenant_id: 0,
    Depotmgr_id: 0,
    Depotmgr_code: "",
  });
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });
  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
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
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.Depot_id,
      sortable: true,
    },
    {
      name: "Depot Code",
      selector: (row) => row.Depot_code,
      sortable: true,
    },
    {
      name: "Depot Name",
      selector: (row) => row.Depot_name,
      sortable: true,
    },
    {
      name: "Depot Manager Code",
      selector: (row) => row.Depotmgr_code,
      sortable: true,
    },
    {
      name: "Depot Manager Name",
      selector: (row) => row.Depotmgr_name,
      sortable: true,
    },
    {
      name: "Zone Code",
      selector: (row) => row.zone_code,
      sortable: true,
    },
    {
      name: "Zone Name",
      selector: (row) => row.zone_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: renderIconColumn,
      width: "100px",
    },
  ];

  useEffect(() => {
    fetchDepotListData();
    fetchDepotManagerData();
    fetchZoneListData();
  }, [toggleState]);

  const fetchDepotListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/DepotData",
        payload
      );

      if (response?.status === 200) {
        setDepotListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const fetchZoneListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/Master/ZoneData", payload);

      if (response?.status === 200) {
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.sort((a, b) => {
            return a.zone_name?.localeCompare(b.zone_name);
          });
          setZoneList(sortData);
        }
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const fetchDepotManagerData = async () => {
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
            val.depotManagerName =
              val.employee_name + " (" + val.employee_code + ")";
          });
          sortData.sort((a, b) => {
            return a.employee_name?.localeCompare(b.employee_name);
          });
          setDepotManagerList(sortData);
        }
        // setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const depotMangerDropdown = () => {
    return depotManagerList.map((item, index) => (
      <option key={item?.employee_id} value={item?.employee_id}>
        {item?.depotManagerName}
      </option>
    ));
  };
  const zoneDropdown = () => {
    return zoneList.map((item, index) => (
      <option key={item?.zone_id} value={item?.zone_id}>
        {item?.zone_name}
      </option>
    ));
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSetDepotMaster = async () => {
    let payload = {};
    if (formDetails.Depot_id === 0) {
      payload = {
        Token: localStorage.getItem("access_token"),
        depot_id: 0,
        isValid: 1,
        tenant_id: 0,
        depot_code: formDetails.Depot_code,
        depot_name: formDetails.Depot_name,
        depotmgr_id: parseInt(formDetails.Depotmgr_id),
        depotmgr_code: "",
        region_id: 0,
        region_code: "",
        zone_id: parseInt(formDetails.zone_id),
        ttl_area: 0,
        ttl_dealer: 0,
      };
    } else {
      payload = {
        Token: localStorage.getItem("access_token"),
        depot_id: parseInt(formDetails.Depot_id),
        isValid: 1,
        tenant_id: parseInt(formDetails.tenant_id),
        depot_code: formDetails.Depot_code,
        depot_name: formDetails.Depot_name,
        depotmgr_id: parseInt(formDetails.Depotmgr_id),
        depotmgr_code: formDetails.Depotmgr_code,
        region_id: 0,
        region_code: "",
        zone_id: parseInt(formDetails.zone_id),
        ttl_area: 0,
        ttl_dealer: 0,
      };
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/SetDepotData",
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
            zone_id: 0,
            zone_code: "",
            Depot_id: 0,
            Depot_code: "",
            Depot_name: "",
            tenant_id: 0,
            Depotmgr_id: 0,
            Depotmgr_code: "",
          });
          fetchDepotListData();
        } else {
          setResponseDetails({
            show: true,
            message: response.data.Message,
            type: "error",
          });
        }
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const getSingleRowData = async (args) => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: args.rowData.Depot_id,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/Master/DepotData",
        payload
      );

      if (response?.status === 200) {
        if (response.data.Status && response.data.Data.length > 0) {
          setFormDetails({
            zone_id: response.data.Data[0].zone_id,
            Depot_id: response.data.Data[0].Depot_id,
            Depot_code: response.data.Data[0].Depot_code
              ? response.data.Data[0].Depot_code
              : "",
            Depot_name: response.data.Data[0]?.Depot_name
              ? response.data.Data[0]?.Depot_name
              : "",
            tenant_id: response.data.Data[0]?.tenant_id
              ? response.data.Data[0]?.tenant_id
              : 0,
            Depotmgr_id: response.data.Data[0].Depotmgr_id,
            Depotmgr_code: response.data.Data[0]?.Depotmgr_code,
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
        <form>
          <table className="table-bordered table-striped equal-width-table">
            <thead style={{ color: "#000", background: "#e0e0e0" }}>
              <tr>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Depot Code
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Depot Name
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Depot Manager
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Zone Name
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Depot Code"
                    name="Depot_code"
                    value={formDetails.Depot_code}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Depot Name"
                    name="Depot_name"
                    value={formDetails.Depot_name}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <select
                    className="form-control"
                    name="Depotmgr_id"
                    value={formDetails.Depotmgr_id}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {depotMangerDropdown()}
                  </select>
                </td>
                <td style={{ width: "23%" }}>
                  <select
                    className="form-control"
                    name="zone_id"
                    value={formDetails.zone_id}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {zoneDropdown()}
                  </select>
                </td>
                <td style={{ width: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={
                      formDetails.Depot_code != "" &&
                      formDetails.Depot_name != "" &&
                      formDetails.Depotmgr_id != 0 &&
                      formDetails.zone_name != ""
                        ? false
                        : true
                    }
                    onClick={() => handleSetDepotMaster()}
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
              id="depotMasterGrid_id"
              key="depotMasterGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={depotListData}
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
                  field="Depot_id"
                  headerText={"S.No"}
                  visible={false}
                  textAlign="center"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="Depot_code"
                  headerText={"Depot Code"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="Depot_name"
                  headerText={"Depot Name"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="Depotmgr_code"
                  headerText={"Depot Mgr Code"}
                  width="130"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="Depotmgr_name"
                  headerText={"Depot Mgr Name"}
                  width="150"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="zone_code"
                  headerText={"Zone Code"}
                  width="130"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="zone_name"
                  headerText={"Zone Name"}
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

export default DepotMaster;
