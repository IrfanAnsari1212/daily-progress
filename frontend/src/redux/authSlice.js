import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const savedUser = JSON.parse(localStorage.getItem("progressforge_user") || "null");
const persist = ({ token, user }) => {
  localStorage.setItem("progressforge_token", token);
  localStorage.setItem("progressforge_user", JSON.stringify(user));
  return user;
};

export const login = createAsyncThunk("auth/login", async (values, { rejectWithValue }) => {
  try { return persist((await api.post("/auth/login", values)).data); }
  catch (error) { return rejectWithValue(error.response?.data?.message || "Unable to log in"); }
});
export const register = createAsyncThunk("auth/register", async (values, { rejectWithValue }) => {
  try { return persist((await api.post("/auth/register", values)).data); }
  catch (error) { return rejectWithValue(error.response?.data?.message || "Unable to register"); }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser, loading: false, error: "" },
  reducers: { logout: (state) => { localStorage.removeItem("progressforge_token"); localStorage.removeItem("progressforge_user"); state.user = null; } },
  extraReducers: (builder) => builder
    .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = ""; })
    .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"), (state, action) => { state.loading = false; state.user = action.payload; })
    .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; })
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
