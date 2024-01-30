import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../api/loginApi";

const initialState = {
  apiState: "",
  token: null,
  message: "",
};

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await LoginService.login(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.token = null;
      state.message = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
    },
    resetLogin: (state) => {
      state.message = "";
      state.apiState = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.apiState = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.apiState = "success";
      state.token = action.payload;
      state.message = action?.payload?.message || "User logged in successfully";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.apiState = "error";
      state.message =
        action?.payload?.message ||
        action?.error?.message ||
        "Something went wrong";
    });
  },
});

const { actions, reducer } = loginSlice;
export const { logOutUser, resetLogin } = actions;
export default reducer;