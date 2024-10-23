import axios from "axios";

export const fetchDashboardData = async ({ queryKey }) => {
  const year = queryKey[1];
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/dashboard/getstates/${year}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
  console.log(res);
  return res;
};

export const fetchMonthStates = async ({ queryKey }) => {
  const month = queryKey[1];
  const year = queryKey[2];

  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://macworlds-pos.vercel.app/api/dashboard/getprofit/${month}/${year}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
  return res;
};
export const fetchYears = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("https://macworlds-pos.vercel.app/api/dashboard/years", {
    headers: {
      authorization: bearer,
    },
  });
  return res;
};
