import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";


import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";

const itemsPerPage = 10; // Number of items to display per page

const DealerMonthSale = ({ selectedTerritory }) => {

    const dispatch = useDispatch(); 
    const [isLoading, setLoading] = useState(true);
    const [dealerMonthPlan, setDealerMonthPlan] = useState([])

    const [filterText, setFilterText] = useState("");

    const getZoneMonthPlan = async () => {
        try {
            const payload = {
                Token: localStorage.getItem("access_token"),
                ZoneId: 0,
                DepotId: 0,
                TerritoryId: selectedTerritory,
            };
            const response = await axiosInstance.post("CustomerMonthPlan", payload);

            if (response?.status === 200) {
                console.log("=====CustomerMonthPlan====", response.data.Data);
                setDealerMonthPlan(response.data.Data != null ? response.data.Data : [])
            }
            setLoading(false)
        } catch (error) {
            // Handle errors
            dispatch({ type: SHOW_TOAST, payload: error.message });
        }
    };

    useEffect(() => {
        if (selectedTerritory != 0) {
            setLoading(true)
            getZoneMonthPlan();
        }
    }, [selectedTerritory])

    const filteredItems = dealerMonthPlan.filter(
        (item) =>
            item.dealer_name &&
            item.dealer_name.toLowerCase().includes(filterText.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const dataToShow = filteredItems.slice(offset, offset + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalLYValue = dataToShow.reduce(
        (acc, item) => acc + (item.LY_Value || 0),
        0
    );
    const totalLLYValue = dataToShow.reduce(
        (acc, item) => acc + (item.LLY_Value || 0),
        0
    );
    const totalCYValue = dataToShow.reduce(
        (acc, item) => acc + (item.CY_Value || 0),
        0
    );
    const totalYTDValue = dataToShow.reduce(
        (acc, item) => acc + (item.YTD_Value || 0),
        0
    );
    const totalAprValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Apr_Month_Value_v1 || 0),
        0
    );
    const totalAprValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Apr_Month_Sale || 0),
        0
    );
    const totalMayValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.May_Month_Value_v1 || 0),
        0
    );
    const totalMayValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.May_Month_Sale || 0),
        0
    );
    const totalJunValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jun_Month_Value_v1 || 0),
        0
    );
    const totalJunValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jun_Month_Sale || 0),
        0
    );
    const totalJulValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jul_Month_Value_v1 || 0),
        0
    );
    const totalJulValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jul_Month_Sale || 0),
        0
    );
    const totalAugValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Aug_Month_Value_v1 || 0),
        0
    );
    const totalAugValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Aug_Month_Sale || 0),
        0
    );
    const totalSepValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Sep_Month_Value_v1 || 0),
        0
    );
    const totalSepValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Sep_Month_Sale || 0),
        0
    );
    const totalOctValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Oct_Month_Value_v1 || 0),
        0
    );
    const totalOctValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Oct_Month_Sale || 0),
        0
    );
    const totalNovValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Nov_Month_Value_v1 || 0),
        0
    );
    const totalNovValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Nov_Month_Sale || 0),
        0
    );
    const totalDecValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Dec_Month_Value_v1 || 0),
        0
    );
    const totalDecValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Dec_Month_Sale || 0),
        0
    );
    const totalJanValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jan_Month_Value_v1 || 0),
        0
    );
    const totalJanValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Jan_Month_Sale || 0),
        0
    );
    const totalFebValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Feb_Month_Value_v1 || 0),
        0
    );
    const totalFebValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Feb_Month_Sale || 0),
        0
    );
    const totalMarValue = dataToShow?.reduce(
        (acc, item) => acc + (item?.Mar_Month_Value_v1 || 0),
        0
    );
    const totalMarValue_v1 = dataToShow?.reduce(
        (acc, item) => acc + (item?.Mar_Month_Sale || 0),
        0
    );

    const tableRows = dataToShow.map((item, index) => (
        <tr key={index}>
            <td>{++index}</td>
            <td>{item?.territory_name}</td>
            <td>{item?.dealer_name}</td>
            <td>{item?.LY_Value}</td>
            <td>{item?.LLY_Value}</td>
            <td>{item?.CY_Value} <hr className="hr0" />{item?.YTD_Value}</td>
            <td>
                {item?.Apr_Month_Value_v1}
                <hr className="hr0" />
                {item?.Apr_Month_Sale}
            </td>
            <td>
                {item?.May_Month_Value_v1}
                <hr className="hr0" />
                {item?.May_Month_Sale}
            </td>
            <td>
                {item?.Jun_Month_Value_v1}
                <hr className="hr0" />
                {item?.Jun_Month_Sale}
            </td>
            <td>
                {item?.Jul_Month_Value_v1}
                <hr className="hr0" />
                {item?.Jul_Month_Sale}
            </td>
            <td>
                {item?.Aug_Month_Value_v1}
                <hr className="hr0" />
                {item?.Aug_Month_Sale}
            </td>
            <td>
                {item?.Sep_Month_Value_v1}
                <hr className="hr0" />
                {item?.Sep_Month_Sale}
            </td>
            <td>
                {item?.Oct_Month_Value_v1}
                <hr className="hr0" />
                {item?.Oct_Month_Sale}
            </td>
            <td>
                {item?.Nov_Month_Value_v1}
                <hr className="hr0" />
                {item?.Nov_Month_Sale}
            </td>
            <td>
                {item?.Dec_Month_Value_v1}
                <hr className="hr0" />
                {item?.Dec_Month_Sale}
            </td>
            <td>
                {item?.Jan_Month_Value_v1}
                <hr className="hr0" />
                {item?.Jan_Month_Sale}
            </td>
            <td>
                {item?.Feb_Month_Value_v1}
                <hr className="hr0" />
                {item?.Feb_Month_Sale}
            </td>
            <td>
                {item?.Mar_Month_Value_v1}
                <hr className="hr0" />
                {item?.Mar_Month_Sale}
            </td>
        </tr>
    ));

    // Add a new row for total CY_Value and YTD_Value
    const totalRow = (
        <tr key="total" className="colrdrow">
            <td colSpan={3}>
                Total
            </td>
            <td>
                {totalLLYValue.toFixed(2)}
            </td>
            <td>
                {totalLYValue.toFixed(2)}
            </td>
            <td>
                {totalCYValue.toFixed(2)}
                <hr className="hr0" />
                {totalYTDValue.toFixed(2)}
            </td>
            <td>
                {totalAprValue?.toFixed(2)}
                <hr className="hr0" />
                {totalAprValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalMayValue?.toFixed(2)}
                <hr className="hr0" />
                {totalMayValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalJunValue?.toFixed(2)}
                <hr className="hr0" />
                {totalJunValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalJulValue?.toFixed(2)}
                <hr className="hr0" />
                {totalJulValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalAugValue?.toFixed(2)}
                <hr className="hr0" />
                {totalAugValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalSepValue?.toFixed(2)}
                <hr className="hr0" />
                {totalSepValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalOctValue?.toFixed(2)}
                <hr className="hr0" />
                {totalOctValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalNovValue?.toFixed(2)}
                <hr className="hr0" />
                {totalNovValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalDecValue?.toFixed(2)}
                <hr className="hr0" />
                {totalDecValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalJanValue?.toFixed(2)}
                <hr className="hr0" />
                {totalJanValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalFebValue?.toFixed(2)}
                <hr className="hr0" />
                {totalFebValue_v1?.toFixed(2)}
            </td>
            <td>
                {totalMarValue?.toFixed(2)}
                <hr className="hr0" />
                {totalMarValue_v1?.toFixed(2)}
            </td>
        </tr>
    );

    const tableWithTotalRow = [...tableRows, totalRow];

    return (
        <div id="mom-north" className="w3-row w3-margin-top ">
            <div id="mom-bar-north" >
                <div className="form-group filterInput">
                    <input className="w3-margin-bottom w3-input w3-border "
                        type="text"
                        placeholder="Filter By Dealer Name"
                        aria-label="Search Input"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
                <table className="w3-table w3-stripped table-bordered">
                    <tr className="colrdrow">
                        <td >
                            S.No
                        </td>
                        <td >
                        Territory
                        </td>
                        <td >
                            Dealer Name
                        </td>
                        <td >
                            LLY
                        </td>
                        <td >
                            LY
                        </td>
                        <td >
                            CY Plan / YTD
                        </td>
                        <td className="w3-gray"> Apr </td>
                        <td className="w3-gray"> May </td>
                        <td className="w3-gray"> Jun </td>
                        <td className="w3-gray"> Jul </td>
                        <td className="w3-gray"> Aug </td>
                        <td className="w3-gray"> Sep </td>
                        <td className="w3-gray"> Oct </td>
                        <td className="w3-gray"> Nov </td>
                        <td className="w3-gray"> Dec </td>
                        <td className="w3-gray"> Jan </td>
                        <td className="w3-gray"> Feb </td>
                        <td className="w3-gray"> Mar </td>
                    </tr>
                    {isLoading ? (
                        <tr>
                            <td colSpan="18">
                                <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {dataToShow?.length === 0 ? (
                                <tr>
                                    <td colSpan="18">No data found</td>
                                </tr>
                            ) : (
                                tableWithTotalRow
                            )}
                        </>
                    )}
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
    );
};

export default DealerMonthSale;