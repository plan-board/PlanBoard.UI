import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";

// import CustomPopup from "../../CustomPopup";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";

const TerritoryMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [territoryListData, setTerritoryListData] = useState([]);
  const [territoryManagerList, setterritoryManagerList] = useState([]);
  const [depotList, setDepotList] = useState([]);
  const [formDetails, setFormDetails] = useState({
    zone_id: 0,
    depot_id: 0,
    depot_code: "",
    area_id: 0,
    area_code: "",
    area_name: "",
    areamgr_id: 0,
    areamgr_code: "",
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
      selector: (row) => row.area_id,
      sortable: true,
    },
    {
      name: "Territory Code",
      selector: (row) => row.area_code,
      sortable: true,
    },
    {
      name: "Territory Name",
      selector: (row) => row.area_name,
      sortable: true,
    },
    {
      name: "Territory Manager Code",
      selector: (row) => row.areamgr_code,
      sortable: true,
    },
    {
      name: "Territory Manager Name",
      selector: (row) => row.areamgr_name,
      sortable: true,
    },
    {
      name: "Depot Code",
      selector: (row) => row.depot_code,
      sortable: true,
    },
    {
      name: "Depot Name",
      selector: (row) => row.depot_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: renderIconColumn,
      width: "100px",
    },
  ];
  useEffect(() => {
    fetchTerritoryListData();
    fetchTerritoryManagerData();
    fetchDepotListData();
  }, [toggleState]);

  const fetchTerritoryListData = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/Master/AreaData", payload);

      if (response?.status === 200) {
        setTerritoryListData(
          response.data.Data != null ? response.data.Data : []
        );
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const fetchTerritoryManagerData = async () => {
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
          setterritoryManagerList(sortData);
        }
        // setZoneListData(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

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
        let sortData = response.data.Data != null ? response.data.Data : [];
        if (sortData.length > 0) {
          sortData.sort((a, b) => {
            return a.Depot_name?.localeCompare(b.Depot_name);
          });
          setDepotList(sortData);
        }
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const territoryMangerDropdown = () => {
    return territoryManagerList.map((item, index) => (
      <option key={item?.employee_id} value={item?.employee_id}>
        {item?.depotManagerName}
      </option>
    ));
  };
  const depotDropdown = () => {
    return depotList.map((item, index) => (
      <option key={item?.Depot_id} value={item?.Depot_id}>
        {item?.Depot_name}
      </option>
    ));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const getSingleRowData = async (args) => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: args.area_id,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/Master/AreaData", payload);

      if (response?.status === 200) {
        if (response.data.Status && response.data.Data.length > 0) {
          setFormDetails({
            zone_id: response.data.Data[0].zone_id,
            depot_id: response.data.Data[0].depot_id,
            depot_code: response.data.Data[0].depot_code
              ? response.data.Data[0].depot_code
              : "",
            area_name: response.data.Data[0]?.area_name
              ? response.data.Data[0]?.area_name
              : "",
            areamgr_id: response.data.Data[0]?.areamgr_id
              ? response.data.Data[0]?.areamgr_id
              : 0,
            area_id: response.data.Data[0]?.area_id
              ? response.data.Data[0]?.area_id
              : 0,
            area_code: response.data.Data[0].area_code,
            areamgr_code: response.data.Data[0]?.areamgr_code,
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
  const handleSetTerritoryMaster = async () => {
    let payload = {};
    if (formDetails.area_id === 0) {
      payload = {
        Token: localStorage.getItem("access_token"),
        area_id: 0,
        isValid: 1,
        area_code: formDetails.area_code,
        area_name: formDetails.area_name,
        areamgr_id: parseInt(formDetails.areamgr_id),
        areamgr_code: "",
        depot_id: parseInt(formDetails.depot_id),
        depot_code: "",
        ttl_dealer: 0,
      };
    } else {
      payload = {
        Token: localStorage.getItem("access_token"),
        area_id: formDetails.area_id,
        isValid: 1,
        area_code: formDetails.area_code,
        area_name: formDetails.area_name,
        areamgr_id: parseInt(formDetails.areamgr_id),
        areamgr_code: formDetails.areamgr_code,
        depot_id: parseInt(formDetails.depot_id),
        depot_code: formDetails.depot_code,
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
            depot_id: 0,
            depot_code: "",
            area_id: 0,
            area_code: "",
            area_name: "",
            areamgr_id: 0,
            areamgr_code: "",
          });
          fetchTerritoryListData();
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

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <form>
          <table className="table-bordered table-striped equal-width-table">
            <thead>
              <tr>
                <th>
                  <label htmlFor="selectionBox">Territory Code</label>
                </th>
                <th>
                  <label htmlFor="selectionBox">Territory Name</label>
                </th>
                <th>
                  <label htmlFor="selectionBox">Territory Manager</label>
                </th>
                <th>
                  <label htmlFor="selectionBox">Depot Name</label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Territory Code"
                    name="area_code"
                    value={formDetails.area_code}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="Territory Name"
                    name="area_name"
                    value={formDetails.area_name}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <select
                    className="form-control"
                    name="areamgr_id"
                    value={formDetails.areamgr_id}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {territoryMangerDropdown()}
                  </select>
                </td>
                <td style={{ width: "23%" }}>
                  <select
                    className="form-control"
                    name="depot_id"
                    value={formDetails.depot_id}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {depotDropdown()}
                  </select>
                </td>
                <td style={{ width: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={
                      formDetails.area_code != "" &&
                      formDetails.area_name != "" &&
                      formDetails.areamgr_id != 0 &&
                      formDetails.depot_id != 0
                        ? false
                        : true
                    }
                    onClick={() => handleSetTerritoryMaster()}
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
            data={territoryListData}
            pagination
            className="datatable"
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            subHeader
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

export default TerritoryMaster;