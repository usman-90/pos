import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import LoginSignup from "./pages/login/auth";
import LoginFrame from "./pages/login/loginFrame";
import SignupFrame from "./pages/login/signupFrame";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import VendorPage from "./pages/vendor/vendor";
import Inventory from "./pages/inventory/invemtory";
import Customer from "./pages/customer/customer";
import SettingsLayout from "./pages/settings/settingsLayout";
import BasicInfo from "./pages/settings/settings";
import AccountSettings from "./pages/settings/accSettings";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/auth" element={<LoginSignup />}>
            <Route path="login" element={<LoginFrame />} />
            <Route path="signup" element={<SignupFrame />} />
          </Route>
          <Route path="/pos" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vendor" element={<VendorPage />} />
            <Route path="customer" element={<Customer />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route path="basicinfo" element={<BasicInfo />} />
              <Route path="accsettings" element={<AccountSettings />} />
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
