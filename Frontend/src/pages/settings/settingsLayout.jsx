import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBasicInfo } from "../../functions/settings";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";

const SettingsLayout = ({ children }) => {
  const { data, isLoading } = useQuery(["basicInfo"], fetchBasicInfo);
  const [basicInfo, setBasicInfo] = useState({});
  console.log(basicInfo);
  useEffect(() => {
    setBasicInfo(data?.data?.row ?? []);
  }, [data]);
  const loc = useLocation();
  const pathName = loc.pathname;
  if (isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
  return (
    <div className="container settings_main">
      <div>
        <h1 className="font-primary text-dark">Settings</h1>
      </div>
      <div className="d-flex set-mob me-4 my-4">
        <div className="bg-bggray setnav-mob text-dgreen rounded snav_h shadow mw-25">
          <div>
            <div className="my-4">
              <Link to={"/pos/settings/basicinfo"}>
                <li
                  className={`${
                    pathName === "/pos/settings/basicinfo" ? "bg_sl" : "bg-gray"
                  } my-2 fs-5 text-black s_hover py-2 ps-3 w-100 h-100`}
                >
                  Basic Info
                </li>
              </Link>
              <Link to={"/pos/settings/accsettings"}>
                <li
                  className={`${
                    pathName === "/pos/settings/accsettings"
                      ? "bg_sl "
                      : "bg-gray"
                  } my-2 fs-5 text-black s_hover py-2 ps-3 w-100 h-100`}
                >
                  Account Settings
                </li>
              </Link>
            </div>
          </div>
        </div>
        <Outlet context={[basicInfo, setBasicInfo]} />
      </div>
    </div>
  );
};

export default SettingsLayout;
