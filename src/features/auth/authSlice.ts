import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../../services/apiAuth";
import toast from "react-hot-toast";

interface AuthState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "error";
  email: string;
  token: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: "idle",
  email: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    autoLogin: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.status = "idle";
        state.email = action.meta.arg.email;
        state.token = action.payload.token;
        toast.success("Login Successful");
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "error";
        state.isAuthenticated = false;
        toast.error(`${action.error.message}`);
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = "idle";
        state.email = "";
        state.token = "";
        toast.success("Logout Successful");
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "error";
        state.isAuthenticated = true;
        toast.error(`${action.error.message}`);
      });
  },
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async function (creds: any) {
    return await logIn(creds);
  }
);

export const logoutThunk = createAsyncThunk("user/logout", async function () {
  return await logOut();
});

export const { autoLogin } = authSlice.actions;

export default authSlice.reducer;
