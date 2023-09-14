import { useEffect, useState } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

const DelearActivityPlan = ({ data }) => {
  const dispatch = useDispatch();

  const [weekdata, setWeekdata] = useState([]);
  const [getinputs, setGetinputs] = useState({});
  const [reload, setReload] = useState(false);
  // const currentDate = new Date("2023-10-22");
  const currentDate = new Date();

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
  return (
    <>
      <div className="w-100">
        <span className="w3-large w3-hide full">
          <b> [ H05 ] Dealers </b> Weekly (Targets){" "}
          <i className="w3-text-red fa fa-lock"> </i>{" "}
        </span>
        <div className="tbl-container">
          <table className="table-bordered table-striped">
            {/* <tr className="w3-gray">
              <td colSpan="30" className=" h5 w3-padding  text-left ">
                Dealers Weekly Plan ({weekdata?.length})

              </td>
            </tr> */}
            <thead>
              <tr>
                <th colSpan={1} rowSpan={2} style={{ width: "4%" }}> S. NO </th>
                <th colSpan={1} rowSpan={2} style={{ width: "16%" }}> Delear </th>
                <th colSpan={1} rowSpan={2} style={{ width: "7%" }}> Delear Code </th>
                <th colSpan={4}> {month} </th>
                <th colspan={12}> Week </th>
              </tr>
              <tr>
                <th className="bg-red" colSpan={1}> Sales </th>
                <th className="bg-red">New Machine </th> 
                <th className="bg-red">FSS Visit </th>
                <th className="bg-red">ZM/DM Visit </th> 
                <th className="bg-red">Piainter Meet</th>
              </tr>
            </thead>
            <tbody>
              {weekdata?.sort((a, b) => a.month_value.toString()?.localeCompare(b.month_value.toString())).map((item, index) => (
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
                    3
                  </td>
                  <td className="">
                    5
                  </td>
                  <td className="">
                    6
                  </td>
                  <td className="">
                    8
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DelearActivityPlan;
