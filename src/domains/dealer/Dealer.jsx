import { useEffect, useState, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { rolePermission, zoneData } from "../../auth/middleware";

const Dealer = () => {
  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <div className="main  w3-border">
      <div className="w3-row w3-padding-16"></div>

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

      <div className="w3-row w3-row-padding w3-padding-16 w3-margin-top  w3-margin-bottom w3-white ">
        <div className="w3-col l9 m6 s6 ">
          <span className="w3-small h6">
            North / Delhi-Naraina / H05 /
            <i className="w3-text-gray"> Dealer # UT7584J8 </i>
          </span>

          <br />

          <span className="w3-large">
            {" "}
            [ Shanti Paints - Rohtak ]
            <span className=" w3-text-gray w3-opacity">
              <span className="  w3-text-gray ">
                {" "}
                <b>
                  {" "}
                  [v.1 : <u className=" w3-text-red"> 4.0 Cr. </u> ]{" "}
                </b>
              </span>
              <span className="  w3-text-gray  ">
                {" "}
                [v.2 : <u className=" w3-text-red"> 4.5 Cr. + 0.1%</u> ]{" "}
                <i className="fa fa-unlock w3-text-red"> </i>
              </span>
            </span>
          </span>
          <br />
        </div>

        <div className="w3-col l3 m3 s6 w3-right">
          <form>
            <select className="form-control " value="">
              <option value=""> Sales Plan </option>
              <option value="All"> OS / OD / Collection Plan </option>
              <option value="All"> Activity Plan </option>
            </select>
          </form>
        </div>

        <table className="tbl_grid w3-table table-stripped w3-white table-bordered h6 w3-small">
          <tr className="w3-gray h4">
            <td colSpan="6" className=" w3-padding  text-left">
              {" "}
              Year Plan - FY 23-24{" "}
            </td>
          </tr>

          <tr className="w3-yellow ">
            <td>
              {" "}
              LLY
              <br /> FY 22-23{" "}
            </td>
            <td>
              {" "}
              LY
              <br /> FY 22-23{" "}
            </td>
            <td>
              {" "}
              Weightage <br /> FY 23-24{" "}
            </td>
            <td>
              {" "}
              Target (%) <br /> FY 23-24{" "}
            </td>
            <td>
              {" "}
              YTD (%) <br /> August{" "}
            </td>
          </tr>

          <tr>
            <td> 23 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td> 29 (30%) </td>
          </tr>
        </table>

        <div className="w3-row w3-padding-16"></div>

        <span className=" btn btn-sm w3-small text-left w3-text-red ">
          {" "}
          <i className="fa fa-lock"></i> Lock / Un-Lock
        </span>
        <span className=" btn btn-sm w3-small text-left ">
          {" "}
          <i className="fa fa-gear"></i> Set Rules
        </span>
        <span className="  btn btn-sm w3-text-gray  w3-small ">
          {" "}
          <i className="fa fa-pencil"></i> Edit Manually
        </span>

        <table className="tbl_grid w3-table table-bordered h6 w3-small ">
          <tr className="w3-gray h4">
            <td colSpan="6" className="w3-padding  text-left">
              {" "}
              Sales Plan - FY 23-24{" "}
            </td>
          </tr>

          <tr className="w3-yellow ">
            <td
              colSpan="2"
              className="w3-center w3-padding"
              style={{ width: "30%" }}
            >
              {" "}
              Month Wise{" "}
            </td>
            <td colSpan="4" className="w3-center  w3-padding">
              {" "}
              Week wise{" "}
            </td>
          </tr>

          <tr className="w3-light-gray w3-center">
            <td className="w3-light-gray">Month </td>
            <td className="w3-light-gray"> Total </td>
            <td> Week -1 </td>
            <td> Week - 2 </td>
            <td> Week - 3 </td>
            <td> Week -4 </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Apr </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> May </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Jun </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Jul </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Aug </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Sep </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Oct </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Nov </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Dec </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Jan </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Feb </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>

          <tr>
            <td className="w3-light-gray"> Mar </td>
            <td className="w3-light-gray"> 34 </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={34} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={4} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={45} />{" "}
            </td>
            <td>
              {" "}
              <input type="text" className="inp40" value={12} />{" "}
            </td>
          </tr>
        </table>

        <div className="w3-row w3-padding-32"></div>

        <span className=" btn btn-sm w3-small text-left w3-text-red ">
          {" "}
          <i className="fa fa-lock"></i> Lock / Un-Lock
        </span>
        <span className=" btn btn-sm w3-small text-left ">
          {" "}
          <i className="fa fa-gear"></i> Set Rules
        </span>
        <span className="  btn btn-sm w3-text-gray  w3-small ">
          {" "}
          <i className="fa fa-pencil"></i> Edit Manually
        </span>

        <table className="tbl_grid w3-table table-bordered h6 w3-small ">
          <tr className="w3-gray h4">
            <td colSpan="30" className="w3-padding text-left">
              {" "}
              Collection Plan - FY 23-24{" "}
            </td>
          </tr>

          <tr className="w3-yellow ">
            <td
              colSpan="5"
              className="w3-center w3-padding "
              style={{ width: "14%" }}
            >
              {" "}
              Month Opening{" "}
            </td>
            <td colSpan="24" className="w3-center w3-padding ">
              {" "}
              Week{" "}
            </td>
          </tr>

          <tr className="w3-light-gray w3-center">
            <td rowspan="2" className="w3-yellow w3-padding ">
              Month{" "}
            </td>
            <td rowspan="2" className="w3-yellow w3-padding w3-padding ">
              {" "}
              Sale{" "}
            </td>
            <td rowspan="2" className="w3-yellow w3-padding w3-padding ">
              {" "}
              OS{" "}
            </td>
            <td rowspan="2" className="w3-yellow w3-padding w3-padding ">
              {" "}
              OD{" "}
            </td>
            <td rowspan="2" className="w3-yellow w3-padding ">
              {" "}
              Coll.{" "}
            </td>

            <td colSpan="4" className="w3-white w3-center ">
              {" "}
              Week -1{" "}
            </td>
            <td colSpan="4" className="w3-white w3-center ">
              {" "}
              Week - 2{" "}
            </td>
            <td colSpan="4" className="w3-white w3-center ">
              {" "}
              Week - 3{" "}
            </td>
            <td colSpan="4" className="w3-white w3-center ">
              {" "}
              Week - 4{" "}
            </td>
          </tr>

          <tr className="w3-center">
            <td> Sale </td>
            <td> OS </td>
            <td> OD </td>
            <td> Coll. </td>

            <td> Sale </td>
            <td> OS </td>
            <td> OD </td>
            <td> Coll. </td>

            <td> Sale </td>
            <td> OS </td>
            <td> OD </td>
            <td> Coll. </td>

            <td> Sale </td>
            <td> OS </td>
            <td> OD </td>
            <td> Coll. </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Apr </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> May </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Jun </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Jul </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Aug </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Sep </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Oct </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Nov </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Dec </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Jan </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Feb </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>

          <tr className="w3-center">
            <td className="w3-light-gray"> Mar </td>

            <td className="w3-light-gray"> 38 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>
            <td className="w3-light-gray"> 28 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>

            <td> 1 </td>
            <td> 3 </td>
            <td> 3 </td>
            <td> 7 </td>
          </tr>
        </table>

        <div className="w3-row w3-padding-32"></div>

        <span className=" btn btn-sm w3-small text-left w3-text-red ">
          {" "}
          <i className="fa fa-lock"></i> Lock / Un-Lock
        </span>
        <span className=" btn btn-sm w3-small text-left ">
          {" "}
          <i className="fa fa-gear"></i> Set Rules
        </span>
        <span className="  btn btn-sm w3-text-gray  w3-small ">
          {" "}
          <i className="fa fa-pencil"></i> Edit Manually
        </span>

        <table className="tbl_grid w3-table table-bordered w3-center h6 w3-small ">
          <tr className="w3-gray h4">
            <td colSpan="20" className=" w3-padding  text-left ">
              {" "}
              Activity Plan - FY 23-24{" "}
            </td>
          </tr>

          <tr className=" w3-yellow h6">
            <td className=""> Activity </td>
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
            <td className="w3-center w3-padding "> New Machine </td>

            <td>2 </td>
            <td className="">4 </td>
            <td className=""> 2 </td>
            <td className=""> 3 </td>
            <td className=""> 5 </td>
            <td className=" ">2 </td>
            <td className=" "> 4 </td>
            <td className=" "> 4 </td>
            <td className=" ">5 </td>
            <td className=" "> 2 </td>
            <td className=" "> 2 </td>
            <td className=" ">2 </td>
          </tr>

          <tr className="">
            <td className="w3-center w3-padding "> FSA Visits </td>
            <td>2 </td>
            <td className="w3-text-teal">4 </td>
            <td className=" "> 2 </td>
            <td className=" "> 3 </td>
            <td className=" "> 5 </td>
            <td className=" ">2 </td>
            <td className=" "> 4 </td>
            <td className=" "> 4 </td>
            <td className=" ">5 </td>
            <td className=" "> 2 </td>
            <td className=" "> 2 </td>
            <td className=" ">2 </td>
          </tr>

          <tr className="">
            <td className="w3-center w3-padding "> ZM/DM/TM Visits </td>

            <td>2 </td>
            <td className=" ">1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=" "> 1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=" "> 1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=" "> 1 </td>
            <td className=" ">1</td>
          </tr>

          <tr className="">
            <td
              className="w3-center w3-padding w3-small   "
              style={{ width: "20%" }}
            >
              {" "}
              <i> [ Anyother activity from activity master] </i>{" "}
            </td>

            <td>2 </td>
            <td className=" ">1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=""> 1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=" "> 1 </td>
            <td className=" ">1 </td>
            <td className=" "> 1 </td>
            <td className=" "> 1 </td>
            <td className=" ">1</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Dealer;
