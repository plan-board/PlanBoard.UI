import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { hasPermission } from "../auth/middleware";
import hamburger from "../images/hamburger.png";
import { changeSidebarStatus } from "../store/actions/sidebarAction";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
const Sidebar = ({ isAuth, rolId }) => {
  const [toggleState, setToggleState] = useState(1);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const hideSidebar = () => {
    setFlag(!flag);
  };

  return (
    <>
      <Navbar hideSidebar={hideSidebar} isAuth={isAuth} flag={flag} />
      <div
        className="w3-sidebar w3-bar-block  sidebar-nav"
        style={{ zIndex: 20, display: flag ? "block" : "none" }}
      >
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
            <i className="fa fa-globe"></i>
            <p className="w3-small h6">National</p>
          </NavLink>
        )}
        {hasPermission(rolId, "zone") && (
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (!isActive ? " unselected" : " active")
            }
            to="zone"
          >
            <i className="fa fa-area-chart"></i>
            <p className="w3-small h6">Zone</p>
          </NavLink>
        )}
        {hasPermission(rolId, "depot") && (
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (!isActive ? " unselected" : " active")
            }
            to="depot"
          >
            <i className="fa fa-list-alt"></i>
            <p className="w3-small h6">Depot</p>
          </NavLink>
        )}
        {hasPermission(rolId, "territory") && (
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (!isActive ? " unselected" : " active")
            }
            to="territory"
          >
            <i className="fa  fa-map-marker"></i>
            <p className="w3-small h6">Territory</p>
          </NavLink>
        )}
        {hasPermission(rolId, "dashscheduleboard") && (
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (!isActive ? " unselected" : " active")
            }
            to="schedule"
          >
            <i className="fa fa-table"></i>
            <p className="w3-small h6">Schedule</p>
          </NavLink>
        )}
        {hasPermission(rolId, "national") && (
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (!isActive ? " unselected" : " active")
            }
            to="settings"
          >
            <i className="fa fa-gear"></i>
            <p className="w3-small h6">Settings</p>
          </NavLink>
        )}
        {hasPermission(rolId, "customer-potential") && (
          <div className="sub-menu">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (!isActive ? " unselected" : " active")
              }
              to="/customer-potential"
            >
              <i className="fa fa-user"></i>
              <p className="w3-small h6">Customer Potential</p>
            </NavLink>
          </div>
        )}
        {hasPermission(rolId, "change-password") && (
          <div className="sub-menu">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (!isActive ? " unselected" : " active")
              }
              to="/change-password"
            >
              <i className="fa fa-lock"></i>
              <p className="w3-small h6">Change Password</p>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
