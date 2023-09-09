import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingPlaceholder from "../../../components/LoadingPlaceholder";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";

const FocusSectorMaster = () => {
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [monthId, setMonth] = useState(0);
    const [fyId, setFYear] = useState(0);
    const [mSectorId, setMSector] = useState(0);

    const [fyList, setFYlist] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const [mSectorList, setMSectorList] = useState([]);
    const [sectorMaster, setSectorMaster] = useState([])

    // fetch Focus Sector
    useEffect(() => {
        const payload =
        {
            Token: localStorage.getItem("access_token"),
            FPParam: [
                {
                    FYId: fyId,
                    Month: monthId,
                    MarketSectorId: mSectorId
                }
            ]
        }

        const fetchFocusSector = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.post(
                    "GetFocusProduct",
                    payload
                );
                console.log("=====GetFocusProduct====", response);
                if (response?.status === 200) {
                    setSectorMaster(
                        response.data.Data != null ? response.data.Data : []
                    );
                }
                setLoading(false);
            } catch (error) {
                // Handle errors
                dispatch({ type: SHOW_TOAST, payload: error.message });
            }
        };

        fetchFocusSector();
    }, [monthId, fyId, mSectorId]);

    useEffect(() => {
        const payload = {
            Token: localStorage.getItem("access_token"),
            FPDealerWiseParam: [
                {
                    FYId: 0
                }
            ]
        };

        const fetchFY = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.post(
                    "api/Master/GetFYList",
                    payload
                );
                console.log("=====api/Master/GetFYList====", response);
                if (response?.status === 200) {
                    setFYlist(
                        response.data.Data != null ? response.data.Data : []
                    );
                }
                setLoading(false);
            } catch (error) {
                // Handle errors
                dispatch({ type: SHOW_TOAST, payload: error.message });
            }
        };
        const payloadMs = {
            Token: localStorage.getItem("access_token"),
            marketsector_id: 0
        };
        const fetchMSList = async () => {
            try {
                const response = await axiosInstance.post(
                    "api/Master/GetMarketSectorList",
                    payloadMs
                );
                console.log("=====api/Master/GetMarketSectorList====", response);
                if (response?.status === 200) {
                    setMSectorList(
                        response.data.Data != null ? response.data.Data : []
                    );
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
            <option key={item?.fy_id} value={item?.fy_id}>{item?.fy_name}</option>
        ))
    }

    const marketSecDropdown = () => {
        return mSectorList.map((item, index) => (
            <option key={item?.marketsectorid} value={item?.marketsectorid}>{item?.marketsectorname}</option>
        ))
    }

    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setFYear(parseInt(event.target.value));
    };

    const handleSectorChange = (event) => {
        setMSector(parseInt(event.target.value));
    };

    return (
        <>
            <p className="w3-small h6 " >Manage Monthly Focus Sectors </p>
            <hr />
            <form className=" ">
                <table className=" w3-table table-bordered  h6 w3-small w3-white  text-left">
                    <tr className=" w3-light-gray  h6">
                        <td className=" ">
                            <label htmlFor="selectionBox">FY</label>
                            <select className="w3-select" value={fyId}
                                onChange={handleYearChange}
                            ><option value={0}>Select</option>
                                {fyDropdown()}
                            </select>
                        </td>
                        <td className=" "> <label htmlFor="selectionBox">Month</label>
                            <select className="w3-select" value={monthId}
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
                        <td className=" "> <label htmlFor="selectionBox">Market Sector</label>
                            <select className="w3-select" value={mSectorId}
                                onChange={handleSectorChange}
                            >   <option value={0}>All</option>
                                {marketSecDropdown()}
                            </select>
                        </td>
                        <td className=" " style={{ width: "30px" }} >  <br />
                            <button type="submit" className="w3-button w3-indigo"><i className="fa fa-plus" ></i> </button>
                        </td>
                    </tr>

                </table>
            </form>
            <div className="w3-row w3-padding-16"> </div>

            <table className=" w3-table table-bordered  h6 w3-small w3-white  text-left">
                <tr className=" w3-light-gray  h6">
                    <td className=" " > FY </td>
                    <td className=" "> Month </td>
                    <td className=" "> Focus Sector </td>
                    <td className=" " colspan="2"> Action </td>
                </tr>

                {isLoading ? (
                    <tr>
                        <td colSpan="13">
                            <LoadingPlaceholder numberOfRows={2}  ></LoadingPlaceholder>
                        </td>
                    </tr>) : (
                    <>
                        {sectorMaster.length == 0 ? (
                            <tr>
                                <td colSpan="13" className="w3-large w3-text-gray w3-padding h4"> No Data Found</td>
                            </tr>
                        ) : (
                            sectorMaster.map((item, index) => (
                                <tr key={index} >
                                    <td >{item?.FYName}</td>
                                    <td className="">{item?.Month}</td>
                                    <td className="">{item?.MarketSectorName}</td>
                                    <td className="" style={{ width: "30px" }}>
                                        <i className="w3-button w3-teal fa fa-pencil"></i> {" "}
                                    </td>

                                    <td className="" style={{ width: "30px" }}>
                                        <i className="w3-button w3-red fa fa-remove"></i> {" "}</td>
                                </tr>

                            ))
                        )}
                    </>
                )}
            </table>
        </>
    )
}

export default FocusSectorMaster;