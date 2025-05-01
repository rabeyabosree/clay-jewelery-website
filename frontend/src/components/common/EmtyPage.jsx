import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock, FaCode } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/reducers/userReducer';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // State to store form data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleRegister = (e) => {
    try {
      e.preventDefault();
      const userData = { username, email, password };
      dispatch(registerUser(userData));
      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/");
      alert("Registered successfully");
    } catch (error) {
      console.error(error)
    }
  };
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-2xl overflow-hidden">

        {/* Left Side */}
        <div className="bg-green-500 text-white flex flex-col justify-between p-6 md:p-8 w-full md:w-[40%]">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <FaCode />
            <span>Webloom</span>
          </div>

          {/* Main Text */}
          <h2 className="text-2xl font-bold mb-4 leading-snug">
            Let's Setup <br /> Your Profile <br /> With Us.
          </h2>
          <p className="text-sm text-white/80">
            All in one solution for your business in one place. Spend a few minutes to quickly onboard your account.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[60%] flex justify-center items-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6">Create an account</h3>
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>

              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Set username
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Set email
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Set password
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Forgot Password */}
              <div className="text-right text-sm">
                <Link to="/forgot-password" className="text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Register
              </button>

              {/* OR Divider */}
              <div className="flex items-center gap-2 my-5">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FcGoogle size={22} />
                <span>Sign up with Google</span>
              </button>

              {/* Bottom Login Link */}
              <p className="text-center text-sm mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:underline">Login</Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;
