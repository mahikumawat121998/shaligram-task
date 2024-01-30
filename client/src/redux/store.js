import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import signUpReducer from "./slices/signUpSlice";
import bookingReducer from "./slices/bookingSlice"



const reducer = {
  login: loginReducer,
  signUp: signUpReducer,
  booking:bookingReducer
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
