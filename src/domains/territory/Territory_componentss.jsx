import React from "react";
import { useEffect, useState } from "react";

import Wgt_Summ_Depot_Ui from "./Wgt_Summ_Depot_Ui";
import { Wgt_Summ_Depot_Data } from "./Wgt_Summ_Depot_Data";

import { Wgt_Territory_Data } from "./Wgt_Territory_Data";
import Wgt_Territory_Table_Data from "./Wgt_Territory_Table_Data";
import Wgt_Territory_OSODCP_Table_Data from "./Wgt_Territory_OSODCP_Table_Data";

import CustomPopup from "../CustomPopup";

const Territory_Componentss = ({ depotsData, selectedDepot = "all" }) => {
  const [filtereTerretory, setFiltereTerretory] = useState([]);
  const [filtereDepot, setFiltereDepot] = useState([]);
  const [selectedDepots, setSelectedDepots] = useState("all");
  const [selectedPlans, setSelectedPlans] = useState(0);
  useEffect(() => {
    const idAndDepotArray = depotsData.map((item) => {
      return {
        id: item.id,
        name: item.depot,
      };
    });
    setFiltereDepot(idAndDepotArray);
    const filteredTerritories = Wgt_Territory_Data.filter((item) =>
      idAndDepotArray.some((depot) => depot.id === item.depotId)
    );
    console.log(filteredTerritories);
    setFiltereTerretory(filteredTerritories);
    setSelectedDepots(selectedDepot);
  }, [depotsData]);

  const handleTerriChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      const idAndDepotArray = depotsData.map((item) => {
        return {
          id: item.id,
          name: item.depot,
        };
      });
      setFiltereDepot(idAndDepotArray);
      setSelectedDepots(selectedValue);
    } else {
      const Id = parseInt(e.target.value, 10);
      const filteredDepots = Wgt_Territory_Data.filter(
        (item) => item.depotId == Id
      );
      setFiltereTerretory(filteredDepots);
      setSelectedDepots(Id);
    }
  };

  const onchangePlansHandler = (e) => {
    setSelectedPlans(e.target.value);
  };

  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <div>
      <div className="w3-row  w3-padding-16   ">
        <div className="w3-col l4 m4 s12 ">
          <form>
            <select
              className="form-control"
              value={selectedDepots}
              onChange={handleTerriChange}
            >
              <option value="all">All Depot</option>
              {filtereDepot.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item.name}
                </option>
              ))}
              {/* <option value="All" selected>Depot : All</option>
              <option value="Ambala">Depot : Ambala</option>
              <option value="Delhi-Naraina">Depot : Delhi-Naraina </option>
              <option value="Jalandhar">Depot : Jalandhar</option> */}
            </select>
          </form>
        </div>
      </div>
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
      <span className="  btn btn-sm w3-text-teal  w3-small ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Export{" "}
      </span>
      <span className="  btn btn-sm w3-text-teal  w3-small w3-right ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Import Targets{" "}
      </span>
      {Wgt_Summ_Depot_Data.map((data) => (
        <Wgt_Summ_Depot_Ui key={data.id} data={data} />
      ))}
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
      <span className="  btn btn-sm w3-text-teal  w3-small ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Export{" "}
      </span>
      <span className="  btn btn-sm w3-text-teal  w3-small w3-right ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Import Targets{" "}
      </span>
      <div className="w3-row w3-row-padding w3-padding-16 w3-margin-bottom w3-white ">
        <div className="w3-col l6 m6 s6 ">
          <span className="w3-xlarge">
            {" "}
            Territory{" "}
            <span className=" w3-text-gray w3-opacity">
              {" "}
              [Sales Plan ]
            </span>{" "}
          </span>
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
              <th> Territory</th>
              <th> LLY-21-22 </th>
              <th> LY-22-23 </th>
              <th> Target (%) </th>
              <th> YTD (%) </th>
            </tr>
            {filtereTerretory.map((data) => (
              <Wgt_Territory_Table_Data key={data.id} data={data} />
            ))}
          </table>
        ) : null}
        {selectedPlans == "osodcp" ? (
          <table className="w3-table table-stripped w3-white table-bordered ">
            <tr className="w3-gray">
              <th> Territory</th>
              <th> SALE </th>
              <th> OS </th>
              <th> OD </th>
              <th> COLL </th>
              <th> YTD (%) </th>
            </tr>
            {filtereTerretory.map((data) => (
              <Wgt_Territory_OSODCP_Table_Data key={data.id} data={data} />
            ))}
          </table>
        ) : null}
      </div>
      <br /> <br />
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
      <span className="  btn btn-sm w3-text-teal  w3-small ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Export{" "}
      </span>
      <span className="  btn btn-sm w3-text-teal  w3-small w3-right ">
        {" "}
        <i className="fa fa-file-excel-o"></i> Import Targets{" "}
      </span>
      <table className="tbl_grid w3-table table-bordered  h6 w3-small w3-white ">
        <tr className="w3-gray h5">
          <td colSpan="20" className=" w3-padding  text-left ">
            Month wise Sales Target
            <span className=" w3-right w3-opacity">
              <i className="w3-text-teal fa fa-save"> </i> Save
            </span>
          </td>
        </tr>

        <tr className=" w3-yellow h6">
          <td colSpan="1" className="" style={{ width: "14%" }}>
            {" "}
            Territory{" "}
          </td>
          <td className=" "> Total </td>
          <td className=" "> Apr </td>
          <td className=" "> May </td>
          <td className=" "> Jun </td>
          <td className=" "> Jul </td>
          <td className=" "> Aug </td>
          <td className=" "> Sep </td>
          <td className=" "> Oct </td>
          <td className=" "> Nov </td>
          <td className=" "> Dec </td>
          <td className=" "> Jan </td>
          <td className=" "> Feb </td>
          <td className=" "> Mar </td>
        </tr>

        <tr className="">
          <td className=""> H01 </td>
          <td className=""> 23 </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
        </tr>

        <tr className="">
          <td className=""> H02 </td>
          <td className=""> 23 </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
        </tr>

        <tr className="">
          <td className=""> H03 </td>
          <td className=""> 23 </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
          <td className="">
            {" "}
            <input className="inp40" value="2" disabled />{" "}
          </td>
        </tr>
      </table>
      <div className="w3-row w3-padding-16"></div>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title="Configure Rules "
      >
        <hr />
        Territoy Level Rules ( to Set Targets or breakdown Targets on every
        enity )
        <table className="w3-table table-bordered ">
          <tr className="">
            <th className=""></th>
            <th className="">Rule / Condition</th>

            <th className="">Ref. / Base Value</th>

            <th className="">% Impact</th>

            <th className="">Value Impact</th>

            <th className="">Net Increment</th>
          </tr>

          <tr className="">
            <td colSpan="10" className="w3-gray h5">
              Incremental Rules (Vertically Top Down | Global > Zone > Depot >
              Territory > Dealer )
            </td>
          </tr>

          <tr className="">
            <td className="">1</td>
            <td className="">Rule : LLY Topup ( Increment)</td>
            <td className="">
              <input className="inp40" value="60 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="10%" />
            </td>
            <td className="">
              <input className="inp40" value="10 CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">2</td>
            <td className="">Rule : LY Topup ( Increment )</td>
            <td className="">
              <input className="inp40" value="90 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="30%" />
            </td>
            <td className="">
              <input className="inp40" value="50 CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">3</td>
            <td className="">Rule : Potential based (Increment)</td>
            <td className="">
              <input className="inp40" value="600 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="10%" />
            </td>
            <td className="">
              <input className="inp40" value="10 CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">3</td>
            <td className="">
              Rule : Product Category / Group Ex. Water base (last Y Revenue)
            </td>
            <td className="">
              <input className="inp40" value="40 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="100%" />
            </td>
            <td className="">
              <input className="inp40" value="100CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">4</td>
            <td className="">Rule : Focus Segment ( )</td>
            <td className="">
              <input className="inp40" value="40 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="100%" />
            </td>
            <td className="">
              <input className="inp40" value="100CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">4</td>
            <td className="">Rule : Seasonal Time Months ( Festival.. )</td>
            <td className="">
              <input className="inp40" value="40 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="100%" />
            </td>
            <td className="">
              <input className="inp40" value="100CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td colSpan="10" className="w3-gray h5">
              Target Breakdown Rules (Horizontaly - Months / Weeks )
            </td>
          </tr>

          <tr className="">
            <td className="">4</td>
            <td className="">
              Rule : Seasonal Time Months ( Festival.. ) ( Monthly Breakdown of
              Territory -> 12 Months
            </td>
            <td className="">
              <input className="inp40" value="40 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="100%" />
            </td>
            <td className="">
              <input className="inp40" value="100CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">4</td>
            <td className="">
              Rule : Months Weekly Breakdown ( Dealer Level Rule ) ( Weekwise
              Breakdown of Monthly Target -> 4 Weeks
            </td>
            <td className="">
              <input className="inp40" value="40 Cr." />
            </td>
            <td className="">
              <input className="inp40" value="100%" />
            </td>
            <td className="">
              <input className="inp40" value="100CR." />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>

          <tr className="">
            <td className="">4</td>
            <td className="">
              Anyother conditon which can be converted to avergae weightage
            </td>
            <td className="">
              <input className="inp40" value="Ref. Value " />
            </td>
            <td className="">
              <input className="inp40" value="Target. %" />
            </td>
            <td className="">
              <input className="inp40" value="Target Value" />
            </td>
            <td className="">
              <input className="inp40" value="" />
            </td>
          </tr>
        </table>
      </CustomPopup>
    </div>
  );
};

export default Territory_Componentss;
