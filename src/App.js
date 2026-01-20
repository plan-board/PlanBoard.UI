import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./auth/api";
import { Navbar, Sidebar } from "./components";
import { Login, Register, Forgotpassword } from "./auth";
import {
  Account,
  Profile,
  Notifications,
  Logs,
  Verifyemail,
  Verifyphone,
  Verifyprofile,
  ChangePassword,
} from "./profile";
import {
  Dashboard,
  National,
  Zone,
  Depot,
  Territory,
  Dealer,
  Schedule,
} from "./domains";
import CustomerPotential from "./domains/customerPotential";
import PreJourneyPlan from "./domains/preJourneyPlan";
import { About } from "./pages";
import { setAuthData } from "./store/actions/Auth";
import { SHOW_TOAST } from "./store/constant/types";
import Settings from "./domains/settings/Settings";
import TerritoryDashboard from "./domains/territoryDashboard";
import NewProductPlaning from "./domains/newProductPlaning";
import Reports from "./domains/Reports/Reports";

import Ihnational from "./domains/Ihnational";
import Segment from "./domains/segment";
import TintingMachine from "./domains/TintingMachine";

function App() {
  const { AuthData } = useSelector((state) => state.auth);

  const [flag, setflag] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("access_token"));
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("Isloggedin");
  // const
  const checkUserAuth = async () => {
    try {
      const response = await axiosInstance.post("api/UserMaster/UserAuth", {
        TokenData: [{ Token: localStorage.getItem("access_token") }],
      });

      if (response?.status === 200 && response?.data?.Status) {
        dispatch(setAuthData(response.data));
        localStorage.setItem(
          "access_token",
          response?.data?.Data[0].TokenValid
        );
      } else {
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  useEffect(() => {
    if (AuthData == null) {
      checkUserAuth();
    }
  }, [AuthData]);
  useEffect(() => {
    if (window.location.pathname == "/") {
      checkLoginType();
    }
    // checkLoginType();
  }, []);

  const checkLoginType = () => {
    let type = localStorage.getItem("EmployeeType");

    if (type == "HOD") {
      window.location.pathname = "/national";
    } else if (type == "ZM") {
      window.location.pathname = "/zone";
    } else if (type == "DM") {
      window.location.pathname = "/depot";
    } else if (type == "AM") {
      window.location.pathname = "/territory";
    } else if (type == null) {
      window.location.pathname = "login";
    } else if (type == "IH") {
      window.location.pathname = "/Ihnational";
    } else if (type == "SH") {
      window.location.pathname = "/segment";
    }
  };

  const PrivateRoute = ({ element, ...rest }) => {
    return loggedIn == "true" ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Sidebar
          rolId={
            AuthData?.Data?.length > 0 ? AuthData?.Data[0]?.EmployeeTpye : true
          }
          isAuth={loggedIn == "true" ? true : false}
        />

        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route
            path="/account"
            element={<PrivateRoute element={<Account />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/notifications"
            element={<PrivateRoute element={<Notifications />} />}
          />
          <Route path="/logs" element={<PrivateRoute element={<Logs />} />} />

          <Route
            path="/verifyphone"
            element={<PrivateRoute element={<Verifyphone />} />}
          />
          <Route
            path="/verifyemail"
            element={<PrivateRoute element={<Verifyemail />} />}
          />
          <Route
            path="/verifyprofile"
            element={<PrivateRoute element={<Verifyprofile />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/national"
            element={<PrivateRoute element={<National />} />}
          />
          <Route path="/zone" element={<PrivateRoute element={<Zone />} />} />
          <Route
            path="/depot/:zoneId?/:depotId?"
            element={<PrivateRoute element={<Depot />} />}
          />
          <Route
            path="/territory/:zoneId?/:depotId?/:territoryId?"
            element={<PrivateRoute element={<Territory />} />}
          />
          <Route
            path="/dealer"
            element={<PrivateRoute element={<Dealer />} />}
          />
          <Route
            path="/schedule"
            element={<PrivateRoute element={<Schedule />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="/about"
            element={
              isAuth ? <About isAuth={isAuth} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/customer-potential"
            element={<PrivateRoute element={<CustomerPotential />} />}
          />
          <Route
            path="/pre-journey-plan"
            element={<PrivateRoute element={<PreJourneyPlan />} />}
          />
          <Route
            path="/change-password"
            element={<PrivateRoute element={<ChangePassword />} />}
          />
          <Route
            path="/territory-dashobard"
            element={<PrivateRoute element={<TerritoryDashboard />} />}
          />
          <Route
            path="/new-Product-Planing"
            element={<PrivateRoute element={<NewProductPlaning />} />}
          />
          <Route
            path="/Reports"
            element={<PrivateRoute element={<Reports />} />}
          />

          <Route
            path="/Ihnational"
            element={<PrivateRoute element={<Ihnational />} />}
          />
          <Route
            path="/segment"
            element={<PrivateRoute element={<Segment />} />}
          />
           <Route
            path="/tintingMachine"
            element={<PrivateRoute element={<TintingMachine />} />}
          />
          {/* <Route
            path="/newProductPlanningReport"
            element={<PrivateRoute element={<Segment />} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
