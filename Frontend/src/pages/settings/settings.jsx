import { TextField } from "@mui/material";
import "./settings.css";
import { useMutation } from "@tanstack/react-query";
import { postbasicinfo } from "../../functions/settings";
import { useOutletContext } from "react-router-dom";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const BasicInfo = () => {
  const [basicInfo, setBasicInfo] = useOutletContext();
  console.log(basicInfo);
  const mutation = useMutation({
    mutationFn: postbasicinfo,
    onSuccess: () => {
      toast.success("Info saved successfully! ");
    },
    onError: () => {
      toast.error("Ops error! Info could not be saved");
    },
  });
  if (mutation.isLoading) {
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

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(basicInfo);
  };
  return (
    <div className="mms-4 bg-bggray rounded shadow mw-75">
      <h2 className="m-4 font-primary text-dark">Basic Info</h2>
      <div>
        <div className="d-flex fd-c justify-content-around mmy-3">
          <TextField
            value={basicInfo?.shopName}
            focused={basicInfo?.shopName && basicInfo?.shopName !== ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="shopName"
            label="Shop Name"
            type="search"
          />
          <TextField
            value={basicInfo?.name}
            focused={basicInfo?.name && basicInfo?.name !== ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="name"
            label="Name"
            type="search"
          />
        </div>
        <div className="d-flex fd-c justify-content-around mmy-5">
          <TextField
            focused={basicInfo?.shopAdd && basicInfo?.shopAdd !== ""}
            value={basicInfo?.shopAdd}
            onChange={(e) => {
              handleChange(e);
            }}
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="shopAdd"
            label="Shop Address"
            type="search"
          />
          <TextField
            value={basicInfo?.contactNo}
            focused={basicInfo?.contactNo && basicInfo?.contactNo !== ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="contactNo"
            label="Shop Contact No"
            type="search"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={submit}
          className="btn px-5 py-2 shadow fs-5 gradient-button font-primary text-dark"
        >
          {" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
