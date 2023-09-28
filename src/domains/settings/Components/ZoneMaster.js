import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";

// import CustomPopup from "../../CustomPopup";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";

const ZoneMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
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

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.zone_id,
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
      name: "Zone Manager Code",
      selector: (row) => row.zonemgr_code,
      sortable: true,
    },
    {
      name: "Zone Manager Name",
      selector: (row) => row.zonemgr_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: renderIconColumn,
      width: "150px",
    },
  ];

  const getSingleRowData = async (args) => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      // Token: "19F38171-3B54-400D-ABA8-0882CE93319",
      entity_id: args.zone_id,
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
        ttl_region: 0,
        ttl_depot: 0,
        ttl_area: 0,
        ttl_dealer: 0,
        zone_group: "",
        zone_group_color: "",
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
        ttl_region: 0,
        ttl_depot: 0,
        ttl_area: 0,
        ttl_dealer: 0,
        zone_group: formDetails.zone_group,
        zone_group_color: "",
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

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <form>
          <table className="table-bordered table-striped equal-width-table">
            <thead>
              <tr>
                <th>
                  <label htmlFor="selectionBox">Zone Code</label>
                </th>
                <th>
                  <label htmlFor="selectionBox">Zone Name</label>
                </th>
                <th>
                  <label htmlFor="selectionBox">Zone Manager</label>
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
                      formDetails.zone_id != "" &&
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
        <div className="tbl-container">
          <DataTable
            columns={columns}
            data={zoneListData}
            pagination
            className="datatable"
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            subHeader
            //   subHeaderComponent={
            //     <CustomSubHeaderComponent align="left">
            //       {additionalComponent}
            //     </CustomSubHeaderComponent>
            //   }
          />
        </div>
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
