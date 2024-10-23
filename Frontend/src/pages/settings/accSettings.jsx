import { TextField } from "@mui/material";
import DangerZone from "./dangerZone";
import { useOutletContext } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postEmail, resetPassword } from "../../functions/settings";
import { useState } from "react";
import { validatePass, checkPass } from "../../helpers/validate";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const [basicInfo, setBasicInfo] = useOutletContext();
  const [resetPass, setResetPass] = useState({
    newPass: "",
    confirmPass: "",
  });
  const mutationPass = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: () => {
      toast.error("Ops error! Password could not be changed.");
    },
  });
  const mutation = useMutation({
    mutationFn: postEmail,
    onSuccess: () => {
      toast.success("Email Saved successfully!");
    },
    onError: () => {
      toast.error("Ops error! Email could not be Saved.");
    },
  });

  if (mutation.isLoading || mutationPass.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  };
  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setResetPass({ ...resetPass, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(basicInfo);
  };
  console.log(basicInfo);
  return (
    <div className="mms-4 bg-bggray rounded shadow mw-75">
      <h2 className="m-4 font-primary text-dark">Account Settings</h2>
      <div className="mx-4">
        <div className="d-flex flex-column my-3">
          <h3 className="font-primary text-dark">Email</h3>
          <TextField
            value={basicInfo?.username}
            onChange={(e) => {
              handleChange(e);
            }}
            focused={basicInfo?.username !== ""}
            className="bg-white rounded shadow w-100"
            id="outlined-search"
            name="username"
            label="Email"
            type="search"
          />
        </div>
        <div className="d-flex justify-content-center mt-4 ">
          <button
            onClick={submit}
            className="btn px-5 py-2 gradient-button shadow fs-5 bg-dgreen text-light"
          >
            {" "}
            Save
          </button>
        </div>
        <div className="d-flex flex-column justify-content-around my-3">
          <h3 className="font-primary text-dark">Reset Password</h3>
          <TextField
            value={resetPass.newPass}
            onChange={handlePassChange}
            className="bg-white rounded shadow w-100 my-2"
            id="outlined-search"
            name="newPass"
            label="New Password"
            type="password"
          />
          <p
            className={`text-danger ${
              validatePass(resetPass.newPass) ? "d-none" : "d-block"
            } `}
          >
            Passwords must be atleast 8 characters long.
          </p>
          <TextField
            value={resetPass.confirmPass}
            onChange={handlePassChange}
            className="bg-white rounded shadow w-100 my-2"
            id="outlined-search"
            name="confirmPass"
            label="Confirm Password"
            type="password"
          />
          <p
            className={`text-danger ${
              checkPass(resetPass.newPass, resetPass.confirmPass)
                ? "d-none"
                : "d-block"
            }`}
          >
            Passwords must match.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 mb-4">
        <button
          className="btn px-5 py-2 gradient-button shadow fs-5 bg-dgreen text-light"
          onClick={() => {
            if (
              !validatePass(resetPass.newPass) ||
              !checkPass(resetPass.confirmPass, resetPass.newPass)
            ) {
              alert("Passwords Dont match!");
              return;
            }
            mutationPass.mutate({ password: resetPass.newPass });
            setResetPass({ ...resetPass, newPass: "" });
            setResetPass({ ...resetPass, confirmPass: "" });
          }}
        >
          {" "}
          Save
        </button>
      </div>
      <DangerZone />
    </div>
  );
};

export default AccountSettings;
