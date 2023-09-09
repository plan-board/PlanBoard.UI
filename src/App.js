import "./App.css";

import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
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
import store from "./store";
import { About } from "./pages";
import { setAuthData } from "./store/actions/Auth";
import { SHOW_TOAST } from "./store/constant/types";
import Settings from "./domains/settings/Settings";

function App() {
  const { AuthData } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: App.js:44 ~ App ~ AuthData:", AuthData);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("access_token"));
  const rolId = parseInt(localStorage.getItem("roleId"));
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("Isloggedin");
  useEffect(() => {
    if (AuthData == null) {
      const data = {
        TokenData: [
          {
            Token: localStorage.getItem("access_token"),
          },
        ],
      };
      axiosInstance
        .post("api/UserMaster/UserAuth", data)
        .then((res) => {
          if (res?.status === 200) {
            if (res?.data?.Status == true) {
              console.log(
                "🚀 ~ file: App.js:62 ~ .then ~ res?.data?.Status:",
                res?.data?.Status
              );
              console.log(res?.data);
              dispatch(setAuthData(res?.data));
              localStorage.setItem("access_token", res.data.Data[0].TokenValid);
            }
          }
        })
        .catch((error) => {
          dispatch({ type: SHOW_TOAST, payload: error.message });
        });
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
            {/* <Route path="*" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />   */}
            <Route
              path="/"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            {/* <Route
              path="/"
              element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
            /> */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route
              path="/forgotpassword"
              element={<PrivateRoute element={<Forgotpassword />} />}
            />
            {/* <Route
              path="/forgotpassword"
              element={isAuth ? <Forgotpassword /> : <Navigate to="/login" />}
            /> */}

            <Route
              path="/account"
              element={<PrivateRoute element={<Account />} />}
            />
            {/* <Route
              path="/account"
              element={
                isAuth ? <Account isAuth={isAuth} /> : <Navigate to="/login" />
              }
            /> */}
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            {/* <Route
              path="/profile"
              element={
                isAuth ? <Profile isAuth={isAuth} /> : <Navigate to="/login" />
              }
            /> */}
            <Route
              path="/notifications"
              element={<PrivateRoute element={<Notifications />} />}
            />
            {/* <Route
              path="/notifications"
              element={
                isAuth ? (
                  <Notifications isAuth={isAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            <Route path="/logs" element={<PrivateRoute element={<Logs />} />} />
            {/* <Route
              path="/logs"
              element={
                isAuth ? <Logs isAuth={isAuth} /> : <Navigate to="/login" />
              }
            /> */}
            <Route
              path="/verifyphone"
              element={<PrivateRoute element={<Verifyphone />} />}
            />
            {/* <Route
              path="/verifyphone"
              element={
                isAuth ? (
                  <Verifyphone isAuth={isAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            <Route
              path="/verifyemail"
              element={<PrivateRoute element={<Verifyemail />} />}
            />
            {/* <Route
              path="/verifyemail"
              element={
                isAuth ? (
                  <Verifyemail isAuth={isAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            <Route
              path="/verifyprofile"
              element={<PrivateRoute element={<Verifyprofile />} />}
            />
            {/* <Route
              path="/verifyprofile"
              element={
                isAuth ? (
                  <Verifyprofile isAuth={isAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}

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
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
