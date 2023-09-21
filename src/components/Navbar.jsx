import { useEffect, useState, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Profile from "../images/profile-img.png";
import Exit from "../images/exit.png";
import { useSelector } from "react-redux";

const Navbar = ({ isAuth }) => { 
  const { AuthData } = useSelector((state) => state?.auth); 
  const logout = () => { 
    signOut(auth).then(() => {
      localStorage.clear(); 
      const isLogout = true;
      window.location.pathname = "/";
    });
  };

  return ( 
    <div className="w3-bar w3-top top-navbar h5" style={{ zIndex: 10 }}> 
      {isAuth ? (
        <div className="">
          <button
            className=" w3-right w3-button w3-bar-item w3-hover-none"
            onClick={logout}
          >
            <img src={Exit} className="exit_icon" alt="Exit" />
          </button> 
          <button className=" w3-right w3-button w3-bar-item">
            <img src={Profile} className="w3-circle avatar" alt="Profile" />
            {AuthData?.Data[0].EmployeeName} ({AuthData?.Data[0].EmployeeTpye})
            {/* - (
            {AuthData?.Data[0].EmployeeTpye === "HOD" ? (
              <>{AuthData?.HOD.map((ele) => ele.HODName).join(",")}</>
            ) : AuthData?.Data[0].EmployeeTpye === "ZM" ? (
              <>{AuthData?.Zone.map((ele) => ele.ZoneName).join(",")}</>
            ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
              <>{AuthData?.Depot.map((ele) => ele.DepotName).join(",")}</>
            ) : AuthData?.Data[0].EmployeeTpye === "AM" ? (
              <>
                // {AuthData?.Territory.map(ele => ele.TerritoryName).join(",")}
              </>
            ) : (
              <></>
            )}
            ) */}
            {/* <img src={photoURL} className="  w3-circle avatar" />  */}
          </button>
        </div>
      ) : (
        <>
          {/* <Link className=" w3-right  w3-button link w3-bar-item " to="login">
            
            Login
          </Link>
          <Link
            className=" w3-right  w3-button link w3-bar-item "
            to="register"
          >
            
            Register
          </Link> */}
        </>
      )}
    </div>
  );
};

export default Navbar;
