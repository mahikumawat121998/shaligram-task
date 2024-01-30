import { useState, useEffect } from "react";
import "../../app.css";
import { snackbarConfig } from "../../utils/index";
import FormInput from "../../components/FormInput";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetBooking, booking } from "../../redux/slices/bookingSlice";
const Room = () => {
  const dispatch = useDispatch();
  const { apiState, message } = useSelector((state) => state.signUp);

  const loading = apiState === "loading" ? true : false;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    customerName: "",
    customerEmail: "",
    bookingDate: "",
    bookingType: "",
    bookingSlot: "",
    bookingTime: "",
  });
  const inputs = [
    {
      id: 1,
      name: "customerName",
      type: "text",
      placeholder: "customerName",
      label: "customerName",
      required: true,
    },
    {
      id: 2,
      name: "bookingDate",
      type: "date",
      placeholder: "bookingDate",
      errorMessage: "Please Provide Booking date",
      label: "bookingDate",
      required: true,
    },
    {
      id: 3,
      name: "bookingType",
      type: "text",
      placeholder: "bookingType",
      errorMessage: "Please Provide bookingType",
      label: "bookingType",
      required: true,
    },
    {
      id: 4,
      name: "customerEmail",
      type: "email",
      placeholder: "customerEmail",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 5,
      name: "bookingSlot",
      type: "text",
      placeholder: "bookingSlot",
      errorMessage: "Please Provide bookingSlot ",
      label: "bookingSlot",
      required: true,
    },
    {
      id: 6,
      name: "bookingTime",
      type: "text",
      placeholder: "bookingTime",
      errorMessage: "Please Provide bookingTime ",
      label: "bookingTime",
      required: true,
    },
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    dispatch(booking({ values }));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <form onSubmit={handleBooking}>
        <h1>Please Book Your Room</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Room;
