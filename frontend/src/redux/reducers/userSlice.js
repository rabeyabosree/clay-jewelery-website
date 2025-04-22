import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/users";



// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Forgot Password
export const forgetPassword = createAsyncThunk(
  'auth/forget-password',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify Reset Code
export const verifyCode = createAsyncThunk(
  'auth/verify-code',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-code`, { email, code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Reset New Password 
export const resetNewPassword = createAsyncThunk(
  'auth/reset-password',
  async (newData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, newData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//ger user activity
export const createActivity = createAsyncThunk(
  "products/createProduct",
  async ({ action, details }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/activity`, // Backend endpoint
        { action, details },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete User
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete`, {
        withCredentials: true
      });
      localStorage.removeItem("auth");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete account");
    }
  }
);

const userFromStorage = JSON.parse(localStorage.getItem("auth"));
const initialState = {
  user: userFromStorage || null,
  loading: false,
  error: null,
  message: "",
  activity: [],
  
};
console.log(initialState.user)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("auth", JSON.stringify(action.payload.user));
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "OTP sent to email";
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "OTP Verified";
        state.error = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetNewPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Password reset successfully";
        state.error = null;
      })
      .addCase(resetNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.message = action.payload.message || "Account deleted";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

