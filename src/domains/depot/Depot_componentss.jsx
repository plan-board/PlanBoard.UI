import React from "react";
import { useEffect, useState } from "react";
import { Wgt_Depotwise_Data } from "./Wgt_Depotwise_Data";
import Wgt_Depotwise_Ui from "./Wgt_Depotwise_Ui";
import Wgt_Depotwise_OSODCP_Ui from "./Wgt_Depotwise_OSODCP_Ui";

const Depot_componentss = ({ selectedZone = 0, setFilteredDepots }) => {
  const [filtereDepot, setFiltereDepot] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState(0);

  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  useEffect(() => {
    const filteredDepots = Wgt_Depotwise_Data.filter(
      (item) => item.zoneId == selectedZone
    );
    setFiltereDepot(filteredDepots);
    setFilteredDepots(filteredDepots);
  }, [selectedZone]);

  const onchangePlansHandler = (e) => {
    setSelectedPlans(e.target.value);
  };
  return (
    <>
      <div className="w3-row w3-row-padding w3-padding-16 w3-margin-top  w3-margin-bottom w3-white ">
        <div className="w3-col l6 m6 s6 ">
          <span className="w3-xlarge">
            Depot
            <span className=" w3-text-gray w3-opacity">[Sales Plan ]</span>
          </span>
          <br />
          <span
            className=" btn btn-sm w3-small text-left w3-text-red "
            onClick={(e) => setVisibility(!visibility)}
          >
            {" "}
            <i className="fa fa-lock"></i> Lock / Un-Lock{" "}
          </span>

          <span
            className=" btn btn-sm w3-small text-left "
            onClick={(e) => setVisibility(!visibility)}
          >
            {" "}
            <i className="fa fa-gear"></i> Set Rules{" "}
          </span>

          <span
            className="  btn btn-sm w3-text-gray  w3-small "
            onClick={(e) => setVisibility(!visibility)}
          >
            {" "}
            <i className="fa fa-pencil"></i> Edit Manually{" "}
          </span>

          {/* <span className=" w3-text-red w3-small">
            <i className="fa fa-lock"></i> Locked
          </span>
          <span className=" w3-text-gray  w3-small w3-opacity">
            <i className="fa fa-pencil"></i> Update
          </span> */}
        </div>

        <div className="w3-col l3 m3 s6 w3-right">
          <form>
            <select
              className="form-control"
              value={selectedPlans}
              onChange={onchangePlansHandler}
            >
              <option value=""> Sales Plan </option>
              <option value="osodcp"> OS / OD / Collection Plan </option>
              <option value="other"> Other </option>
            </select>
          </form>
        </div>
        {selectedPlans == 0 ? (
          <table className="w3-table table-stripped w3-white table-bordered ">
            <tr>
              <th>
                Depot <br />
                <i className="w3-text-gray"> T.(6) , Dlrs.(234) </i>
              </th>
              <th>
                {" "}
                LLY
                <br /> 21-22{" "}
              </th>
              <th>
                LY
                <br /> 22-23
              </th>
              <th>
                Target V.1 <br />
                23-24
              </th>
              <th>
                Target V.2 <br />
                23-24
              </th>
              <th> YTD (%) </th>
            </tr>
            {filtereDepot?.map((data) => (
              <Wgt_Depotwise_Ui key={data.id} data={data} />
            ))}
          </table>
        ) : null}
        {selectedPlans == "osodcp" ? (
          <table className="w3-table table-stripped w3-white table-bordered ">
            <tr>
              <th>
                Depot <br />
                <i className="w3-text-gray"> T.(6) , Dlrs.(234) </i>
              </th>
              <th> SALE </th>
              <th> OS </th>
              <th> OD </th>
              <th> DUE </th>
              <th> COLL </th>
              <th> YTD (%) </th>
            </tr>
            {filtereDepot?.map((data) => (
              <Wgt_Depotwise_OSODCP_Ui key={data.id} data={data} />
            ))}
          </table>
        ) : null}
      </div>
    </>
  );
};

export default Depot_componentss;
