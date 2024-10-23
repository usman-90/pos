import axios from "axios";
//mutattion
export const postbasicinfo = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  console.log(bearer);
  return axios.put("https://macworlds-pos.vercel.app/api/basicinfo", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//query react

export const fetchBasicInfo = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("https://macworlds-pos.vercel.app/api/basicinfo", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const postEmail = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put("https://macworlds-pos.vercel.app/api/basicinfo/email", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const resetPassword = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put("https://macworlds-pos.vercel.app/api/basicinfo/password", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAccount = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://macworlds-pos.vercel.app/api/deleteaccount", data, {
    headers: {
      authorization: bearer,
    },
  });
};
