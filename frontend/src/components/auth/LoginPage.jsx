import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { loginUser } from "../../redux/reducers/userSlice";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user || "");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (error) {
      dispatch({ type: 'user/clearError' }); // Reset error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Wait for login to complete
    const loginResult = await dispatch(loginUser(loginData));

    // Check if login is successful (fulfilled action)
    if (loginUser.fulfilled.match(loginResult)){

      alert("Login successful");
      navigate("/");
    } else {
      // Handle failed login
      alert("Login failed");
      console.error(loginResult.payload); // Log the error for debugging
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
            aria-label="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
            aria-label="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm text-center mt-2">{error.message}</p>}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/forget-password")}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;