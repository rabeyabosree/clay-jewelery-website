import React, { useState } from 'react'
import { CiLock } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleForgetPassword = async () => {
    try {
      const res = await dispatch(forgetPassword({ email })).unwrap();
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      console.error("Forget Password Failed:", error);
      // Optionally show error toast/message here
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-4xl text-blue-600">
            <CiLock />
          </div>
          <h1 className="text-2xl font-semibold">Forgot Password?</h1>
          <p className="text-gray-600 text-sm">
            Enter your email address and we’ll send you a link to reset your password.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <button onClick={handleForgetPassword} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
