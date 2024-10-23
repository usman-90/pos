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
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ClientDesc from "./newclient.jsx";
import DeleteNewClient from "./deleteNewClient.jsx";
import SearchBar from "../../components/searchBar/searchBar.jsx";
import { addCustomer, fetchCustomers,deleteSingleCustomer } from "../../functions/customers.js";
import {
  addNewVendor,
  fetchNewVendors,
  deleteSingleVendor,
} from "../../functions/vendorRec.js";

const CustomerInfo = ({
  clientType,
  setCustomerModal,
  handleClientInfoChange,
}) => {
  const [query, setQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClientModal, setshowClientModal] = useState(false);
  const [deleteClientModal, setdeleteClientModal] = useState(false);
	const [customerData, setCustomerData] = useState({});
	const [currCustomer, setcurrCustomer] = useState({});
	const [customerTab, setCustomerTab] = useState("customer");
  let [curr, setcurr] = useState(1);

  let fetchFucntion = null;
  let postFunction = null;
  let deleteFunction = null;
	let key = "";
  if (clientType === "Customer") {
    fetchFucntion = fetchCustomers;
    postFunction = addCustomer;
    deleteFunction = deleteSingleCustomer;
	  key = "fetchCustomers"
  } else if (clientType === "Vendor") {
    fetchFucntion = fetchNewVendors;
    postFunction = addNewVendor;
    deleteFunction = deleteSingleVendor;
	  key = "fetchVendors"
  }
	console.log(fetchFucntion)
  const { data, refetch } = useQuery({
    queryKey: [key, curr, query],
    queryFn: fetchFucntion,
  });
	useEffect(() => {
		refetch();
	}, [clientType]);
  const customerMutation = useMutation({
    mutationFn: postFunction,
    onSuccess: () => {
      toast.success("Customer created successfully! ");
	    setCustomerData({
		    name:"",
		    pContact:"",
		    address:"",
		    gender:"",
		    OContact:"",
		    occupation:"",
		    email:"",
		    cnic:""
	    })
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Customer could not be saved");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
      refetch();
      toast.success("Client deleted successfully! ");
    },
    onError: () => {
      toast.error("Ops error! Client could not be deleted");
    },
  });
  if (deleteMutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

  console.log(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };
  const clientsData = data?.data ?? [];
  const headings = [
    `${clientType} Name`,
    "Gender",
    "Contact no",
    "Email",
    "View",
    "Delete",
  ];
  const submit = () => {
    customerMutation.mutate(customerData);
    // setCustomerData({})
  };
  let pages = Math.ceil(clientsData?.totalCount / 10);
	console.log(pages,clientsData)
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
  };
  let currData;
  if (clientType === "Customer") {
    currData = clientsData?.customers ?? [];
  } else if (clientType === "Vendor") {
    currData = clientsData?.vendors ?? [];
  }

  return (
    <section className="w-100 bg-bggray rounded p-5 bgmodal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-dark fs-3 fw-bold me-4 font-primary">
            {clientType} Information
          </h1>
          <button
            onClick={() => setCustomerModal(false)}
            className="text-dark btn-close fw-bold border-0 bg-bggray fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <div className="my-3">
          <div className="d-flex">
            <div
              onClick={() => setCustomerTab("customer")}
              className={`cursor-pointer tableft-radius bg-light ${
                customerTab === "customer" ? "shadow" : ""
              } px-5 fs-5 font-primary py-2`}
            >
              {clientType}
            </div>
            <div
              onClick={() => setCustomerTab("addCustomer")}
              className={`bg-light cursor-pointer tabright-radius ${
                customerTab === "customer" ? "" : "shadow"
              } px-5 fs-5 font-primary py-2`}
            >
              Add {clientType}
            </div>
          </div>
          {customerTab === "customer" ? (
            <div>
              <SearchBar
                className="px-2 my-2"
                value={query}
                setValue={setQuery}
                width={"w-full"}
                text={"Search by Name, Email or Contact no."}
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
                  {currData?.map((customer) => {
                    console.log(customer);
                    return (
                      <tr style={{ cursor: "pointer" }} className="">
                        <td
                          onClick={() => {
                            handleClientInfoChange({
                              name: customer?.name,
                              pContact: customer?.pContact,
                              id: customer?._id,
                            });
                            setCustomerModal(false);
                          }}
                          className="text-center  font-primary py-3 px-3"
                        >
                          {customer?.name}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {customer?.gender}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {customer?.pContact}
                        </td>
                        <td className="text-center fs- font-primary py-3 px-3">
                          {" "}
                          {customer?.email}
                        </td>

                        <td
                          onClick={() => {
                            setcurrCustomer(customer);
                            // console.log(customer)
                            setshowClientModal(true);
                          }}
                          className="text-center fs- font-primary py-3 px-3"
                        >
                          View
                        </td>

                        <td
                          onClick={() => {
                            setdeleteClientModal(true);
                            setcurrCustomer(customer);
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
                      Total Records : {clientsData?.totalCount}
                    </td>
                    <td className="p-2 fs-5 text-dark "></td>
                    <td className="p-2 fs-5 text-dark text-center">
                      Page {curr} of {pages}
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
                  value={customerData.name}
                  name="name"
                  onChange={handleChange}
                  label="Name"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
                <TextField
                  value={customerData.pContact}
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
                  value={customerData.address}
                  onChange={handleChange}
                  label="Address"
                  name="address"
                  id="filled-size-small"
                  variant="filled"
                  size="small"
                  className="mx-5"
                />
                <TextField
                  value={customerData.OContact}
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
                    value={customerData?.gender}
                    name="gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={customerData.occupation}
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
                  value={customerData.email}
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
                  value={customerData.cnic}
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
	      clientType={clientType}
            setshowClientModal={setshowClientModal}
            currCustomer={currCustomer}
            setcurrCustomer={setcurrCustomer}
          />
        </Modal3>
      )}
      {deleteClientModal && (
        <Modal3>
          <DeleteNewClient
            mutation={deleteMutation}
            setdeleteClientModal={setdeleteClientModal}
            currCustomer={currCustomer}
          />
        </Modal3>
      )}
    </section>
  );
};
export default CustomerInfo;
