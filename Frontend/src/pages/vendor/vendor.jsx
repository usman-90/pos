import Receipt from "../../components/vendorReceipt/vendorRecipt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRotateRight
} from "@fortawesome/free-solid-svg-icons";
import VendorReceipt from "./receipt";
import { ReceiptLayout } from "./table";
import AddReceipt from "./addReceipt.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import MySelect from "../../components/select/select";
import { useEffect, useState } from "react";
import AddButton from "../../components/addButton/addButton";
import Modal from "../../components/modal/modal";
import Table from "./table";
import SearchBar from "../../components/searchBar/searchBar";
import "./vendor.css";
import { useOutletContext } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  postVendorReceipt,
  fetchVendorReceipts,
  deleteVendorReceipt,
} from "../../functions/vendorRec";
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const VendorPage = () => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
const [,fetchProducts] = useOutletContext()
  const [receiptModal, setReceiptModal] = useState(false);
  const [newReceiptData, setNewReceiptData] = useState("");
  const [offSet, setOffSet] = useState(1);
  const [query, setQuery] = useState("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "fetchReceipt",
      offSet,
      query,
      fromDate?.$d?.toDateString(),
      toDate?.$d?.toDateString(),
    ],
    queryFn: fetchVendorReceipts,
    enabled: false,
  });
  const [modal, setModal] = useState(false);
  const [vatModal, setVatModal] = useState(false);
  useEffect(() => {
    refetch();
  }, [query, toDate, fromDate,offSet]);
  const rData = data?.data?.vendors ?? [];
  const mutation = useMutation({
    mutationFn: postVendorReceipt,
    onSuccess: () => {
      toast.success("Receipt created successfully! ");
	    fetchProducts()
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be saved");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteVendorReceipt,
    onSuccess: () => {
      toast.success("Receipt Deleted Successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops Error! Receipt could not be deleted.");
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
      <div className="text-dark flex-mob subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="font-primary">Vendor Receipts</h1>
        <SearchBar text={"Search by Name, Description or Vendor name"} value={query} setValue={setQuery} width={"w-23rem"} />

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
              onChange={setVatModal}
            />
          </div>
          <div className="d-flex justify-content-center bnts align-items-center ">
            <AddButton padding_y={"py-3"} onChange={setModal} />
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex t-div justify-content-center align-items-start">
          <Table
            headings={["No.", "Name", "Description", "Date", "Cost", "Delete"]}
            type={"Vendor Receipt"}
            mutation={deleteMutation}
            data={rData}
            total={data?.data?.totalCount}
            offSet={[offSet, setOffSet]}
          />
        </div>
      </div>
      {modal && (
        <Modal>
          <AddReceipt
            mutation={mutation}
            setReceiptModal={setReceiptModal}
            setModal={setModal}
            setNewReceiptData={setNewReceiptData}
            type={"non-vat"}
            isVendor={true}
          />
        </Modal>
      )}
      {vatModal && (
        <Modal>
          <AddReceipt
            mutation={mutation}
            setReceiptModal={setReceiptModal}
            setModal={setVatModal}
            setNewReceiptData={setNewReceiptData}
            type={"vat"}
            isVendor={true}
          />
        </Modal>
      )}
      {receiptModal && (
        <Modal>
          <ReceiptLayout
            setShowReceiptModal={setReceiptModal}
            refetch={refetch}
          >
            <VendorReceipt type={"Vendor Receipt"} data={newReceiptData} />
          </ReceiptLayout>
        </Modal>
      )}
    </section>
  );
};

export default VendorPage;
