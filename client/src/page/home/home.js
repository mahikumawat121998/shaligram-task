import { useState, useEffect } from "react";
import "../../app.css";
import { snackbarConfig } from "../../utils/index";
import FormInput from "../../components/FormInput";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSignUp, signUp } from "../../redux/slices/signUpSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { apiState, message } = useSelector((state) => state.signUp);
 
  const loading = apiState === "loading" ? true : false;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("login")
    if (apiState === "success") {
      console.log("login1",apiState)
      navigate("/login");
      enqueueSnackbar("Signup successfully", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
          autoHideDuration: 3000,
          variant: "success",
        },
      });
    }
    if (apiState === "error") {
      enqueueSnackbar(message, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
          autoHideDuration: 3000,
          variant: "error",
        },
      });
    }
    return () => {
      dispatch(resetSignUp());
    };
  }, [apiState]);
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "Please Provide First Name",
      label: "first Name",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "last Name",
      errorMessage: "Please Provide First Name",
      label: "Last Name",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 5,
      name: "password",
      type: "text",
      placeholder: "password",
      errorMessage: "Please Provide Password ",
      label: "Last Name",
      required: true,
    },
  ];

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp({ values }));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
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

export default Home;
