import { useState } from "react";
import { SHOW_TOAST } from "../store/constant/types";
import axiosInstance from "../auth/api";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
    const dispatch = useDispatch();

    const initialFormData = {
        currentPassword: '',
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

            const getUser = await axiosInstance.post(
                "GetEmployeeData",
                { Token: localStorage.getItem("access_token") }
            );
            console.log("=====getUser====", getUser);
            if (getUser?.status !== 200) {
                setError('Something went wrong!')
            } else {
                const payload = {
                    Token: localStorage.getItem("access_token"),
                    employee_code: getUser?.data.employee_code,
                    employee_email: getUser?.data.employee_email,
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
                                    className="w3-input w3-border"
                                    type="password"
                                    name="currentPassword"
                                    required={true}
                                    placeholder="Current Password"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
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