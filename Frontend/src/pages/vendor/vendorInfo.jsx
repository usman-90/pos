import {
  faArrowLeft,
  faArrowRight,
  faTrash,
  faEye,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import Modal3 from "../../components/modal/modal3.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCustomer, fetchCustomers } from "../../functions/customers.js";
import ClientDesc from "./newclient.jsx";
import DeleteNewClient from "./deleteNewClient.jsx";
import SearchBar from "../../components/searchBar/searchBar.jsx";
import { addNewVendor, fetchNewVendors } from "../../functions/vendorRec.js";

const VendorInfo = ({ setVendorModal, setVendorName }) => {
  const [query, setQuery] = useState("");
  const [setNo, setSetNo] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [deleteClientModal, setdeleteClientModal] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["fetchNewVendors", setNo, query],
    queryFn: fetchNewVendors,
  });
  console.log(data);
  const vendorMutation = useMutation({
    mutationFn: addNewVendor,
    onSuccess: () => {
      toast.success("Vendor created successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Vendor could not be saved");
    },
  });
  const [vendorData, setVendorData] = useState({});

  const [currVendor, setCurrentVendor] = useState({});
  let [curr, setcurr] = useState(1);
  const [customerTab, setCustomerTab] = useState("customer");
  const handleChange = (e) => {
    console.log(vendorData);
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };
  const vendorsData = data?.data ?? [];
  console.log(vendorsData?.totalCount, "hello i am count");
  const headings = [
    "Vendor Name",
    "Gender",
    "Contact no",
    "Email",
    "View",
    "Delete",
  ];
  const submit = () => {
    vendorMutation.mutate(vendorData);
  };
  let pages = Math.ceil(vendorData?.totalCount / 10);

  const next = () => {
    setcurr(curr + 1);
    if (total > data?.length && (curr % 5) + 1 === 1) {
      setSetNo(val + 1);
    }
  };
  const prev = () => {
    setcurr(curr - 1);
    if (total > data?.length && ((curr - 1) % 5) + 1 === 1) {
      setSetNo(val - 1);
    }
  };
  const currData = vendorData?.customers?.slice((curr - 1) * 10, curr * 10);
  console.log(vendorData);

  return (
    <section className="w-100 bg-bggray rounded p-5 bgmodal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-dark fs-3 fw-bold me-4 font-primary">
            Vendor Information
          </h1>
          <button
            onClick={() => setVendorModal(false)}
            className="text-dark btn-close fw-bold border-0 bg-bggray fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <div className="my-3">
          <div className="d-flex">
            <div
              onClick={() => setCustomerTab("vendor")}
              className={`cursor-pointer tableft-radius bg-light ${
                customerTab === "vendor" ? "shadow" : ""
              } px-5 fs-5 font-primary py-2`}
            >
              Vendors
            </div>
            <div
              onClick={() => setCustomerTab("addVendor")}
              className={`bg-light cursor-pointer tabright-radius ${
                customerTab === "vendor" ? "" : "shadow"
              } px-5 fs-5 font-primary py-2`}
            >
              Add Vendor
            </div>
          </div>
          {customerTab === "vendor" ? (
            <div>
              <SearchBar
                className="px-2 my-2"
                value={query}
                setValue={setQuery}
                width={"w-full"}
              />
              <table>
                <thead>
                  <tr className="px-3 py-2 bg-dgray">
                    {headings.map((heading) => {
                      return (
                        <td className="px-5 py-3 font-primary text-dark fs-5">
                          {heading}
                        </td>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="custTableRowBg">
                  {currData?.map((vendor) => {
                    return (
                      <tr style={{ cursor: "pointer" }} className="">
                        <td
                          onClick={() => {
                            setVendorName(vendor.name);
                            setVendorModal(false);
                          }}
                          className="text-center  font-primary py-3 px-3"
                        >
                          {vendor?.name}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {vendor?.gender}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {vendor?.pContact}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {" "}
                          {vendor?.email}
                        </td>

                        <td
                          onClick={() => {
                            setCurrentVendor(vendor);
                            // console.log(customer)
                            setShowVendorModal(true);
                          }}
                          className="text-center fs- font-primary py-3 px-3"
                        >
                          View
                        </td>

                        <td
                          onClick={() => {
                            setdeleteClientModal(true);
                            setCurrentVendor(vendor);
                          }}
                          className="text-danger cursor-pointer text-center fs- font-primary py-3 px-3"
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="font-primary">
                    <td className="p-2 fs-5 text-dark text-center">
                      Total Records : {customersData?.totalCount}
                    </td>
                    <td className="p-2 fs-5 text-dark "></td>
                    <td className="p-2 fs-5 text-dark text-center">
                      Page 1 of {pages}
                    </td>
                    <td className="p-2 text-center"></td>
                    <td className="p-2 text-center"></td>
                    <td>
                      <button
                        disabled={curr === 1}
                        onClick={prev}
                        className="border-0  text-dark px-3 bg-bggray fs-4"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <button
                        disabled={curr === pages}
                        onClick={next}
                        className="border-0  text-dark px-3 bg-bggray  fs-4"
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded px-5 py-5">
              <div className="my-3">
                <TextField
                  value={vendorData.name}
                  name="name"
                  onChange={handleChange}
                  label="Name"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
                <TextField
                  value={vendorData.pContact}
                  onChange={handleChange}
                  type="number"
                  name="pContact"
                  label="Primary Contact"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
              </div>
              <div className="my-3">
                <TextField
                  value={vendorData.address}
                  onChange={handleChange}
                  label="Address"
                  name="address"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
                <TextField
                  value={vendorData.OContact}
                  onChange={handleChange}
                  type="number"
                  name="OContact"
                  label="Other Contact"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
              </div>
              <div className="my-3 d-flex align-items-center">
                <FormControl
                  variant="filled"
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  className="mx-5 w-35"
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={vendorData?.gender}
                    name="gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={vendorData.occupation}
                  onChange={handleChange}
                  label="Occupation"
                  name="occupation"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
              </div>
              <div className="my-3">
                <TextField
                  value={vendorData.email}
                  onChange={handleChange}
                  type="email"
                  label="Email"
                  name="email"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
                <TextField
                  value={vendorData.cnic}
                  onChange={handleChange}
                  name="cnic"
                  label="CNIC"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button
                  onClick={submit}
                  className="gradient-button fs-5 rounded border-0 px-5 font-primary py-1"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showClientModal && (
        <Modal3>
          <ClientDesc
            refetch={refetch}
            setshowClientModal={setshowClientModal}
            currCustomer={currCustomer}
            setcurrCustomer={setcurrCustomer}
          />
        </Modal3>
      )}
      {deleteClientModal && (
        <Modal3>
          <DeleteNewClient
            refetch={refetch}
            setdeleteClientModal={setdeleteClientModal}
            currCustomer={currCustomer}
          />
        </Modal3>
      )}
    </section>
  );
};
export default VendorInfo;
