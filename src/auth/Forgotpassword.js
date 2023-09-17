import { useState } from "react";
import { Link } from "react-router-dom"
import logoShalimaar from "../images/logo.png";
import logoPlanboard from "../images/logo1-white.png";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

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
                        <form  >
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="email" required={true} placeholder="Enter Email or Username" onChange={(e) => setEmail(e.target.value)} />
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword 