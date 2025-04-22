import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../reducers/userSlice'
import product from "../reducers/productSlice";
import cartSlice from "../reducers/cartSlice";
import orderSlice from "../reducers/orderSlice";
import notificationsSlice from './../reducers/notificationSlice';
import adminSlice from "./../reducers/adminSlice"

export const store = configureStore({
    reducer: {
        user : userSlice,
        products: product,
        admin: adminSlice,
        cart: cartSlice,
        orders: orderSlice,
        notifications: notificationsSlice
    }
})