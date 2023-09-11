import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";


import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";

const DealerMonthSale = ({ selectedTerritory }) => {
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [dealerMonthPlan, setDealerMonthPlan] = useState([])

    const columns = [
        {
            name: "Territory",
            selector: (row) => row.territory_name,
            sortable: true,
        },
        {
            name: "Dealer Name",
            selector: (row) => row.dealer_name,
            sortable: true,
        },
        {
            name: "LLY",
            selector: (row) => row.LLY_Value,
            sortable: true,
        },
        {
            name: "LY",
            selector: (row) => (
                <>
                    {row.LY_Value} 
                    <br />
                    <span className="w3-text-gray ">
                        ({((row.LY_Value / row.LLY_Value) * 100).toFixed(2)}%){" "}
                    </span>{" "}
                </>
            ),
            sortable: true,
        },
        {
            name: "CY Plan",
            selector: (row) => (
                <>
                    {row.CY_Value}
                    <br />
                    <span className="w3-text-gray ">
                        ({((row.CY_Value / row.LY_Value) * 100).toFixed(2)}%)
                    </span>{" "}
                </>
            ),
            sortable: true,
        },
        {
            name: "YTD",
            selector: (row) => (
                <>
                    {row.YTD_Value}
                    <br />
                    <span className="w3-text-gray ">
                        ({(((row.YTD_Value) / (row.CY_Value)) * 100).toFixed(2)}%)
                    </span>
                </>
            ),
            sortable: true,
        },
        {
            name: "Apr",
            selector: (row) => row.Apr_Month_Value_v1,
            sortable: true,
        },
        {
            name: "May",
            selector: (row) => row.May_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Jun",
            selector: (row) => row.Jun_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Jul",
            selector: (row) => row.Jul_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Aug",
            selector: (row) => row.Aug_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Sep",
            selector: (row) => row.Sep_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Oct",
            selector: (row) => row.Oct_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Nov",
            selector: (row) => row.Nov_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Dec",
            selector: (row) => row.Dec_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Jan",
            selector: (row) => row.Jan_Month_Value_v1,
            sortable: true,
        },
        {
            name: "Feb",
            selector: (row) => row.Feb_Month_Value_v1,
            sortable: true,
        },

        {
            name: "Mar",
            selector: (row) => row.Mar_Month_Value_v1,
            sortable: true,
        },

    ];

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
        <span className="w3-left w3-margin-right "> Dealer(s)   ({dealerMonthPlan?.length}) </span>
    );

    useEffect(() => {

        const payload = {
            Token: localStorage.getItem("access_token"),
            ZoneId: 0,
            DepotId: 0,
            TerritoryId: selectedTerritory,
        };
        const getZoneMonthPlan = async () => {
            try {

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
        if (selectedTerritory != 0) {
            setLoading(true)
            getZoneMonthPlan();
        }
    }, [selectedTerritory])

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={dealerMonthPlan}
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
            )}
        </>

    )
}

export default DealerMonthSale;