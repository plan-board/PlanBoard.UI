import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
// import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
// import ZoneDropDown from "./ZoneDropDown";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const DepoMonthWiseSalesReport = ({ selectedZone, selectedDepot }) => {
  // console.log('"-----on click');
  const dispatch = useDispatch();
  const [monthWiseSalesData, setMonthWiseSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    console.log("-calling DepotMonthPlan api from dpo mon wise re");
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: 0, //selectedDepot
    };
    const fetchDepotSalesPlan = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("DepotMonthPlan", payload);
        console.log("=====DepotMonthPlan====", response);
        if (response?.status === 200) {
          setMonthWiseSalesData(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchDepotSalesPlan();
  }, [selectedZone]);

  // builkd table colunms

  const filteredItems = monthWiseSalesData.filter(
    (item) =>
      item.depot_name &&
      item.depot_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const CustomSubHeaderComponent = ({ children, align }) => {
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: align === "left" ? "space-between" : "center",
      marginBottom: "10px",
      width: "100%",
    };

    return (
      <div className="w3-left" style={containerStyle}>
        {children}
      </div>
    );
  };

  const filterComponent = (
    <input
      type="text"
      placeholder="Search..."
      style={{ marginRight: "10px" }}
    />
  );

  const rowCount = monthWiseSalesData.length;

  const additionalComponent = (
    <span className="w3-left w3-margin-right "> Depots ({rowCount}) </span>
  );

  const subHeaderComponent = (
    <input
      type="text"
      placeholder="Filter By Depot Name"
      aria-label="Search Input"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );

  const ExportButton = ({ onExport }) => (
    <button onClick={onExport}>
      {" "}
      <i className="fa fa-excel"> </i> Export{" "}
    </button>
  );
  const handleExport = () => {
    console.log("Exporting table data");
  };
   
  const columns = [
    {
      fixed: "left",
      columns: [
        {
          Header: "Zone",
          accessor: "zone_name",
          sortable: true,
        },
        {
          Header: "Depot",
          accessor: "depot_name",
          sortable: true,
        },
        {
          Header: "LLY",
          accessor: "LLY_Value",
          sortable: true,
        },
        {
          Header: "LY",
          accessor: "LY_Value",
          sortable: true,
          fixed: "left",
        },
        {
          Header: "CY Plan",
          accessor: "CY_Value",
          sortable: true,
          fixed: "left",
        },
        {
          Header: "YTD",
          accessor: "YTD_Value",
          sortable: true,
          fixed: "left",
        },
      ],
    },
    {
      columns: [
        {
          Header: "Apr",
          accessor: "Apr_Month_Value",
          sortable: true,
        },
        {
          Header: "May",
          accessor: "May_Month_Value",
          sortable: true,
        },
        {
          Header: "Jun",
          accessor: "Jun_Month_Value",
          sortable: true,
        },
        {
          Header: "Jul",
          accessor: "Jul_Month_Value",
          sortable: true,
        },
        {
          Header: "Aug",
          accessor: "Aug_Month_Value",
          sortable: true,
        },
        {
          Header: "Sep",
          accessor: "Sep_Month_Value",
          sortable: true,
        },
        {
          Header: "Oct",
          accessor: "Oct_Month_Value",
          sortable: true,
        },
        {
          Header: "Nov",
          accessor: "Nov_Month_Value",
          sortable: true,
        },
        {
          Header: "Dec",
          accessor: "Dec_Month_Value",
          sortable: true,
        },
        {
          Header: "Jan",
          accessor: "Jan_Month_Value",
          sortable: true,
        },
        {
          Header: "Feb",
          accessor: "Feb_Month_Value",
          sortable: true,
        },

        {
          Header: "Mar",
          accessor: "Mar_Month_Value",
          sortable: true,
        },
      ],
    },
  ];
  // console.log("222", filteredItems);
  return (
    <>
       
      <ReactTableFixedColumns
        data={filteredItems}
        columns={columns}
        defaultPageSize={10}
        className="datatable"
        fixedHeaderScrollHeight="400px"
        subHeaderComponent={
          <CustomSubHeaderComponent align="left">
            {additionalComponent}
            {subHeaderComponent}
          </CustomSubHeaderComponent>
        }
      />
    </>
  );
};

export default DepoMonthWiseSalesReport;
