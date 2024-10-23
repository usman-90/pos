import axios from "axios";

export const postVendorReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://macworlds-pos.vercel.app/api/vendor", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchVendorReceipts = async ({ queryKey }) => {
  const offSet = queryKey[1];
  let query = "aisPsqSjMUDTj387Ol";
  let todate = "none";
  let fromdate = "none";
  if (queryKey[2] !== "") {
    query = queryKey[2];
  }
  if (queryKey[3] && queryKey[4]) {
    fromdate = queryKey[3];
    todate = queryKey[4];
  }
  // console.log(offSet);
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/vendor/${offSet}/${query}/${todate}/${fromdate}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
  console.log("vendor invoked");
  console.log(res);
  return res;
};

export const deleteVendorReceipt = (data) => {
  const { id } = data;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://macworlds-pos.vercel.app/api/vendor/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};

export const fetchNewVendors = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const setNo = queryKey[1];
  let query = "aisPsqSjMUDTj387Ol";
  if (queryKey[2] !== "") {
    query = queryKey[2];
  }

  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/newvendor/${setNo}/${query}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );

  return res;
};

export const addNewVendor = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://macworlds-pos.vercel.app/api/newvendor", data, {
    headers: {
      authorization: bearer,
    },
  });
};

export const deleteSingleVendor = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://macworlds-pos.vercel.app/api/newvendor/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};



export const editnewvendor = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "bearer " + token;
  return axios.put(`https://macworlds-pos.vercel.app/api/newvendor/${id}`, data, {
    headers: {
      authorization: bearer,
    },
  });
};
