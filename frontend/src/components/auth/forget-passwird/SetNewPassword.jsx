import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetNewPassword } from '../../../redux/reducers/userSlice';

function SetNewPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return setMessage("Passwords do not match");
        }

        try {
            const res = await dispatch(resetNewPassword({
                email: state.email,
                newPassword
            }));

                setMessage("Password reset successful!");
                navigate('/login'); // or wherever you want
           
        } catch (error) {
            setMessage("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold">Set New Password</h2>
                    <p className="text-gray-600 text-sm">Create a strong new password for your account.</p>
                </div>

                <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Save Password
                    </button>
                </form>

                {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
            </div>
        </div>
    )
}

export default SetNewPassword;

