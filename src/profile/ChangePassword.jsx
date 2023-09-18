import { useState } from "react";
import { SHOW_TOAST } from "../store/constant/types";
import axiosInstance from "../auth/api";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');  
    const [password, setPassword] = useState('');  
    // const [cPassword, setCPassword] = useState('');  

    const submit = async (e) => {
        console.log("-ss");
        e.preventDefault();
        try {
            const payload = { username: email }
            const response = await axiosInstance.post(
                "api/Summary/forgot-pass",
                payload
            );
            console.log("=====forgot-pass====", response);
            if (response?.status === 200) {
                setMsg("Kindly check your email");
            } else {
                setError(true)
            }
        } catch (error) {
            // Handle errors
            setError(true)
            dispatch({ type: SHOW_TOAST, payload: error.message });
        }
    }
    const setConfirm = (value) =>  {
        console.log("value", value);
         
        // if(password != value){

        // }
    }

    return (
        <div className="main">
            <div className="w3-row">
                <span className="main-title">Shalimar Paints Limited   </span>
            </div>
            <div className="wrapper">
                <div className="login-box">
                    <h4>Change Password</h4>
                    <div className="tbl-container">
                        <form onSubmit={submit} >
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="password" required={true} placeholder="Current Password" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="password" required={true} placeholder="New Password" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group h6">
                                <input className="w3-input w3-border" type="password" required={true} placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
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