import { useState } from "react";
import { Link } from "react-router-dom"
import logoShalimaar from "../images/logo.png";
import logoPlanboard from "../images/logo1-white.png";
import { SHOW_TOAST } from "../store/constant/types";
import axiosInstance from "./api";
import { useDispatch } from "react-redux";

const Forgotpassword = () => {
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const submit = async (e) => {
        console.log("-ss");
        e.preventDefault();
        try {
            const payload = {employee_detail : email}
            const response = await axiosInstance.post(
              "ForgetPassword",
              payload
            );
            console.log("=====forgot-pass====", response);
            if (response?.status === 200 && response?.data?.Status === true) {
                setMsg("Kindly check your email and Login");
            }else{
                setError(response?.data?.Message)
            }
          } catch (error) {
            // Handle errors
            setError('Something went wrong')
            dispatch({ type: SHOW_TOAST, payload: error.message });
          }
    }

    return (
        <>
            <style>
                {'.w3-sidebar{display:none}'}
            </style>
            <div className="login">
                <div className="logo-container">
                    <img src={logoShalimaar} alt="Shalimar" />
                    <img src={logoPlanboard} alt="Shalimar Planboard" />
                </div>
                <div className="wrapper">
                    <div className="login-box">
                        <h2 className="login-title">Forgot Password</h2>
                        <div className="w3-content w3-center w3-padding-large mb-3">
                            Enter your email here. We will send your password on it.
                        </div>
                        <form onSubmit={submit}>
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="text" required={true} placeholder="Enter Email or Username" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group w3-small h6 ">
                                <Link to="/login">Already have an account?</Link>
                            </div>
                            <div className="form-group m-0">
                                <button className="" type="submit"> Send Email </button>
                            </div>
                            <div className="form-group w3-text-red">
                                <p>{error}</p>
                            </div>
                            <div className="form-group w3-text-green">
                                <p>{msg}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword 