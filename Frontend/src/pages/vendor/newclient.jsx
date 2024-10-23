import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   editnewcustomer } from "../../functions/customers.js";
import {
	editnewvendor,
} from "../../functions/vendorRec.js";
import { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
const ClientAttribute = ({
  handleItemChange,
  isClientEditable,
  currCustomer,
}) => {
  console.log(currCustomer, "hehehehheh");
  return (
    <>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black w-35 mx-2 font-primary fs-4">Name</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.name}</p>
        ) : (
          <input
            name="name"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.name}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black w-35 mx-2 font-primary fs-4">Address</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.address}</p>
        ) : (
          <input
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            name="address"
            onChange={(e) => {
              handleItemChange(e);
            }}
            value={currCustomer?.address}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-4">Gender</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.gender}</p>
        ) : (
          <input
            name="gender"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.gender}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-4">Email</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.email}</p>
        ) : (
          <input
            name="email"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.email}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-4">
          Primary Contact
        </h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.pContact}</p>
        ) : (
          <input
            name="pContact"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.pContact}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-5">
          Other Contact
        </h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.OContact}</p>
        ) : (
          <input
            name="OContact"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.OContact}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-4">Occupation</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.occupation}</p>
        ) : (
          <input
            name="occupation"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.occupation}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-black mx-2 w-35 font-primary fs-4">Cnic</h3>
        {!isClientEditable ? (
          <p className="fs-5 text-wrap w-65">{currCustomer?.cnic}</p>
        ) : (
          <input
            name="cnic"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2 scan-inp"
            type="text"
            value={currCustomer?.cnic}
          />
        )}
      </div>
    </>
  );
};

const ClientDesc = ({
	clientType,
  refetch,
  currCustomer,
  setcurrCustomer,
  setshowClientModal,
}) => {
  console.log(currCustomer);

	let editFunction = null;
	if (clientType === 'Customer'){
		editFunction = editnewcustomer
	}else if (clientType === 'Vendor'){
		editFunction = editnewvendor
	}

  const mutation = useMutation({
    mutationFn: editFunction,
    onSuccess: () => {
      toast.success("Client updated successfully! ");
      console.log(refetch);
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Client could not be Updated");
    },
  });

  const [isClientEditable, setIsClientEditable] = useState(false);
  const [newClient, setNewClient] = useState(currCustomer);

  const handleItemChange = (e) => {
    if (e.target.name === "addToWebsite") {
      const { name, checked } = e.target;
      setNewClient({ ...newClient, [name]: checked });
    } else {
      const { name, value } = e.target;
      setNewClient({ ...newClient, [name]: value });
    }
  };

  return (
    <section className="bg-bggray rounded p-5 modal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-black font-primary">Client Details 🧾</h1>
          <button
            onClick={() => {
              setIsClientEditable(true);
            }}
            className="bg-none ms-5 border-0 bg-bggray text-black"
          >
            <FontAwesomeIcon className="fs-4" icon={faPenToSquare} />
          </button>
          <button
            onClick={() => setshowClientModal(false)}
            className="text-black btn-close ms-2 border-0 bg-bggray fs-5"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <hr className="horizontal-line" />
        <div className="d-flex flex-column ">
          <ClientAttribute
            handleItemChange={handleItemChange}
            currCustomer={newClient}
            isClientEditable={isClientEditable}
          />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={async (e) => {
              e.preventDefault();
              setIsClientEditable(false);
              mutation.mutate({ ...newClient });
            }}
            className="btn gradient-button text-white px-4 py-2 font-primary"
            disabled={!isClientEditable}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientDesc;
