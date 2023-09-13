import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { hasPermission } from "../auth/middleware";

const Sidebar = ({ isAuth, rolId }) => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return ( 
    <div className="w3-sidebar w3-bar-block w3-hide-small sidebar-nav" style={{ zIndex: 20 }}>
      <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
        <img src={logo} className="" style={{ width: "50px" }} />
        <p className="w3-small h6">Planboard</p>
      </button>
      {hasPermission(rolId, "national") && (
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="national">
            <i className="fa fa-globe"></i>
            <p className="w3-small h6">National</p>
        </NavLink>
      )}
      {hasPermission(rolId, "zone") && (
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="zone">
            <i className="fa fa-area-chart"></i>
            <p className="w3-small h6">Zone</p>
        </NavLink>
      )}
      {hasPermission(rolId, "depot") && (
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="depot">
            <i className="fa fa-list-alt"></i>
            <p className="w3-small h6">Depot</p>
        </NavLink>
      )}
      {hasPermission(rolId, "territory") && (
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="territory">
            <i className="fa  fa-map-marker"></i>
            <p className="w3-small h6">Territory</p>
        </NavLink>
      )}
      {hasPermission(rolId, "dashscheduleboard") && (
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="schedule">
            <i className="fa fa-table"></i>
            <p className="w3-small h6">Schedule</p>
        </NavLink>
      )}
      {/* {hasPermission(rolId, "national") && ( */}
        <NavLink className={({ isActive }) => "nav-link" + (!isActive ? " unselected" : " active")} to="settings">
            <i className="fa fa-gear"></i>
            <p className="w3-small h6">Settings</p>
        </NavLink>
      {/* )} */}
    </div>
  );
};

export default Sidebar;
