import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  getUserData,
  updateUser,
} from "../../services/apiUsers";

interface UserState {
  users: any;
  searchBy: string;
  curPage: number;
  status: "idle" | "loading" | "error";
  view: "table" | "card";
  error: string;
}

const initialState: UserState = {
  users: {},
  searchBy: "",
  curPage: 1,
  status: "idle",
  view: "table",
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeView(state, action) {
      state.view = action.payload;
      state.curPage = 1;
    },
    setSearchBy(state, action) {
      state.searchBy = action.payload;
      state.curPage = 1;
    },
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.name}`;
      })
      .addCase(createUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.users.data = [action.payload, ...state.users.data];
        state.status = "idle";
      })
      .addCase(createUserThunk.rejected, (state,action) => {
        state.status = "error";
        state.error = `${action.error.name}`;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.users.data = state.users.data.map((user: any) =>
          user.id === action.payload.id ? { user, ...action.payload } : user
        );
        state.status = "idle";
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.name}`;
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users.data = state.users.data.filter(
          (user: any) => user.id !== action.payload
        );
        state.status = "idle";
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.name}`;
      });
  },
});

export const fetchUserData = createAsyncThunk(
  "users/fetchAllUserData",
  async function () {
    return await getUserData();
  }
);

export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async function (user: any) {
    return await createUser(user);
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async function (user: any) {
    return await updateUser(user);
  }
);
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async function (id: string) {
    await deleteUser(id);
    return id;
  }
);

export const { changeView, setSearchBy, setCurPage } = userSlice.actions;

export default userSlice.reducer;
