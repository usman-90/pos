import NavBar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../functions/inventory";
import { ToastContainer } from "react-toastify";
import { fetchBasicInfo } from "../functions/settings";

const Layout = ({ children }) => {
  const { refetch, data } = useQuery(["fetchInventory"], fetchInventory);
  const basicInfo = useQuery(["basicInfo"], fetchBasicInfo);
  const refetchBasicInfo = basicInfo?.refetch;
  const basicInfoData = basicInfo?.data?.data?.row;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [data]);
  return (
    <div>
      <ToastContainer />
      <NavBar />
      {children}
      <Outlet context={[data?.data?.result ?? [], refetch, basicInfoData]} />
      <Footer />
    </div>
  );
};
export default Layout;
