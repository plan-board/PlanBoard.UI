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
    <div className="w3-sidebar w3-bar-block w3-hide-small  ">
      <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
        <img src={logo} className="" style={{ width: "50px" }} />
        <p className="w3-small h6">Planboard</p>
      </button>

      {hasPermission(rolId, "national") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="national"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa fa-bar-chart "></i>
            <p className="w3-small h6">National</p>
          </button>
        </NavLink>
      )}
      {hasPermission(rolId, "zone") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="zone"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa fa-bar-chart "></i>
            <p className="w3-small h6">Zone</p>
          </button>
        </NavLink>
      )}
      {hasPermission(rolId, "depot") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="depot"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa fa-bar-chart "></i>
            <p className="w3-small h6">Depot</p>
          </button>
        </NavLink>
      )}
      {hasPermission(rolId, "territory") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="territory"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa  fa-bar-chart "></i>
            <p className="w3-small h6">Territory</p>
          </button>
        </NavLink>
      )}

      {hasPermission(rolId, "dashscheduleboard") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="schedule"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa fa-bar-chart "></i>
            <p className="w3-small h6">Schedule</p>
          </button>
        </NavLink>
      )}
      {hasPermission(rolId, "national") && (
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (!isActive ? " unselected" : " active")
          }
          to="settings"
        >
          <button className="w3-bar-item w3-button w3-padding-xlarge  w3-center">
            <i className="fa fa-gear"></i>
            <p className="w3-small h6">Settings</p>
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
