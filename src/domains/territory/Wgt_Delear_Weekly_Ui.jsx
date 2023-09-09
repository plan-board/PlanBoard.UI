import { useEffect, useState } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

const Wgt_Delear_Weekly_Ui = ({ data }) => {
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
      <div className="w3-col l12 m12 s12  ">
        <span className="w3-large w3-hide ">
          <b> [ H05 ] Dealers </b> Weekly (Targets){" "}
          <i className="w3-text-red fa fa-lock"> </i>{" "}
        </span>
        <br />

        <table className="tbl_grid w3-table table-bordered h6 w3-small">
          <tr className="w3-gray">
            <td colSpan="30" className=" h5 w3-padding  text-left ">
              Dealers Weekly Plan ({weekdata?.length})

            </td>
          </tr>

          <tr className=" w3-yellow h6 w3-small">
            <td className="" colSpan={1} rowSpan={2} style={{ width: "15%" }}>
              Delear{" "}
            </td>
            <td className="" colSpan={1} rowSpan={2} style={{ width: "15%" }}>
              Delear Code
            </td>{" "}
            <td className="" colSpan={4}>
              {month}
            </td>
            <td className="" colspan={12}>
              Week{" "}
            </td>{" "}
          </tr>

          <tr className=" w3-yellow h6 w3-small">

            <td className="" colSpan={1}>
              Sales{" "}
            </td>{" "}
            <td className="">Week-1 </td> <td className="">Week-2 </td>{" "}
            <td className="">Week-3 </td> <td className="">Week-4 </td>{" "}
          </tr>
          {weekdata?.sort((a, b) => a.month_value.toString()?.localeCompare(b.month_value.toString())).map((item, index) => (
           
            <tr className="h6 w3-small" key={item?.dealerid}>
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
        </table>
      </div>
    </>
  );
};

export default Wgt_Delear_Weekly_Ui;
