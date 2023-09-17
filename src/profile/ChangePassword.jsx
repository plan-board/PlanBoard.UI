import { useState } from "react";

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    return (
        <div className="main">
            <div className="w3-row">
                <span className="main-title">Shalimar Paints Limited   </span>
            </div>
            <div className="wrapper">
                <div className="login-box">
                    <h4>Change Password</h4>
                    <div className="tbl-container">
                        <form  >
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="email" required={true} placeholder="Current Password" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="email" required={true} placeholder="New Password" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="email" required={true} placeholder="Confirm Password" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group w3-small h6 ">
                            </div>
                            <div className="form-group m-0">
                                <button className="" type="submit"> Submit </button>
                            </div>
                            <div className="form-group w3-text-red">
                                <p>{error}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword 