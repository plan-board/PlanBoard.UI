import { useEffect, useState } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import ExportExcel from "../ExportExcel";

const itemsPerPage = 10;

const Wgt_Delear_Weekly_Ui = ({ data }) => {
  const dispatch = useDispatch();

  const [weekdata, setWeekdata] = useState([]);
  const [getinputs, setGetinputs] = useState({});
  const [reload, setReload] = useState(false);
  // const currentDate = new Date("2023-10-22");
  const currentDate = new Date();

  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(''); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(''); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[currentDate.getMonth()];
  function getInput() {
    console.log("🚀 ~ file: Wgt_Delear_Ui.jsx:20 ~ getinputs:", getinputs);
    setReload(true);
  }

  function onchangeInputs(e, id) {
    setGetinputs({
      ...getinputs,
      [id]: { ...getinputs[id], [e.target.name]: e.target.value },
    });
  }

  const payload = {
    Token: localStorage.getItem("access_token"),
    CustomerId: 0,
    TerritoryId: data,
    Month: "Aug",
  };
  const fetchDepotSalesPlan = async () => {
    try {
      const response = await axiosInstance.post(
        "CustomerMonthWeekPlan",
        payload
      );

      if (response?.status === 200) {
        setWeekdata(response?.data?.Data);
        setReload(false);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
      setReload(false);
    }
  };

  useEffect(() => {
    if (data !== 0) {
      fetchDepotSalesPlan(); // Call the API when component mounts
    }
  }, [data]);

  useEffect(() => {
    if (reload) {
      setReload(false);
      fetchDepotSalesPlan();
    }
  }, [reload]);

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
  let sortedData = [...weekdata];
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
  }

  const filterData = (data) => {
    const filterTextLowerCase = filterText.toLowerCase();
    return data.filter((item) => (
      (item?.dealer_name && item?.dealer_name?.toLowerCase().includes(filterTextLowerCase)) ||
      (item?.dealer_code && item?.dealer_code?.toLowerCase().includes(filterTextLowerCase))
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
    const arrObj = weekdata.map((element, index) => ({
      "S.No": index + 1,
      "Dealer Name": element.dealer_name,
      "Dealer Code": element.dealer_code,
      "Sales": element.month_value, 
      "Week 1": element.week1,
      "Week 2": element.week2,
      "Week 3": element.week3,
      "Week 4": element.week4
    }));
    console.log("-arrObj", arrObj)
    ExportExcel('Dealer-Week-Wise-Monthly-Plan-Achievement', arrObj)
  };
  return (
    <>
      <div className="w-100"> 
        <div className="tbl-container">
        {weekdata?.length ? (<div><button onClick={handleExportClick}> <i className="fa fa-pdf">Export</i></button></div>) : null}

          <div className="row w-100 mt-3">
              <div className="one-half" >
                <input className="w3-margin-bottom w3-input w3-border "
                  type="text"
                  placeholder="Filter By Dealer Name or code "
                  aria-label="Search Input"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
          </div>
          <table className="table-bordered table-striped">
            <thead>
              <tr>
                <th colSpan={1} rowSpan={2} style={{ width: "4%" }}> S. NO </th>
                <th style={{ width: "16%" }} rowSpan={2} onClick={() => handleSort('DelearName')}>Delear Name  {sortField === 'DelearName' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th style={{ width: "10%" }} rowSpan={2} onClick={() => handleSort('DelearCode')}>Delear Code  {sortField === 'DelearCode' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th colSpan={16}> {month} </th>
                {/* <th colspan={12}> Week </th> */}
              </tr>
              <tr>
                <th className="bg-red" colSpan={1}> Sales </th>
                <th className="bg-red">Week-1 </th>
                <th className="bg-red">Week-2 </th>
                <th className="bg-red">Week-3 </th>
                <th className="bg-red">Week-4 </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems?.sort((a, b) => a.month_value.toString()?.localeCompare(b.month_value.toString())).map((item, index) => (
                <tr className="h6 w3-small" key={item?.dealerid}>
                  <td className="">
                    {++index}
                  </td>
                  <td className="" colSpan={1} style={{ width: "15%" }}>
                    {item?.dealer_name}
                  </td>
                  <td className="" colSpan={1} style={{ width: "15%" }}>
                    {item?.dealer_code}
                  </td>
                  <td className="" colSpan={1}>
                    {item?.month_value}
                  </td>
                  <td className="">
                    {item?.week1}
                  </td>
                  <td className="">
                    {item?.week2}
                  </td>
                  <td className="">
                    {item?.week3}
                  </td>
                  <td className="">
                    {item?.week4}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      </div>
    </>
  );
};

export default Wgt_Delear_Weekly_Ui;
