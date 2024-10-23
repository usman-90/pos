import "./sidebar.css";
import Dashboard from "../../../assets/Dashboard.png";
import invoicepng from "../../../assets/invoice.png";
import settings from "../../../assets/user.png";
import inventory from "../../../assets/inventory-management.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../../pages/logout/logout.jsx";
import {
  faCartPlus,
  faRightFromBracket,
  faChartLine,
  faFileInvoice,
  faWarehouse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal3 from "../modal/modal3";

const SideBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const pathName = location.pathname;
  const [subnavbar, setsubnavbar] = useState(false);
  const [logoutmodal, setlogoutmodal] = useState(false);
  return (
    <>
      <div
        className="offcanvas offcanvas-start bg-white text-black font-primary"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <FontAwesomeIcon icon={faCartPlus} /> POS System
          </h4>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <div>
            <Link to={"/pos/dashboard"}>
              <div
                className={`${
                  pathName === "/pos/dashboard" ? "bg-hover " : ""
                } h-3rem d-flex align-items-center cursor-pointer font-primary opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <img
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                    src={Dashboard}
                  />
                  <span className="ms-3">Dashboard</span>
                </p>
              </div>
            </Link>
            <div
              className={` h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              onClick={() => setsubnavbar(!subnavbar)}
            >
              <p className="ms-4 fs-5 side">
                <img
                  style={{
                    width: "2rem",
                    height: "2rem",
                  }}
                  src={invoicepng}
                />
                <span className="ms-3 text-dgray" style={{ color: "#8C8C8C" }}>
                  Receipts{" "}
                </span>
              </p>
            </div>
            <div
              className={`${
                subnavbar === true ? "sidebarexpandopen" : "sidebarexpandclose"
              } mb-2 sidebarmenu`}
            >
              <Link to={"/pos/vendor"}>
                <div
                  className={`${
                    pathName === "/pos/vendor" ? "text-green" : ""
                  } h-3rem ps-6 d-flex align-items-center justify-content-start`}
                >
                  Vendor Receipts
                </div>
              </Link>
              <Link to={"/pos/customer"}>
                <div
                  className={`${
                    pathName === "/pos/customer" ? "text-green" : ""
                  } h-3rem ps-6 d-flex align-items-center justify-content-start`}
                >
                  Customer Receipts
                </div>
              </Link>
            </div>
            <Link to={"/pos/inventory"}>
              <div
                className={`${
                  pathName === "/pos/inventory" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <img
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                    src={inventory}
                  />
                  <span className="ms-3">Stock </span>
                </p>
              </div>
            </Link>
            <Link to={"/pos/settings/basicinfo"}>
              <div
                className={`${
                  pathName === "/pos/settings/basicinfo" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <img
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                    src={settings}
                  />
                  <span className="ms-3">Settings </span>
                </p>
              </div>
            </Link>
          </div>

          <button
            className="in-btn text-black"
            onClick={() => setlogoutmodal(true)}
          >
            <div
              className={`
               h-3rem d-flex align-items-center logout cursor-pointer opt-hover`}
            >
              <p className="ms-4 fs-5 side">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="ms-3">Logout</span>
              </p>
            </div>
          </button>
        </div>
      </div>

      {logoutmodal && (
        <Modal3>
          <Logout setlogoutmodal={setlogoutmodal} />
        </Modal3>
      )}
    </>
  );
};

export default SideBar;
