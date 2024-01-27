import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MayankSoftLogo from "../images/MayankSoftLogo.jpg";
import ShalimarPaintsLogo from "../images/ShalimarPaintsLogo.jpg";
import logoShalimaar from "../images/logo.png";
import logoPlanboard from "../images/logo1-white.png";

import axiosInstance from "./api";
import { setAuthData } from "../store/actions/Auth";
import { SHOW_TOAST } from "../store/constant/types";
import LoadingBar from "react-top-loading-bar";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const initialFormData = {
    Email: "",
    Password: "",
    Token: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (AuthData?.Status == true) {
      if (AuthData?.Data[0]?.EmployeeTpye == "ZM") {
        navigate("/zone");
      }
      if (AuthData?.Data[0]?.EmployeeTpye == "DM") {
        navigate("/depot");
      }
      if (AuthData?.Data[0]?.EmployeeTpye == "TM") {
        navigate("/territory");
      }
    }
  }, [AuthData, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      SessionData: [formData],
    };
    setProgress(60);
    try {
      const res = await axiosInstance.post(
        "api/UserMaster/SessionCheck",
        payload
      );

      if (res?.status === 200) {
        const responseData = res?.data;

        if (responseData?.Status === true) {
          setError("");
          resetForm();

          dispatch(setAuthData(responseData));

          localStorage.setItem(
            "access_token",
            responseData.Data[0]?.TokenValid
          );
          localStorage.setItem("Isloggedin", responseData.Status);
          localStorage.setItem(
            "EmployeeType",
            responseData.Data[0]?.EmployeeTpye
          );
          setProgress(100);
          switch (responseData.Data[0]?.EmployeeTpye) {
            case "HOD":
              navigate("/national");
              break;
            case "ZM":
              navigate("/zone");
              break;
            case "DM":
              navigate("/depot");
              break;
            case "TM":
            case "AM":
              navigate("/territory");
              break;
            default:
              // Handle unknown EmployeeType
              break;
          }
        } else {
          setError(responseData?.Message || "An error occurred");
        }
      } else {
        setError("Request failed");
      }
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  }; // 2 : handleLogin ends

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <style>{".w3-sidebar{display:none}"}</style>
      <LoadingBar
        color="#007ad1"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="login-Container">
        <div className="loginBg">
          <div className="logo-container">
            <img src={MayankSoftLogo} alt="MayankSoft" />
            <img src={ShalimarPaintsLogo} alt="Shailmar Planboard" />
          </div>
          <div className="wrapper">
            <div className="login-box">
              <h2 className="login-title">Sign In Here</h2>
              <div
                className="w3-content w3-center w3-padding-large mb-3"
                style={{ fontFamily: "Nunito sans" }}
              >
                Sign in with Planboard registered account.
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-group h6">
                  <input
                    className="w3-input w3-border"
                    type="email"
                    required={true}
                    placeholder="Email"
                    name="Email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group h6">
                  <input
                    className="w3-input w3-border"
                    type="password"
                    required={true}
                    placeholder="Password"
                    name="Password"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group w3-small h6 ">
                  <Link to="/forgot-password">I forgot my password !</Link>
                </div>
                <div className="form-group m-0">
                  <button className="" type="submit">
                    {" "}
                    Login{" "}
                  </button>
                </div>
                <div className="form-group w3-text-red">
                  <p>{error}</p>
                </div>
              </form>
            </div>
          </div>
          <div className="loginFooter">
            <div className="footertextDev">
              Design & Developed By Mayank Software Solution
            </div>
            <div className="copyRight">
              2023©All Rights Reserved Shalimar Paints Limited
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
