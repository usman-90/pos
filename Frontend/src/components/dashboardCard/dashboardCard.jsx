import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import "./dashboardCard.css";

const DashboardCard = ({ heading, data, theme }) => {
  const colors = {
    c1: {
      clr: "#65C9A5",
      box_shadow: "0px 15px 25px 10px #65C9A540",
    },
    c2: {
      clr: "#8F4DEA",
      box_shadow: "0px 15px 25px 10px #8F4DEA40",
    },
    c3: {
      clr: "#583BEE",
      box_shadow: "0px 15px 25px 10px #583BEE40",
    },
  };
  return (
    <div
      className={`m-3 w-card dash_card cursor-pointer bg-bggray rounded p-3 d-flex flex-column`}
      style={{ boxShadow: colors[theme].box_shadow }}
    >
      <div class="d-flex">
        <div>
          <h2 className="text-dark font-primary fs-5 my-2">{heading}</h2>
          <p
            className="fs-5 font-primary fw-bold fs-4 my-3"
            style={{ color: colors[theme].clr }}
          >
            ${data}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
