import axios from "axios";

const login = (payload) => {
  return axios.post(`http://localhost:8800/api/auth/login`, payload.values);
};

const LoginService = {
  login,
};

export default LoginService;
