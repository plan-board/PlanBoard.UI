import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const TerritoryMonthWiseSalesReport = ({ selectedDepot }) => {
  const dispatch = useDispatch();
  const [territoryMonthPlan, setTerritoryMonthPlan] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      DepotId: selectedDepot,
      TerritoryId: 0, //selectedZone
    };
    const fetchTerritoryMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "TerritoryMonthPlan",
          payload
        );
        console.log("=====TerritoryMonthPlan====", response);

        if (response?.status === 200) {
          setTerritoryMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchTerritoryMonthPlan();
  }, [selectedDepot]);

  // const columns = [

  //   {
  //     name: "Depot",
  //     selector: (row) => row.depot_name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Territory",
  //     selector: (row) => row.territory_name,
  //     sortable: true,
  //   },
  //   {
  //     name: "LLY",
  //     selector: (row) => row.LLY_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "LY",
  //     selector: (row) => (
  //       <>
  //         {row.LY_Value}
  //         <br />
  //         <span className="w3-text-gray ">
  //           ({((row.LY_Value / row.LLY_Value) * 100).toFixed(2)}%){" "}
  //         </span>{" "}
  //       </>
  //     ),
  //     sortable: true,
  //   },
  //   {
  //     name: "CY Plan",
  //     selector: (row) => (
  //       <>
  //         {row.CY_Value}
  //         <br />
  //         <span className="w3-text-gray ">
  //           ({((row.CY_Value / row.LY_Value) * 100).toFixed(2)}%)
  //         </span>{" "}
  //       </>
  //     ),
  //     sortable: true,
  //   },
  //   {
  //     name: "YTD",
  //     selector: (row) => (
  //       <>
  //         {row.YTD_Value}
  //         <br />
  //         <span className="w3-text-gray ">
  //           ({(((row.YTD_Value) / (row.CY_Value)) * 100).toFixed(2)}%)
  //         </span>
  //       </>
  //     ),
  //     sortable: true,
  //   },
  //   {
  //     name: "Apr",
  //     selector: (row) => row.Apr_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "May",
  //     selector: (row) => row.May_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Jun",
  //     selector: (row) => row.Jun_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Jul",
  //     selector: (row) => row.Jul_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Aug",
  //     selector: (row) => row.Aug_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Sep",
  //     selector: (row) => row.Sep_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Oct",
  //     selector: (row) => row.Oct_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Nov",
  //     selector: (row) => row.Nov_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Dec",
  //     selector: (row) => row.Dec_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Jan",
  //     selector: (row) => row.Jan_Month_Value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Feb",
  //     selector: (row) => row.Feb_Month_Value,
  //     sortable: true,
  //   },

  //   {
  //     name: "Mar",
  //     selector: (row) => row.Mar_Month_Value,
  //     sortable: true,
  //   },

  // ];

  const columns = [
    {
      fixed: "left",
      columns: [
        {
          Header: "Depot",
          accessor: "depot_name",
          sortable: true,
        },
        {
          Header: "Territory",
          accessor: "territory_name",
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
        },
        {
          Header: "CY Plan",
          accessor: "CY_Value",
          sortable: true,
        },
        {
          Header: "YTD",
          accessor: "YTD_Value",
          sortable: true,
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

  const filteredItems = territoryMonthPlan.filter(
    (item) =>
      item.territory_name &&
      item.territory_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const CustomSubHeaderComponent = ({ children, align }) => {
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: align === "left" ? "flex-start" : "center",
      marginBottom: "10px",
    };

    return (
      <div className=" w3-left " style={containerStyle}>
        {children}
      </div>
    );
  };

  const rowCount = territoryMonthPlan.length;

  const additionalComponent = (
    <span className="w3-left w3-margin-right ">
      {" "}
      Territory(s) ({rowCount}){" "}
    </span>
  );

  const subHeaderComponent = (
    <input
      type="text"
      placeholder="Filter By Territory  Name"
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

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // <DataTable
        //   columns={columns}
        //   data={filteredItems}
        //   pagination
        //   className="datatable"
        //   fixedHeader={true}
        //   fixedHeaderScrollHeight="400px" subHeader
        //   subHeaderComponent={
        //     <CustomSubHeaderComponent align="left">
        //       {additionalComponent}
        //       {subHeaderComponent}
        //     </CustomSubHeaderComponent>
        //   }
        // />
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
      )}
    </>
  );
};

export default TerritoryMonthWiseSalesReport;
