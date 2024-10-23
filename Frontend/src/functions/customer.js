import axios from "axios";

export const postCustomerReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://macworlds-pos.vercel.app/api/customerinvoice", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCustomerReceipt = async ({ queryKey }) => {
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
  console.log(offSet);
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/customerinvoice/${offSet}/${query}/${todate}/${fromdate}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("vendor invoked");
  console.log(res);

  return res;
};

export const deleteCustomerReceipt = (data) => {
  const { id } = data;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://macworlds-pos.vercel.app/api/customerinvoice/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
