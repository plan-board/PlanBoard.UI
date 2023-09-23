import "./App.css";

import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";
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
import { About } from "./pages";
import { setAuthData } from "./store/actions/Auth";
import { SHOW_TOAST } from "./store/constant/types";
import Settings from "./domains/settings/Settings";

function App() { 
  const { AuthData } = useSelector((state) => state.auth);
  // console.log("🚀 ~ file: App.js:44 ~ App ~ AuthData:", AuthData);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("access_token"));
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("Isloggedin");
  const checkUserAuth = async () => {
    try {
      const response = await axiosInstance.post('api/UserMaster/UserAuth', {
        TokenData: [{ Token: localStorage.getItem('access_token') }],
      });

      if (response?.status === 200 && response?.data?.Status) {
        dispatch(setAuthData(response.data));
        localStorage.setItem('access_token', response?.data?.Data[0].TokenValid);
      } else {
        // Handle the case when authentication fails
        // You can show an error message or redirect the user
        localStorage.removeItem('access_token')
      }
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  }
  useEffect(() => {
    if (AuthData == null) {
      checkUserAuth();
    }
  }, [AuthData]);

  const PrivateRoute = ({ element, ...rest }) => {
    return loggedIn == "true" ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar isAuth={loggedIn == "true" ? true : false} />
          <Sidebar
            rolId={
              AuthData?.Data?.length > 0
                ? AuthData?.Data[0]?.EmployeeTpye
                : true
            }
          />
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/forgot-password"
              element={<Forgotpassword />}
            />
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
              path="/change-password"
              element={<PrivateRoute element={<ChangePassword />} />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
