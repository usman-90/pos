//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  // console.log("invoked");
  return axios.post("https://macworlds-pos.vercel.app/user", data);
};
export const login = (data) => {
  return axios.post("https://macworlds-pos.vercel.app/signin", data);
};
