import { useEffect, useState } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import ExportExcel from "../ExportExcel";
import { getCurrentMonth } from "../../utils/utils";

const itemsPerPage = 10;

const LogSummary = ({ actionType = "HOD", selectedId }) => {
    console.log("LogSummary=LogSummary");
    const dispatch = useDispatch();

    const [logHistory, setLogHistory] = useState([]);

    const [filterText, setFilterText] = useState("");
    const [sortField, setSortField] = useState(''); // To store the current sorting field (empty for no sorting)
    const [sortDirection, setSortDirection] = useState(''); // To store the current sorting direction ('asc' or 'desc')

    const [currentPage, setCurrentPage] = useState(0);

    const entityId = actionType == "HOD" ? 0 : selectedId;
    const fetchLogHistory = async () => {
        try {
            const payload = {
                Token: localStorage.getItem("access_token"),
                Type: actionType,
                FYId: 5,
                Month: getCurrentMonth(),
                EntityId: entityId,
            };
            const response = await axiosInstance.post(
                "api/Master/GetIsLockByEntityData",
                payload
            );

            if (response?.status === 200) {
                setLogHistory(response?.data?.Data);
            }
        } catch (error) {
            // Handle errors
            dispatch({ type: SHOW_TOAST, payload: error.message });
        }
    };

    useEffect(() => {
        if(actionType == "HOD" || selectedId !=0 ){
            fetchLogHistory();
        }
    }, [selectedId]);

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
    let sortedData = [...logHistory];
    if (sortField === 'Zone') {
        sortedData.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.zone_name?.localeCompare(b.zone_name);
            } else {
                return b.zone_name?.localeCompare(a.zone_name);
            }
        });
    } else if (sortField === 'Depot') {
        sortedData.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.depot_name?.localeCompare(b.depot_name);
            } else {
                return b.depot_name?.localeCompare(a.depot_name);
            }
        });
    }

    const filterData = (data) => {
        const filterTextLowerCase = filterText.toLowerCase();
        return data.filter((item) => (
            (item?.zone_name && item?.zone_name?.toLowerCase().includes(filterTextLowerCase)) ||
            (item?.depot_name && item?.depot_name?.toLowerCase().includes(filterTextLowerCase))
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
        const arrObj = logHistory?.map((element, index) => ({
            "S.No": index + 1,
            "Zone": element.zone_name,
            "Depo": element.depot_name,
            "Territory": element.territory_name,
            "Area Manager Code": element.employee_name,
            "Area Manager Name": element.employee_code,
            "Lock": element.islock
        }));
        console.log("-arrObj", arrObj)
        ExportExcel('Log Summary', arrObj)
    };
    return (
        <>
            <div className="w-100">
                <div className="tbl-container">
                    {logHistory?.length ? (<div><button className="w3-btn w3-gray" onClick={handleExportClick}> Export</button></div>) : null}

                    <div className="row w-100 mt-3">
                        <div className="one-half" >
                            <input className="w3-margin-bottom w3-input w3-border "
                                type="text"
                                placeholder="Filter By Zone, depot name "
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
                                <th style={{ width: "16%" }} rowSpan={2} onClick={() => handleSort('Zone')}>Zone  {sortField === 'Zone' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                                <th style={{ width: "10%" }} rowSpan={2} onClick={() => handleSort('Depot')}>Depot  {sortField === 'Depot' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                                <th >Territoty</th>
                                <th >Area Manager Code</th>
                                <th >Area Manager Name</th>
                                <th >Lock/Unlock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems?.sort((a, b) => a.month_value.toString()?.localeCompare(b.month_value.toString())).map((item, index) => (
                                <tr className="h6 w3-small" key={item?.dealerid}>
                                    <td className="">
                                        {++index}
                                    </td>
                                    <td className="" colSpan={1} style={{ width: "15%" }}>
                                        {item?.zone_name}
                                    </td>
                                    <td className="" colSpan={1} style={{ width: "15%" }}>
                                        {item?.depot_name}
                                    </td>
                                    <td className="">
                                        {item?.territory_name}
                                    </td>
                                    <td className="" colSpan={1}>
                                        {item?.employee_name}
                                    </td>
                                    <td className="">
                                        {item?.employee_code}
                                    </td>
                                    <td className="">
                                        {(item?.islock) ? <><i className="fa fa-lock  w3-text-red"></i></> : <><i className="fa fa-lock  w3-text-green"></i></>}
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

export default LogSummary;

// const LogSummary = ({ data }) => {
//     return (
//         <>
//             <div>Log Summary</div>
//         </>
//     )
// }
// export default LogSummary;

