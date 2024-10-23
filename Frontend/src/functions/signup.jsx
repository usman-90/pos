//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  return axios.post("https://macworlds-pos.vercel.app/user", data);
};
