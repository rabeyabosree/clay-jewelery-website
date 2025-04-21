import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyCode } from '../../../redux/reducers/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function CodeVerification() {
    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;

    const verifyCodeCheck = async () => {
        if (code.length !== 6) {
            return setError("Code must be 6 digits.");
        }

        try {
            const res = await dispatch(verifyCode({ email, code }));  
                navigate("/reset-password", { state: { email } });
        } catch (err) {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold">Enter Verification Code</h2>
                    <p className="text-gray-600 text-sm">We've sent a code to your email. Please enter it below.</p>
                </div>

                <div className="mt-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                
                    <button
                        onClick={verifyCodeCheck}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Verify Code
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CodeVerification;

