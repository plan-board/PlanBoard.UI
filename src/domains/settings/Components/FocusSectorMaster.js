import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import LoadingPlaceholder from "../../../components/LoadingPlaceholder";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";
import DataTable from "react-data-table-component";
import ExportExcel from "../../ExportExcel";
import ZoneDropDown from "../../components/ZoneDropDown";
import { Row, Col } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  CommandColumn,
  Freeze,
  Page,
  Filter,
  AggregateColumnDirective,
  Toolbar,
  ExcelExport,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../../common/Loader";

const FocusSectorMaster = () => {
  const dispatch = useDispatch();
  let focusSectorMasterInstance = useRef();
  const [isLoading, setLoading] = useState(false);
  const [monthId, setMonth] = useState(0);
  const [fyId, setFYear] = useState(0);
  const [mSectorId, setMSector] = useState(0);

  const [fyList, setFYlist] = useState([]);
  const [mSectorList, setMSectorList] = useState([]);
  const [sectorMaster, setSectorMaster] = useState([]);
  const [selectedZoneDrop, setSelectedZoneDrop] = useState(0);

  const payload = {
    Token: localStorage.getItem("access_token"),
    FPParam: [
      {
        // FYId: 0,
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
          ZoneId: parseInt(selectedZoneDrop),
          ProductMarketSectorId: parseInt(mSectorId),
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
        setMSector(0);
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
      name: "Zone",
      selector: (row) => row.ZoneName,
      sortable: true,
    },
    {
      name: "Market Sector",
      selector: (row) => row.MarketSectorName,
      sortable: true,
    },
  ];
  const [filterText, setFilterText] = useState("");
  const filteredItems = sectorMaster.filter(
    (item) =>
      item.MarketSectorName &&
      item.MarketSectorName.toLowerCase().includes(filterText.toLowerCase())
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

  const additionalComponent = (
    <span className="w3-left w3-margin-right ">
      {" "}
      Monthly Focus Sectors(s) ({filteredItems?.length}){" "}
    </span>
  );

  const handleExportClick = () => {
    const arrObj = sectorMaster.map((element, index) => ({
      "S.No": index + 1,
      FY: element.FYName,
      Month: element.Month,
      Zone: element.ZoneName,
      "Market Sector Name": element.MarketSectorName,
    }));
    // console.log("-arrObj", arrObj);
    ExportExcel("Monthly-Focus-Product", arrObj);
  };

  const handleSelectionChangeDrop = (newValue) => {
    setSelectedZoneDrop(newValue);
  };
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      focusSectorMasterInstance.current &&
      args.item.id === "focusSectorMasterGrid_id_excelexport"
    ) {
      const arrObj = sectorMaster.map((element, index) => ({
        "S.No": index + 1,
        FY: element.FYName,
        Month: element.Month,
        Zone: element.ZoneName,
        "Market Sector Name": element.MarketSectorName,
      }));

      ExportExcel("Monthly-Focus-Product", arrObj);
    }
  };

  return (
    <>
      <h5>Manage Monthly Focus Sectors </h5>
      <hr />
      <form>
        <table className="table-bordered table-striped">
          <thead style={{ color: "#000", background: "#e0e0e0" }}>
            <tr>
              <th>
                <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                  FY
                </label>
              </th>
              <th>
                <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                  Month
                </label>
              </th>
              <th>
                <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                  Zone
                </label>
              </th>
              <th>
                <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                  Market Sector
                </label>
              </th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  className="form-control"
                  value={fyId}
                  onChange={handleYearChange}
                >
                  <option value={0}>Select</option>
                  {fyDropdown()}
                </select>
              </td>
              <td>
                <select
                  className="form-control"
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
              <td>
                <ZoneDropDown
                  selectedZone={selectedZoneDrop}
                  onValueChange={handleSelectionChangeDrop}
                  asDropDown={true}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={mSectorId}
                  onChange={handleSectorChange}
                >
                  <option value={0}>Select Market Sector</option>
                  {marketSecDropdown()}
                </select>
              </td>
              <td style={{ width: "30px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={
                    mSectorId && monthId && fyId && selectedZoneDrop
                      ? false
                      : true
                  }
                  onClick={() => handleSetFocusProduct()}
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
            id="focusSectorMasterGrid_id"
            key="focusSectorMasterGrid_id"
            allowTextWrap={true}
            allowResizing={false}
            dataSource={filteredItems}
            toolbar={toolbar}
            toolbarClick={toolbarClick}
            enableStickyHeader={true}
            height={"400px"}
            ref={focusSectorMasterInstance}
            allowPaging={true}
            allowSelection={true}
            gridLines="Both"
            rowHeight={30}
            pageSettings={{ pageSize: 15, pageCount: 15 }}
            allowFiltering={true}
            filterSettings={{ type: "Excel" }}
            allowExcelExport={true}
            allowSorting={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="tableid"
                headerText={"S.No"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="FYName"
                headerText={"FY"}
                width="130"
                visible={true}
                textAlign="left"
                allowEditing={false}
                allowFiltering={false}
              />
              <ColumnDirective
                field="Month"
                headerText={"Month"}
                width="90"
                visible={true}
                textAlign="left"
                allowEditing={false}
              />
              <ColumnDirective
                field="ZoneName"
                headerText={"Zone"}
                width="130"
                format={"N2"}
                visible={true}
                textAlign="center"
                allowEditing={false}
              />
              <ColumnDirective
                field="MarketSectorName"
                headerText={"Market Sector"}
                width="130"
                visible={true}
                textAlign="center"
                allowEditing={false}
              />
            </ColumnsDirective>

            <Inject
              services={[
                CommandColumn,
                Page,
                Filter,
                Aggregate,
                Toolbar,
                ExcelExport,
                Sort,
              ]}
            />
          </GridComponent>
        </Col>
      </Row>

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
