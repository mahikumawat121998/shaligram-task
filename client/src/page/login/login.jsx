import { useState, useEffect } from "react";
import "../../app.css";
import FormInput from "../../components/FormInput";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLogin } from "../../redux/slices/loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const { apiState, message, token } = useSelector((state) => state.login);
  const loading = apiState === "loading" ? true : false;
  useEffect(() => {
    if (apiState === "success" && token) {
      navigate("/room");
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
      enqueueSnackbar("Signup successfully", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
          autoHideDuration: 3000,
          variant: "error",
        },
      });
    }
    return () => {
      dispatch(resetLogin());
    };
  }, [apiState, token]);
  const [values, setValues] = useState({
    username: "",

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
      name: "password",
      type: "text",
      placeholder: "password",
      errorMessage: "Please Provide Password ",
      label: "Password",
      required: true,
    },
  ];
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("values", values);
    dispatch(login({ values }));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <form onSubmit={handleSignUp}>
        <h1>Please Login </h1>
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

export default Login;
