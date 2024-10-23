import { useMutation } from "@tanstack/react-query";
import { deleteSingleCustomer } from "../../functions/customers.js";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const DeleteNewClient = ({ mutation, currCustomer, setdeleteClientModal }) => {
  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(currCustomer);
    setdeleteClientModal(false);
  };
  return (
    <section className="bg-bggray rounded p-5">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="text-black">Are you sure ⁉</h4>
            <p className="fs-5 text-black">
              Client will be deleted permanently!
            </p>
          </div>

          <button
            onClick={() => setdeleteClientModal(false)}
            className="text-dark btn-close ms-4 border-0 bg-bggray fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <hr className="horizontal-line" />
        <div className="d-flex justify-content-around">
          <button
            onClick={submit}
            className="btn btn-danger gradient-red fs-5 px-5"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setdeleteClientModal(false);
            }}
            className="btn gradient-button text-light px-5 fs-5"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteNewClient;
