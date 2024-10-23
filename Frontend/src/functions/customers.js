import axios from "axios";

export const addCustomer = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://macworlds-pos.vercel.app/api/customer", data, {
    headers: {
      authorization: bearer,
    },
  });
};

//fetch inventory
export const fetchCustomers = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const setNo = queryKey[1];
  let query = "aisPsqSjMUDTj387Ol";
  if (queryKey[2] !== "") {
    query = queryKey[2];
  }

  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/customer/${setNo}/${query}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );

  return res;
};

export const updateInventory = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put(`https://macworlds-pos.vercel.app/api/product/${id}`, data, {
    headers: {
      authorization: bearer,
    },
  });
};

export const deleteInventory = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://macworlds-pos.vercel.app/api/product/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};

export const editnewcustomer = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "bearer " + token;
  return axios.put(`https://macworlds-pos.vercel.app/api/customer/${id}`, data, {
    headers: {
      authorization: bearer,
    },
  });
};
export const deleteSingleCustomer = (data) => {
  const id = data._id;
  console.log(id);
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://macworlds-pos.vercel.app/api/customer/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
