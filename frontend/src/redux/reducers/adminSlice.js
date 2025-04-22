// redux/reducers/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/admin";

// Thunk: Create Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk: Get All Products
export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// get all users for admin
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data.users; // assuming backend sends { users: [...] }
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// thunk : get all orders for admin
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async(_, { rejectWithValue})=>{
    try {
      const response = await axios.get(`${API_URL}/orders`)
      return response.data;
    } catch (error) {
      console.error("error fetching orders :", error)
      return rejectWithValue(error.response?.data?.message || "something went qrong")
      
    }
  }
)

// Thunk: Get User Details
export const getUsersDetails = createAsyncThunk(
  "admin/getUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk: Get User Activity
export const getUsersActivitys = createAsyncThunk(
  "admin/getUserActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/activity`, {
        withCredentials: true
      });
      return response.data.activity;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk: Change User Role
export const adminRoleChange = createAsyncThunk(
  "admin/roleChange",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/role`, {
        role,
      });
      return response.data.updatedUser;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    orders: [],
    activityLogs: [],
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUsersActivitys.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsersActivitys.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activityLogs = action.payload
      })
      .addCase(getUsersActivitys.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;