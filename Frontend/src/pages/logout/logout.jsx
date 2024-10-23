import { useNavigate } from "react-router-dom";

const Logout = ({ setlogoutmodal }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/auth/login");
  };
  return (
    <>
      <section className="bg-bggray rounded p-5">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="text-black">Are you sure you want to logout?</h4>
            </div>

            <button
              onClick={() => setlogoutmodal(false)}
              className="text-dark btn-close ms-4 border-0 bg-bggray fs-4"
              type="button"
              aria-label="Close"
            ></button>
          </div>
          <hr className="horizontal-line" />
          <div className="d-flex justify-content-around">
            <button
              onClick={logout}
              className="btn btn-danger gradient-red fs-5 px-5"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setlogoutmodal(false);
              }}
              className="btn gradient-button text-light px-5 fs-5"
            >
              No
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Logout;
