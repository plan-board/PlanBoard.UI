import React from "react";
import {
  Wgt_Sum_Zone_Wise_Chart_Data,
  Wgt_Sum_Zone_Wise_Data,
} from "./Wgt_ZoneWise_Data";

const Wgt_ZoneWise_Ui = ({ data }) => {
  const wgtData = Wgt_Sum_Zone_Wise_Data;
  return (
    <>
      <div className="w3-padding-large">
        <div className="w3-clear ">
          <div className="w3-col l3 m3 s6 ">
            <span className=" w3-xlarge w3-left ">
              <i className="fa fa-bar-chart "></i>
              {data?.name}
            </span>
          </div>

          <div className="w3-col l3 m3 s6 w3-right">
            <form>
              <select className="form-control" value="">
                <option value="North" selected={data?.name === "North"}>
                  {" "}
                  North{" "}
                </option>
                <option value="South" selected={data?.name === "South"}>
                  South{" "}
                </option>
                <option value="East" selected={data?.name === "East"}>
                  {" "}
                  East{" "}
                </option>
                <option value="West" selected={data?.name === "West"}>
                  {" "}
                  West{" "}
                </option>
              </select>
            </form>
          </div>
        </div>

        <div className="w3-clear w3-padding"> </div>

        <div className="w3-col l3 m3 s12 ">
          <span className="w3-xxlarge"> {wgtData.summ_lly_sale_value} </span>{" "}
          Cr.
          <br />
          <span className="w3-small h6"> LLY {wgtData.summ_lly_fy} </span>
          <br />
          <span className="h6"> -- </span>
        </div>

        <div className="w3-col l3 m3 s12 ">
          <span className="w3-xxlarge"> {wgtData.summ_ly_sale_value}</span> Cr.
          <br />
          <span className="w3-small h6"> LY {wgtData.summ_ly_fy} </span>
          <br />
          <span className="h6">{wgtData.summ_ly_sale_value}% </span>
        </div>

        <div className="w3-col l3 m3 s12 ">
          <span className="w3-xxlarge">
            {" "}
            {wgtData.summ_cy_target_v1_value}{" "}
          </span>{" "}
          Cr.
          <br />
          <span className="w3-small h6">
            {" "}
            FY {wgtData.summ_cy_fy} - Plan (V.1){" "}
          </span>
          <br />
          <span className="h6">{wgtData.summ_cy_target_v1_percentage}% </span>
        </div>

        <div className="w3-col l3 m3 s12 ">
          <span className="w3-xxlarge">
            {" "}
            {wgtData.summ_cy_target_v2_value}{" "}
          </span>{" "}
          Cr. <i className=" w3-text-red fa fa-lock"> </i>
          <br />
          <span className="w3-small h6">
            {" "}
            FY {wgtData.summ_cy_fy} - Plan (V.2){" "}
          </span>
          <br />
          <span className="h6"> {wgtData.summ_cy_target_v2_percentage}% </span>
        </div>

        <div id="mercury-north" className="w3-row w3-margin-top ">
          <span className="w3-small h4  w3-right">
            {" "}
            128.5 Cr.
            <i className="w3-text-blue fa fa-flag  w3-right"></i>{" "}
          </span>
          <br />
          <div id="mercury-bar-north" className="w3-grey">
            {Wgt_Sum_Zone_Wise_Chart_Data.map((ele, index) => {
              return (
                <div
                  className={`w3-container w3-${index === 0 ? "red" : "blue"}`}
                  style={{ width: "65%" }}
                >
                  <span className="w3-small w3-right">
                    {" "}
                    YTD - {ele.currentMonth} - {ele.currentMonthTarget} Cr. ( -{" "}
                    {ele.percentage}% ){" "}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div id="mom-north" className="w3-row w3-margin-top ">
          <span className="w3-small h4 ">
            FY 23-24 - 128.5 Cr. <i className="w3-text-blue fa fa-flag"></i>{" "}
          </span>{" "}
          <br />
          <div id="mom-bar-north" className=" ">
            <table className="w3-table w3-stripped table-bordered">
              <tr>
                <td className="w3-red"> Apr </td>
                <td className="w3-teal"> May </td>
                <td className="w3-red"> Jun </td>
                <td className="w3-teal"> Jul </td>
                <td className="w3-red"> Aug </td>
                <td className="w3-gray"> Sep </td>
                <td className="w3-gray"> Oct </td>
                <td className="w3-gray"> Nov </td>
                <td className="w3-gray"> Dec </td>
                <td className="w3-gray"> Jan </td>
                <td className="w3-gray"> Feb </td>
                <td className="w3-gray"> Mar </td>
              </tr>
              <tr className="w3-hide">
                <td> 2.1% </td>
                <td className="w3-text-teal"> ( 114.2% ) </td>
                <td className="w3-text-red"> ( 55.0% ) </td>
                <td className="w3-text-red"> +6.0% </td>
                <td className="w3-text-red"> +2.0% </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
              </tr>

              <tr className="w3-hide">
                <td className="w3-text-gray"> 12 </td>
                <td className="w3-text-gray"> 20 </td>
                <td className="w3-text-gray"> 15 </td>
                <td className="w3-text-gray"> 20 </td>
                <td className="w3-text-gray"> 30 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
                <td className="w3-text-gray"> 0 </td>
              </tr>

              <tr>
                <td className="w3-text-blue"> 10.3 </td>
                <td className="w3-text-blue"> 10.0 </td>
                <td className="w3-text-blue"> 10.0 </td>
                <td className="w3-text-blue"> 10.1 </td>
                <td className="w3-text-blue"> 10.3 </td>
                <td className="w3-text-blue"> 10.7 </td>
                <td className="w3-text-blue"> 10.3 </td>
                <td className="w3-text-blue"> 10.6 </td>
                <td className="w3-text-blue"> 10.5 </td>
                <td className="w3-text-blue"> 10.3 </td>
                <td className="w3-text-blue"> 10.2 </td>
                <td className="w3-text-blue"> 10.1 </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wgt_ZoneWise_Ui;
