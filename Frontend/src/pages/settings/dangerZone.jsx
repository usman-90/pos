import Modal from "../../components/modal/modal";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../functions/settings";
import { useNavigate } from "react-router-dom";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const DangerZone = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      navigate("/auth/login");
      toast.success("Accounted Deleted Successfully! ");
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    },
    onError: () => {
      toast.error("Ops Error! Account could not be deleted.");
    },
  });

  if (mutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="shadow bg-dzone px-4 pb-4 mt-5 rounded mb-0 b-red">
      {" "}
      <h1 className="font-primary text-danger mb-0 py-3">Danger Zone !</h1>
      <div>
        <h2 className="font-primary text-danger"> Delete Account</h2>
        <p className="text-dark font-primary">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={() => {
            setShowDeleteModal(true);
          }}
          className="btn btn-danger"
        >
          Delete Account
        </button>
      </div>
      {showDeleteModal && (
        <Modal>
          <section className="bg-bggray rounded p-4 h_20rem">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-black font-primary pe-4">Are You Sure? </h1>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setShowPass(false);
                  }}
                  className="text-dark btn-close border-0 bg-bggray fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <div>
                <p className="fs-5 my-2 font-primary">
                  All your shop data will be permanently deleted.
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={() => {
                      setShowPass(true);
                    }}
                    className="btn btn-danger gradient-red px-5 mx-3"
                  >
                    Yes
                  </button>
                  <button
                    className="px-5 btn gradient-button mx-3"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setShowPass(false);
                    }}
                  >
                    No
                  </button>
                </div>
                {showPass && (
                  <>
                    {" "}
                    <h2 className="text-dgreen mt-4">Enter Your Password</h2>
                    <input
                      type="password"
                      className="mb-3 py-2 w-100 px-2"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          if (password === "") {
                            toast.error("Password cant be empty!");
                            return;
                          }
                          mutation.mutate({ password });
                        }}
                      >
                        Confirm
                      </button>
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DangerZone {...props} />
    </ErrorBoundary>
  );
}
