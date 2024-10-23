import "./sidebar.css";
import userImage from "../../../assets/Ellipse 5.png";
import SideBar from "./sidebar";

const NavBar = () => {
  const name = localStorage.getItem("name");
  return (
    <div>
      <SideBar />
      <nav className="d-flex bg-dgray justify-content-between align-items-center py- my-55 mb-5 text-light">
        <div className="ms-5 nav-user-pic">
          <div>
            <img src={userImage} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-around me-5">
          <img src="" alt="" />
          <h5 className="px-4 fs-4 text-dark">
            Hi, <span className="x-font text-dark">{name ?? ""}</span>
          </h5>
          <div className="background_hm bg-yello">
            <button
              className="menu__icon hmbtn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <span className="bg-dark"></span>
              <span className="bg-dark"></span>
              <span className="bg-dark"></span>
            </button>
          </div>
        </div>
      </nav>
      <div className="my-3"></div>
    </div>
  );
};

export default NavBar;
