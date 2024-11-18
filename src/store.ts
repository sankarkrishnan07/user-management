import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
