import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SignUpService from "../../api/signupApi";

const initialState = {
  apiState: "",
  message: "",
};

export const signUp = createAsyncThunk(
  "signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await SignUpService.signUp(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUp: (state) => {
      state.message = "";
      state.apiState = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      state.apiState = "loading";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.apiState = "success";
      state.message = action?.payload?.message || "User created successfully";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.apiState = "error";
      state.message =
        action?.payload?.message ||
        action?.error?.message ||
        "Something went wrong";
    });
  },
});

const { actions, reducer } = signUpSlice;
export const { resetSignUp } = actions;
export default reducer;