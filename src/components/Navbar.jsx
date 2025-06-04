import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Profile from "../images/profile-img.png";
import Exit from "../images/exit.png";
import hamburger from "../images/hamburger.png";
import { changeSidebarStatus } from "../store/actions/sidebarAction";

const Navbar = ({ isAuth, hideSidebar, flag }) => {
  const { AuthData } = useSelector((state) => state?.auth);

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      const isLogout = true;
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="w3-bar w3-top top-navbar h5" style={{ zIndex: 10 }}>
      {isAuth ? (
        <div className="">
          <div
            className="sidebarOpen"
            onClick={hideSidebar}
            style={{ marginLeft: flag ? "100px" : "0px" }}
          >
            <img src={hamburger} className="hamburger" alt="Menu" />
          </div>
          <button
            className=" w3-right w3-button w3-bar-item w3-hover-none"
            onClick={logout}
          >
            <img src={Exit} className="exit_icon" alt="Exit" color="black" />
          </button>
          <button className=" w3-right w3-button w3-bar-item w3-hide-small">
            <img src={Profile} className="w3-circle avatar" alt="Profile" />
            {AuthData?.Data[0].EmployeeName} ({AuthData?.Data[0].EmployeeTpye})
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
