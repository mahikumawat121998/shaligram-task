import axios from "axios";

const signUp = (payload) => {
  console.log("payload", payload.values);
  return axios.post(`http://localhost:8800/api/auth/register`, payload.values);
};

const SignUpService = {
  signUp,
};

export default SignUpService;
