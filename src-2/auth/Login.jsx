import { useEffect, useState, useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import iconGoogle from "../images/google.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import axiosInstance from "./api";
import { provider } from "../firebase";
import { setAuthData } from "../store/actions/Auth";
import { SHOW_TOAST } from "../store/constant/types";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  // 1 : Login with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const user = GoogleAuthProvider.credentialFromResult(result);

      const email = user?.email;
      const accessToken = user?.accessToken;

      // const email='a.srivastava@shalimarpaints.com';
      // const accessToken='4644616546565414651asdasd';

      const data = {
        SessionData: [
          {
            Email: email,
            Token: accessToken,
          },
        ],
      };
      await axiosInstance
        .post("api/UserMaster/SessionCheck", data)
        .then((res) => {
          if (res?.status === 200) {
            console.log(res.data);
            dispatch(setAuthData(res?.data));
            localStorage.setItem("access_token", res.data.Data[0].TokenValid);
            localStorage.setItem("Isloggedin", res?.data?.Status);

            if (res?.data?.Data[0]?.EmployeeTpye == "ZM") {
              navigate("/zone");
            }
            if (res?.data?.Data[0]?.EmployeeTpye == "DM") {
              navigate("/depot");
            }
            if (
              res?.data?.Data[0]?.EmployeeTpye == "TM" ||
              res?.data?.Data[0]?.EmployeeTpye == "AM"
            ) {
              navigate("/territory");
            }
          }
        })
        .catch((error) => {
          dispatch({ type: SHOW_TOAST, payload: error.message });
        });
    });
  }; // 1 : Ends

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
  }, [AuthData]);
  //// 2 : Login with Email Password
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const email = user?.email;
        // const accessToken = user?.accessToken;

        // const email='amitgupta@shalimarpaints.com';
        // const email = 'a.srivastava@shalimarpaints.com';
        // const email = 'a.chavan@shalimarpaints.com';
        // const email = 'anil.soni@shalimarpaints.com';

        const accessToken='4644616546565414651asdasd';

        const data = {
          SessionData: [
            {
              Email: email,
              Token: accessToken,
            },
          ],
        };
        await axiosInstance
          .post("api/UserMaster/SessionCheck", data)
          .then((res) => {
            if (res?.status === 200) {
              console.log("===SessionCheck===",res.data);
              dispatch(setAuthData(res?.data));
              localStorage.setItem("access_token", res.data.Data[0].TokenValid);
              localStorage.setItem("Isloggedin", res?.data?.Status);
              if (res?.data?.Data[0]?.EmployeeTpye == "HOD") {
                navigate("/national");
              }
              if (res?.data?.Data[0]?.EmployeeTpye == "ZM") {
                navigate("/zone");
              }
              if (res?.data?.Data[0]?.EmployeeTpye == "DM") {
                navigate("/depot");
              }
              if (
                res?.data?.Data[0]?.EmployeeTpye == "TM" ||
                res?.data?.Data[0]?.EmployeeTpye == "AM"
              ) {
                navigate("/territory");
              }
            }
          })
          .catch((error) => {
            dispatch({ type: SHOW_TOAST, payload: error.message });
          });
      })
      .catch((error) => {
        setError(" Wrong email or password   ");
      });
  }; // 2 : handleLogin ends

  return (
    <div className="login  w3-border w3-text-gray">
      <div className="wrapper w3-padding ">
        <div className="w3-row  w3-padding ">
          <div className="w3-col l5">
            <form onSubmit={handleLogin}>
              <div className="form-group h6">
                Registered Email
                <input
                  className="w3-input w3-border"
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group h6">
                Password
                <input
                  className="w3-input w3-border"
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group w3-small h6 ">
                <p>
                  {" "}
                  <u>I forgot my password </u>
                </p>
              </div>

              <div className="form-group">
                <button
                  className="w3-button w3-block  w3-indigo "
                  type="submit"
                >
                  Login
                </button>
              </div>

              <div className="form-group w3-text-red">
                <p>{error}</p>
              </div>
            </form>

            <div className="w3-small h5 w3-content w3-center w3-margin w3-padding-large ">
              Sign in with Planboard registered account.
            </div>
          </div>

          <div className="center w3-col l2">
            <div className="line" />
            <div className="or w3-circle">OR</div>
          </div>

          <div className="w3-col l5 w3-right">
            <div
              className="w3-button w3-block  w3-red"
              onClick={signInWithGoogle}
            >
              <img src={iconGoogle} alt="" className="icon" />
              Sign in with Gmail
            </div>

            <div className="w3-small h5 w3-content w3-center w3-margin w3-padding-large ">
              Sign in with your corporate Gmail workspace email account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
