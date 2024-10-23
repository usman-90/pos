import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import Modal from "../../components/modal/modal";
import Table from "../vendor/table";
import VendorReceipt from "../vendor/receipt";
import { ReceiptLayout } from "../vendor/table";
import SearchBar from "../../components/searchBar/searchBar";
import { useOutlet } from "react-router-dom";
import {
  deleteCustomerReceipt,
  fetchCustomerReceipt,
  postCustomerReceipt,
} from "../../functions/customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRotateRight
} from "@fortawesome/free-solid-svg-icons";
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";
import AddReceipt from "../vendor/addReceipt.jsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
const Customer = () => {
  const tdate = new Date();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
const [,fetchProducts] = useOutletContext()

  const [offSet, setOffSet] = useState(1);
  const [newReceiptData, setNewReceiptData] = useState("");
	const [receiptModal, setReceiptModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [vatShowModal, setVatShowModal] = useState(false);

  const [query, setQuery] = useState("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "fetchCutomerInvoice",
      offSet,
      query,
      fromDate?.$d?.toDateString(),
      toDate?.$d?.toDateString(),
    ],
    queryFn: fetchCustomerReceipt,
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, [query, toDate, fromDate,offSet]);
  const rData = data?.data?.customers ?? [];
  const mutation = useMutation({
    mutationFn: postCustomerReceipt,
    onSuccess: () => {
      toast.success("Receipt created successfully! ");
	    fetchProducts()
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be saved");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCustomerReceipt,
    onSuccess: () => {
      toast.success("Receipt deleted successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be deleted");
    },
  });

  if (deleteMutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

	const resetToAndFromDate = () => {
		setToDate({})
		setFromDate({})
	}

  return (
    <section className="d_main">
      <div className="text-dark d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="font-primary">Customer Receipts</h1>
        <SearchBar text={"Search by Name, Description or Customer name."} value={query} setValue={setQuery} width={"w-23rem"} />
        <div className="d-flex">
          <div className="d-flex">
	  <button onClick={() => {
		  resetToAndFromDate()
	  }}
	  class="bg-none border-0 bg-white fs-4 mx-3"
	  >
	  <FontAwesomeIcon icon={faRotateRight} />
	  </button>
            <div className=" w-150px mx-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
	  label="From:"
                  value={fromDate}
                  onChange={(newValue) => {
                    setFromDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="w-150px mx-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
	  label="To:"
                  value={toDate}
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="d-flex justify-content-center bnts align-items-center ">
            <AddButton
              padding_y={"py-3"}
              text={"Add VAT"}
              onChange={setVatShowModal}
            />
          </div>
          <div className="d-flex justify-content-center bnts align-items-center ">
            <AddButton onChange={setShowModal} padding_y={"py-3"} />
          </div>
        </div>
      </div>
      <div>
        <div className="pc_vendor d-flex justify-content-center align-items-start">
          <Table
            headings={["No.", "Name", "Description", "Date", "Amount", "Delete"]}
            mutation={deleteMutation}
            data={rData}
            total={data?.data?.totalCount}
            offSet={[offSet, setOffSet]}
            type={"Customer Receipt"}
          />
        </div>
      </div>

      {showModal && (
        <Modal>
          <AddReceipt
            mutation={mutation}
            setReceiptModal={setReceiptModal}
            setModal={setShowModal}
            setNewReceiptData={setNewReceiptData}
            type={"non-vat"}
          />
        </Modal>
      )}
      {vatShowModal && (
        <Modal>
          <AddReceipt
            mutation={mutation}
            setReceiptModal={setReceiptModal}
            setModal={setVatShowModal}
            setNewReceiptData={setNewReceiptData}
            type={"vat"}
          />
        </Modal>
      )}
      {receiptModal && (
        <Modal>
          <ReceiptLayout
            setShowReceiptModal={setReceiptModal}
            refetch={refetch}
          >
            <VendorReceipt type={"Cutomer Receipt"} data={newReceiptData} />
          </ReceiptLayout>
        </Modal>
      )}
    </section>
  );
};

export default Customer;
