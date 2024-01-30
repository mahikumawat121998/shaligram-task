import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookingService from "../../api/bookingApi";

const initialState = {
  apiState: "",
  message: "",
};

export const booking = createAsyncThunk(
  "booking",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await BookingService.booking(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBooking: (state) => {
      state.message = "";
      state.apiState = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(booking.pending, (state, action) => {
      state.apiState = "loading";
    });
    builder.addCase(booking.fulfilled, (state, action) => {
      state.apiState = "success";
      state.message = action?.payload?.message || "Booking Successfully";
    });
    builder.addCase(booking.rejected, (state, action) => {
      state.apiState = "error";
      state.message =
        action?.payload?.message ||
        action?.error?.message ||
        "Something went wrong";
    });
  },
});

const { actions, reducer } = bookingSlice;
export const { resetBooking } = actions;
export default reducer;
