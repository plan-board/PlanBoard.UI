import { useState } from "react";
import { SHOW_TOAST } from "../store/constant/types";
import axiosInstance from "../auth/api";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const { AuthData } = useSelector((state) => state.auth);
    console.log("🚀 ~ file: App.js:44 ~ App ~ AuthData:", AuthData);
    const initialFormData = { 
        newPassword: '',
        confirmPassword: '',
    };


    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(initialFormData);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.log("-ss");
        e.preventDefault();

        try {
            if (formData.newPassword !== formData.confirmPassword) {
                setError("New Password and Confirm Password do not match.");
                return;
            }

            const payload = {
                Token: localStorage.getItem("access_token"),
                employee_code: AuthData?.Data[0].EmployeeCode,
                employee_email: AuthData?.Data[0].EmployeeEmail,
                password: formData.confirmPassword,
            };
            const response = await axiosInstance.post(
                "SetEmployeePassword",
                payload
            );
            console.log("=====Update pass====", response);
            if (response?.status === 200 && response?.data?.Status === true) {
                setMsg("Password changed successfully.");
                setError('');
                resetForm();
            } else {
                setError(response?.data?.Message)
            }
        } catch (error) {
            // Handle errors
            setError('Something went wrong')
            dispatch({ type: SHOW_TOAST, payload: error.message });
        }
    }
    const resetForm = () => {
        setFormData(initialFormData);
    };


    return (
        <div className="main">
            <div className="w3-row">
                <span className="main-title">Shalimar Paints Limited   </span>
            </div>
            <div className="wrapper">
                <div className="login-box">
                    <h4>Change Password</h4>
                    <div className="tbl-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group h6">
                                <input
                                    readOnly={true}
                                    className="w3-input w3-border"
                                    type="text"  
                                    placeholder="Current Password"
                                    value={AuthData?.Data[0].EmployeeEmail} 
                                />
                            </div>
                            <div className="form-group h6">
                                <input
                                    className="w3-input w3-border"
                                    type="password"
                                    name="newPassword"
                                    required={true}
                                    placeholder="New Password"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group h6">
                                <input
                                    className="w3-input w3-border"
                                    type="password"
                                    name="confirmPassword"
                                    required={true}
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group w3-small h6 "></div>
                            <div className="form-group m-0">
                                <button type="submit">Submit</button>
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
        </div>
    )
}

export default ChangePassword 