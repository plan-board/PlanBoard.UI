import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingPlaceholder from "../../../components/LoadingPlaceholder";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import DataTable from "react-data-table-component";

const FocusSectorMaster = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [monthId, setMonth] = useState(0);
  const [fyId, setFYear] = useState(0);
  const [mSectorId, setMSector] = useState(0);

  const [fyList, setFYlist] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [mSectorList, setMSectorList] = useState([]);
  const [sectorMaster, setSectorMaster] = useState([]);

  const payload = {
    Token: localStorage.getItem("access_token"),
    FPParam: [
      {
        FYId: 0,
        Month: 0,
        MarketSectorId: 0,
      },
    ],
  };

  const fetchFocusSector = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("GetFocusProduct", payload);
      // console.log("=====GetFocusProduct====", response);
      if (response?.status === 200) {
        setSectorMaster(response.data.Data != null ? response.data.Data : []);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  // fetch Focus Sector
  useEffect(() => {
    fetchFocusSector();
  }, []);

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      FPDealerWiseParam: [
        {
          FYId: 0,
        },
      ],
    };

    const fetchFY = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "api/Master/GetFYList",
          payload
        );
        // console.log("=====api/Master/GetFYList====", response);
        if (response?.status === 200) {
          setFYlist(response.data.Data != null ? response.data.Data : []);
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };
    const payloadMs = {
      Token: localStorage.getItem("access_token"),
      marketsector_id: 0,
    };
    const fetchMSList = async () => {
      try {
        const response = await axiosInstance.post(
          "api/Master/GetMarketSectorList",
          payloadMs
        );
        // console.log("=====api/Master/GetMarketSectorList====", response);
        if (response?.status === 200) {
          setMSectorList(response.data.Data != null ? response.data.Data : []);
        }
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchFY();
    fetchMSList();
  }, []);

  const fyDropdown = () => {
    return fyList.map((item, index) => (
      <option key={item?.fy_id} value={item?.fy_id}>
        {item?.fy_name}
      </option>
    ));
  };

  const marketSecDropdown = () => {
    return mSectorList.map((item, index) => (
      <option key={item?.marketsectorid} value={item?.marketsectorid}>
        {item?.marketsectorname}
      </option>
    ));
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setFYear(parseInt(event.target.value));
  };

  const handleSectorChange = (event) => {
    setMSector(parseInt(event.target.value));
  };

  const handleSetFocusProduct = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      FocusedProductParam: [
        {
          FYId: fyId,
          Month: monthId,
          MarketSectorId: mSectorId,
        },
      ],
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("SetFocusedProduct", payload);
      //   console.log("=====SetFocusProduct====", response);
      if (response?.status === 200) {
        alert(response?.data?.Data?.[0]?.MESSAGE);
        fetchFocusSector();
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.tableid,
      sortable: true,
    },
    {
      name: "FY",
      selector: (row) => row.FYName,
      sortable: true,
    },
    {
      name: "Month",
      selector: (row) => row.Month,
      sortable: true,
    },
    {
      name: "Focus Sector",
      selector: (row) => row.MarketSectorName,
      sortable: true,
    },
  ];
  const [filterText, setFilterText] = useState('');
  const filteredItems = sectorMaster.filter(
    item => item.MarketSectorName && item.MarketSectorName.toLowerCase().includes(filterText.toLowerCase()),
  );

  const CustomSubHeaderComponent = ({ children, align }) => {
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'left' ? 'flex-start' : 'center',
      marginBottom: '10px',
    };

    return (
      <div className=" w3-left " style={containerStyle}>
        {children}
      </div>
    );
  };

  const additionalComponent = (
    <span className="w3-left w3-margin-right "> Monthly Focus Sectors(s)   ({filteredItems?.length}) </span>
  );

  const subHeaderComponent = (
    <input className="w3-margin-bottom w3-input w3-border filterInput"
      type="text"
      placeholder="Filter By Sector  Name"
      aria-label="Search Input"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );

  return (
    <>
      <p className="w3-small h6 ">Manage Monthly Focus Sectors </p>
      <hr />
      <form className=" ">
        <table className=" w3-table table-bordered  h6 w3-small w3-white  text-left">
          <tr className=" w3-light-gray  h6">
            <td className=" ">
              <label htmlFor="selectionBox">FY</label>
              <select
                className="w3-select"
                value={fyId}
                onChange={handleYearChange}
              >
                <option value={0}>Select</option>
                {fyDropdown()}
              </select>
            </td>
            <td className=" ">
              {" "}
              <label htmlFor="selectionBox">Month</label>
              <select
                className="w3-select"
                value={monthId}
                onChange={handleMonthChange}
              >
                <option value="0">Select</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </td>
            <td className=" ">
              {" "}
              <label htmlFor="selectionBox">Market Sector</label>
              <select
                className="w3-select"
                value={mSectorId}
                onChange={handleSectorChange}
              >
                {" "}
                <option value={0}>All</option>
                {marketSecDropdown()}
              </select>
            </td>
            <td className=" " style={{ width: "30px" }}>
              {" "}
              <br />
              <button
                type="button"
                className="w3-button w3-indigo"
                disabled={mSectorId && monthId && fyId ? false : true}
                onClick={() => handleSetFocusProduct()}
                style={{ marginTop: "10px" }}
              >
                <i className="fa fa-plus"></i> Save
              </button>
            </td>
          </tr>
        </table>
      </form>
      <div className="w3-row w3-padding-16"> </div>
      <div>
      {subHeaderComponent}
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        className="datatable"
        fixedHeader={true}
        fixedHeaderScrollHeight="400px" subHeader
        subHeaderComponent={
          <CustomSubHeaderComponent align="left">
            {additionalComponent}
          </CustomSubHeaderComponent>
        }
      />

      {/* <table className=" w3-table table-bordered  h6 w3-small w3-white  text-left">
        <tr className=" w3-light-gray  h6">
          <td className=" "> S.No </td>
          <td className=" "> FY </td>
          <td className=" "> Month </td>
          <td className=" "> Focus Sector </td>
          <td className=" " colspan="2">
            {" "}
            Action{" "}
          </td>
        </tr>

        {isLoading ? (
          <tr>
            <td colSpan="13">
              <LoadingPlaceholder numberOfRows={2}></LoadingPlaceholder>
            </td>
          </tr>
        ) : (
          <>
            {sectorMaster.length == 0 ? (
              <tr>
                <td
                  colSpan="13"
                  className="w3-large w3-text-gray w3-padding h4"
                >
                  {" "}
                  No Data Found
                </td>
              </tr>
            ) : (
              sectorMaster.map((item, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{item?.FYName}</td>
                  <td className="">{item?.Month}</td>
                  <td className="">{item?.MarketSectorName}</td>
                  <td className="" style={{ width: "30px" }}>
                    <i className="w3-button w3-teal fa fa-pencil"></i>{" "}
                  </td>

                  <td className="" style={{ width: "30px" }}>
                    <i className="w3-button w3-red fa fa-remove"></i>{" "}
                  </td>
                </tr>
              ))
            )}
          </>
        )}
      </table> */}
    </>
  );
};

export default FocusSectorMaster;
