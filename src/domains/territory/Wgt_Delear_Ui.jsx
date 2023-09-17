import { Fragment, useEffect, useState } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import CustomPopup from "../CustomPopup";
import ExportExcel from "../ExportExcel";

const itemsPerPage = 10;
const monthArr = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const date = new Date();
const cMName = date.toLocaleString('default', { month: 'long' });
const mStartName = cMName.substring(0,3);

const Wgt_Delear_Ui = ({ data }) => {
  console.log("-cMName",cMName)
  const dispatch = useDispatch();
  const [getinputs, setGetinputs] = useState({});
  const [dealerlist, setDealerlist] = useState([]);
  const currentDate = new Date("2023-08-30");
  // const currentDate = new Date();

  const currentMonthCount =
    currentDate.getMonth() < 3
      ? currentDate.getMonth() + 13
      : currentDate.getMonth() + 1;
  const [currentMonth, setCurrentMonth] = useState(currentMonthCount);
  const [visibility, setVisibility] = useState(false);


  const [selectedRow, setSelectedRow] = useState(null);
  const [sumValue, setSumValue] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [monthName, setMonthName] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(''); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(''); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);

  function getInput() {
    console.log("🚀 ~ file: Wgt_Delear_Ui.jsx:20 ~ getinputs:", getinputs);
  }

  function onchangeInputs(e, id) {
    setGetinputs({
      ...getinputs,
      [id]: { ...getinputs[id], [e.target.name]: e.target.value },
    });
  }

  const getMonthTarget = (item) => {
    console.log("--getMonthTarget item", item);
    setVisibility(true);
    setSumValue(0);
    setModalData(item);
    fetchMonthDataById(item);
  }

  const fetchMonthDataById = async (dataObj) => {
    const cMonth = new Date().getMonth() + 1;
    const date = new Date();
    setMonthName(date.toLocaleString('default', { month: 'long' }));

    const payload = {
      Token: localStorage.getItem("access_token"),
      FPDealerWiseParam: [
        {
          // FYId: dataObj.FYId,
          Month: cMonth,
          DealerId: dataObj?.dealerid,
        }
      ]
    };
    try {
      const response = await axiosInstance.post("GetFocusProductDealerWise", payload);

      if (response?.status === 200) {
        // const filterByDealer = response?.data?.Data.filter((item) => item.DealerId == dataObj.dealerid)
        setSelectedRow(response?.data?.Data); // add filterByDealer when data
        console.log("=====GetFocusProductDealerWise==== 65", response?.data?.Data);

        // const upValue = selectedRow.reduce((acc, item) => acc + (parseFloat(item.Value) || 0), 0).toFixed(2);
        // console.log("-upValue",upValue)
        // const upValueAsNumber = parseFloat(upValue); 
        // console.log("-upValueAsNumber",upValueAsNumber)
        // console.log("-Aug_Month_Value_v1",modalData?.Aug_Month_Value_v1)

        // setSumValue(parseFloat(upValueAsNumber + modalData?.Aug_Month_Value_v1).toFixed(2))
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const fetchDealerMaster = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      TerritoryId: data,
      DealerId: 0,
    };
    try {
      const response = await axiosInstance.post("CustomerMonthPlan", payload);

      if (response?.status === 200) {
        setDealerlist(response?.data?.Data);
        console.log("=====api/Master/ZoneData==== 65", response);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    fetchDealerMaster();
  }, [data]);

  const popupCloseHandler = (e) => {
    setVisibility(e);
    // Close the modal by resetting the selected row and modal data
    setSelectedRow(null);
    setModalData(null);
    setSumValue(0);
  };



  // Handle input changes for a specific row
  const handleInputChange = (tableid, name, value) => {
    // Create a copy of the form data with the updated value
    const updatedFormData = selectedRow.map((row) =>
      row.tableid === tableid ? { ...row, [name]: value } : row
    );
    // Update the state with the new form data
    setSelectedRow(updatedFormData);


    const upValue = updatedFormData.reduce((acc, item) => acc + (parseFloat(item.Value) || 0), 0).toFixed(2);
    const upValueAsNumber = parseFloat(upValue);

    setSumValue(parseFloat(upValueAsNumber + modalData?.Aug_Month_Value_v1).toFixed(2))

  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send formData to your server or perform other actions
    console.log('Form Data:', selectedRow);

    try {
      const payArr = selectedRow.map((item) => ({
        "FYId": parseInt(item.FYId),
        "Month": parseInt(item.Month),
        "FocusedProductId": item.ProductId,
        "DealerId": modalData.dealerid,
        "Value": item.Value,
        "Volume": item.Volume
      }));

      const payload = {
        Token: localStorage.getItem("access_token"),
        FocusedProductDealerWiseParam: payArr
      };

      const response = await axiosInstance.post("SetFocusedProductDealerWise", payload);

      if (response?.status === 200) {
        console.log("=====aSetFocusedProductDealerWise==== 65", response);
        popupCloseHandler(false);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // If the same column is clicked again, toggle the sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different column is clicked, set the new sort field and direction
      setSortField(field);
      setSortDirection('asc'); // Default to ascending order
    }
  };
  // Sort the data based on the current sorting field and direction
  let sortedData = [...dealerlist];
  if (sortField === 'DelearName') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.dealer_name?.localeCompare(b.dealer_name);
      } else {
        return b.dealer_name?.localeCompare(a.dealer_name);
      }
    });
  } else if (sortField === 'DelearCode') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.dealer_code?.localeCompare(b.dealer_code);
      } else {
        return b.dealer_code?.localeCompare(a.dealer_code);
      }
    });
  } else if (sortField === 'Category') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.dealer_category?.localeCompare(b.dealer_category);
      } else {
        return b.dealer_category?.localeCompare(a.dealer_category);
      }
    });
  }
  else if (sortField === 'LY') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return (a.LY_Value || 0) - (b.LY_Value || 0);
      } else {
        return (b.LY_Value || 0) - (a.LY_Value || 0);
      }
    });
  } else if (sortField === 'YTD') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return (a.YTD_Value || 0) - (b.YTD_Value || 0);
      } else {
        return (b.YTD_Value || 0) - (a.YTD_Value || 0);
      }
    });
  }

  const filterData = (data) => {
    const filterTextLowerCase = filterText.toLowerCase();
    return data.filter((item) => (
      (item?.dealer_name && item?.dealer_name?.toLowerCase().includes(filterTextLowerCase)) ||
      (item?.dealer_code && item?.dealer_code?.toLowerCase().includes(filterTextLowerCase)) ||
      (item?.dealer_category && item?.dealer_category?.toLowerCase().includes(filterTextLowerCase)) ||
      (!isNaN(item.LY_Value) && item?.LY_Value.toString().toLowerCase().includes(filterTextLowerCase)) ||
      (!isNaN(item.YTD_Value) && item?.YTD_Value.toString().toLowerCase().includes(filterTextLowerCase))
    ));
  };

  // Paginate the sorted data
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const dataToShow = sortedData.slice(offset, offset + itemsPerPage);

  // Filter the paginated and sorted data
  const filteredItems = filterData(dataToShow);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleExportClick = () => {
    const arrObj = dealerlist.map((element, index) => ({
      "S.No": index + 1,
      "Dealer Name": element.dealer_name,
      "Dealer Code": element.dealer_code,
      "Category": element.dealer_category,
      "LY": element.LY_Value,
      "CY Plan": element.CY_Value,
      "YTD": element.YTD_Value,
      "6 month": 0,
      "Apr": element.Apr_Month_Value_v1,
      "Apr Sale": element.Apr_Month_Sale,
      "May": element.May_Month_Value_v1,
      "May Sale": element.May_Month_Sale,
      "Jun": element.Jun_Month_Value_v1,
      "Jun Sale": element.Jun_Month_Sale,
      "Jul": element.Jul_Month_Value_v1,
      "Jul Sale": element.Jul_Month_Sale,
      "Aug": element.Aug_Month_Value_v1,
      "Aug Sale": element.Aug_Month_Sale,
      "Sep": element.Sep_Month_Value_v1,
      "Sep Sale": element.Sep_Month_Sale,
      "Oct": element.Oct_Month_Value_v1,
      "Oct Sale": element.Oct_Month_Sale,
      "Nov": element.Nov_Month_Value_v1,
      "Nov Sale": element.Nov_Month_Sale,
      "Dec": element.Dec_Month_Value_v1,
      "Dec Sale": element.Dec_Month_Sale,
      "Jan": element.Jan_Month_Value_v1,
      "Jan Sale": element.Feb_Month_Sale,
      "Feb": element.Feb_Month_Value_v1,
      "Feb Sale": element.Feb_Month_Sale,
      "Mar": element.Mar_Month_Value_v1,
      "Mar Sale": element.Mar_Month_Sale
    }));
    console.log("-arrObj", arrObj)
    ExportExcel('ssDealer-Wise-Monthly-Plan-Achievement', arrObj)
  };

   
  const generateTableRows = (item) => {
    const headers = []; 
    for (let i = 0; i < monthArr.length; i++) {
      const monName = monthArr[i];
      if (monName == mStartName) {
        headers.push(
          <Fragment key={`header_${monName}`}>
            <td>{item?.OS}</td>
            <td>{item?.OD}</td>
            <td>
              <input
                type="text"
                className="inp40 text-center"
                defaultValue={item[`${monName}_Month_Value`]}
                name={`${item.id}_sales`}
                onChange={(e) => onchangeInputs(e, item.id)}
              />
              <br />
              <span onClick={() => getMonthTarget(item)}>
                            <i className="fa fa-pencil c-pointer text-primary" title="Click to update" ></i></span>
            </td>
            <td>
              <input
                type="text"
                className="inp40 text-center"
                defaultValue={item[`${monName}_Month_Value_v1`]}
                name={`${item.id}_coll`}
                onChange={(e) => onchangeInputs(e, item.id)}
              />
            </td>
          </Fragment>
        );
        break;
      } else {
        headers.push(
          <Fragment key={`header_${monName}`}>
            <td>
              {item[`${monName}_Month_Value_v1`]}
              <hr className="hr0" />
              {item[`${monName}_Month_Value_v1`]}
            </td>
          </Fragment>
        );
      }
    }
    return headers;
  };

  // Function to render a single row
  const renderTableRow = (item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="">{item.dealer_name}</td>
        <td className="">{item.dealer_code}</td>
        <td className="">{item.dealer_category}</td>
        <td className="">{item.LY_Value}</td>
        <td className="">{item.CY_Value} <hr className="hr0" /> {item.YTD_Value}</td>
        <td className="">0</td>
        {generateTableRows(item)}
      </tr>
    );
  };

  const generateTableHeaders = () => {
    const headers = [];
     
    for (let i = 0; i < monthArr.length; i++) {
      const monName = monthArr[i];
      if (monName === mStartName) {
        headers.push(<Fragment key={`header_${monName}`}>
          <td colSpan={4} key={`header_${monName}`}>{monName}</td></Fragment>
        );
        break;
      } else {
        headers.push(
          <Fragment key={`header_${monName}`}>
            <td rowSpan={2} >{monName}</td>
          </Fragment>
        );
      }
    }
    return headers;
  };

  return (
    <>
      <div className="row w-100 mt-3">
        {dealerlist?.length ? (<div><button onClick={handleExportClick}> <i className="fa fa-pdf">Export</i></button></div>) : null}

        <div className="one-half">
          <input className="w3-margin-bottom w3-input w3-border "
            type="text"
            placeholder="Filter By Dealer Name, code, category, LY and YTD "
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>
      <div className="tbl-container">
        <table className="table-bordered table-striped">
          <thead>
            <tr>
              
              <th className="" rowSpan={2}> S.No </th>
              <th style={{ width: "15%" }} onClick={() => handleSort('DelearName')}>Delear Name  {sortField === 'DelearName' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th style={{ width: "15%" }} onClick={() => handleSort('DelearCode')}>Delear Code  {sortField === 'DelearCode' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('Category')}>Category  {sortField === 'Category' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('LY')}>LY  {sortField === 'LY' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('YTD')}>CY / YTD  {sortField === 'YTD' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th className="" rowSpan={2}> 6 month </th>
              {generateTableHeaders()}
               
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* here colSpan should according to month count */}
              <th className="p-2 bg-blue" colSpan={12}> </th>
              <th className="p-2 bg-green text-dark"> OS </th>
              <th className="p-2 bg-green text-dark"> OD </th>
              <th className="p-2 bg-green text-dark"> Sales </th>
              <th className="p-2 bg-green text-dark"> Collection </th>
              {/* <th className="p-2 bg-blue" colSpan={2}>  </th> */}
            </tr>
            {/* Render tale rows */}
            {filteredItems?.map((item, index) => {
              return renderTableRow(item, index);
            })}
             
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`page-button ${currentPage === index ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title={modalData?.dealer_name + '(' + modalData?.dealer_code + ') - Month : ' + monthName}
      >
        <span className="h6 w3-small" >(Dealer Month Sales Plan + Focus Sector Breakup )</span>
        <hr />
        <form className="w3-container" onSubmit={handleSubmit}>
          <table className="w3-table table-bordered w3-small ">
            <tr className="w3-gray">
              <td colspan="30"> A :  Sales Plan Produced by Dealer Level Rules    </td>
            </tr>
            <tr className="">
              <td style={{ width: "90%" }}>
                Rule 1 : Active Dealer <br />
                Rule 2 : Category based % impact  <br />
              </td>
              <td style={{ width: "10%" }}><input type="text" value={modalData?.Aug_Month_Value_v1} className="inp40 text-center" readOnly={true} />
              </td>
            </tr>

          </table>

          <table className="w3-table table-bordered w3-small ">
            <tr className="w3-gray">
              <td colspan="30"> B ( Focus Sector List for Month of Aug )  * Add values / volume  </td>
            </tr>
            <tr className="w3-yellow">
              <th style={{ width: "2%" }}>#</th>
              <th style={{ width: "10%" }}>Focus Product Sector </th>
              <th style={{ width: "10%" }}>Product Name </th>
              <th style={{ width: "5%" }}>LLY</th>
              <th style={{ width: "5%" }}>LY</th>
              <th style={{ width: "5%" }}>YTD</th>
              <th style={{ width: "5%" }}> 6 Mo. Avg </th>
              <th style={{ width: "5%" }}>LY (Aug) Vol.</th>
              <th style={{ width: "5%" }}>LY (Aug) Val.</th>
              <th style={{ width: "5%" }}>Volume (Ltrs.) </th>
              <th style={{ width: "5%" }}>Value (Lacs)</th>
            </tr>
            <>
              {selectedRow?.length === 0 ? (
                <tr className="">
                  <td colSpan={10}>No Data found</td>
                </tr>
              ) : (
                selectedRow?.map((item, index) => (
                  <tr className="" key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.MarketSectorName}</td>
                    <td>{item?.ProductName} <br /> ({item?.ProductCode}) </td>
                    <td>{item?.LLY}</td>
                    <td>{item?.LY}</td>
                    <td>{item?.YTD}</td>
                    <td>{item?.Last6MonthAvgSales}</td>
                    <td>{item?.SameMonthLY}</td>
                    <td>{item?.SameMonthLY}</td>
                    <td>

                      <input type="number" pattern="[0-9]*[.]?[0-9]*" value={item?.Volume} className="inp40 text-center" name="Volume" onChange={(e) => handleInputChange(item.tableid, 'Volume', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" pattern="[0-9]*[.]?[0-9]*" value={item?.Value} className="inp40 text-center" name="Value" onChange={(e) => handleInputChange(item.tableid, 'Value', e.target.value)} />
                    </td>
                  </tr>
                ))
              )}
              <tr>
                <td colSpan={9}></td>
                <td><input type="text" value={sumValue} disabled={true} className="inp40 text-center" /></td>
              </tr>
            </>
          </table>
          <table className="w3-table table-bordered w3-small ">
            <tr className="w3-gray">
              <td colspan="30"> Net  Sales Plan ( Aug ) Total Sale  A + B   </td>
            </tr>
            <tr className="">
              <td style={{ width: "80%" }}> ( This total will be updated to Dealers Sales Plan ( v1 ) and the list will will be added in transaction table as dealers breakup )  </td>
              <td style={{ width: "10%" }} align="right" > <button className="w3-button w3-indigo " >  Submit </button></td>
            </tr>
          </table>
        </form>

      </CustomPopup>
    </>
  );
};

export default Wgt_Delear_Ui;
