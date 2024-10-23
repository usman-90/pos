import { useMutation } from "@tanstack/react-query";
import {
  faArrowLeft,
  faArrowRight,
  faTrash,
  faEye,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import CustomerInfo from "./customerInfo.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal2 from "../../components/modal/modal2.jsx";
import { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ProductsInput from "./productsInp";
import "./vendor.css";
import { useOutletContext } from "react-router-dom";
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";
import { validateProducts } from "../../helpers/validate";
import VendorInfo from "./vendorInfo.jsx";

const AddReceipt = ({
  mutation,
  setReceiptModal,
  setNewReceiptData,
  setModal,
  type,
  isVendor,
}) => {

  const [products ] = useOutletContext();
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
    cash: "",
  });
  const [productId, setProductId] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    id: "",
    pContact: "",
  });
  const [customerModal, setCustomerModal] = useState(false);
  if (mutation.isLoading) {
    return (
      <LoaderLayout>
        <TypeWtiter />
      </LoaderLayout>
    );
  }
  let [product, setProduct] = useState([]);
  const computeTotal = () => {
    let sum = 0;
    product.forEach((elem) => {
      sum += elem?.totalPrice;
    });
    return sum;
  };
  const total = computeTotal();
  const computeVat = () => {
    let vat = (5 * total) / 100;
    return vat;
  };
  const vat = computeVat();
  let change = 0;
  if (type === "vat") {
    change = receiptData?.cash - total - vat;
  } else if (type === "non-vat") {
    change = receiptData?.cash - total;
  }
  const submit = () => {
    let obj = {};
    if (type === "non-vat") {
      obj = { ...receiptData, change, total };
    } else if (type === "vat") {
      obj = { ...receiptData, change, total, vat };
    }
    if (product.length === 0) {
      toast.error("There should be atleast 1 product!");
      return;
    }
    const isValid = validateProducts(product);
    if (!isValid) {
      toast.error("Product Name or Product quantity must not be empty!");
      return;
    }
	  console.log({ ...obj, product, clientInfo },"usmannnnnnnnnnnnn");
    mutation.mutate({ ...obj, product, clientInfo });
    setNewReceiptData({ ...obj, product, clientInfo });
    setModal(false);
    setReceiptModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };

  const handleproduct = (val, id) => {
    setProduct((prevcomponents) => {
      const updatedComponents = [...prevcomponents];
      updatedComponents[id].product = val;
      return updatedComponents;
    });
  };

  const handleClientInfoChange = (client) => {
    setClientInfo(client);
  };

  const handleProductChange = (e, id) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updatedComponents = [...prev];
      updatedComponents[id][name] = value;
      return updatedComponents;
    });
  };
  const deleteProduct = (id) => {
    setProduct((prev) => {
      const obj = [...product];
      obj.splice(id, 1);
      return obj;
    });
  };

  const addProduct = () => {
    setProduct((prevComp) => [
      ...prevComp,
      {
        product: "",
        productQty: "1",
        totalPrice: 0,
      },
    ]);
  };

  const addByScan = (e) => {
    const prod = products?.filter((p) => {
      return p._id === e.target.value;
    });
    if (prod?.length !== 0) {
      if (product?.length > 0) {
        let isProductALreadyAdded = false;
        product?.map((p, index) => {
          if (p?.product?._id === e.target.value) {
            isProductALreadyAdded = true;
            setProduct((prevcomponents) => {
              const updatedComponents = [...prevcomponents];
              updatedComponents[index].productQty = `${
                Number(updatedComponents[index]?.productQty) + 1
              }`;
              return updatedComponents;
            });
          }
        });
        if (!isProductALreadyAdded) {
          setProduct((prevComp) => [
            ...prevComp,
            {
              product: prod[0],
              productQty: "1",
              totalPrice: 0,
            },
          ]);
        }
      } else {
        setProduct((prevComp) => [
          ...prevComp,
          {
            product: prod[0],
            productQty: "1",
            totalPrice: 0,
          },
        ]);
      }
    }
    setProductId("");
  };
  console.log(products);

  return (
    <>
      <section className="bg-bggray rounded p-5 modal_bg">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-black font-primary ">Create Receipt 🧾</h1>
            <button
              onClick={() => setModal(false)}
              className="text-dark btn-close border-0 bg-bggray fs-4"
              type="button"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-1 w-100">
            <input
              id="scan-inp"
              className="w-100 px-2 py-2 rounded scan-inp "
              name="productId"
              value={productId}
              onChange={(e) => {
                addByScan(e);
              }}
              placeholder="Add product by Scan."
              type="text"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="mt-2 d-flex ">
            <TextField
              className="w-150px bg-white scan-inp"
              id="outlined-search"
              name="rName"
              value={receiptData.rName}
              onChange={(e) => {
                handleChange(e);
              }}
              label="Name"
              type="search"
            />
            <div className="mx-1"></div>
            <TextField
              className="w-250px bg-white scan-inp"
              id="outlined-search "
              name="rDesc"
              value={receiptData.rDesc}
              onChange={(e) => {
                handleChange(e);
              }}
              label="Description"
              type="search"
            />
            <div className="mx-1"></div>
            <TextField
              className="w-150px bg-white scan-inp"
              id="outlined-search"
              name="rDesc "
              value={clientInfo?.name}
              onClick={(e) => {
                setCustomerModal(true);
              }}
              label={isVendor ? "Select Vendor" : "Select Customer"}
              type="search"
            />
            <div className="mx-1"></div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-150px bg-white scan-inp"
                value={receiptData.date}
                onChange={(newValue) => {
                  setReceiptData({ ...receiptData, ["date"]: newValue });
                }}
              />
            </LocalizationProvider>
          </div>
          {product.map((prod, index) => {
            return (
              <div key={index}>
                <ProductsInput
                  handleProductChange={handleProductChange}
                  setProduct={handleproduct}
                  deleteProduct={deleteProduct}
                  product={prod?.product}
                  qtyVal={prod?.productQty ? prod?.productQty : ""}
                  products={products}
                  unitPrice={prod?.unitPrice ? prod?.unitPrice : 0}
                  totalPrice={prod?.totalPrice ? prod?.totalPrice : 0}
                  type={"vendor"}
                  id={index}
                />
              </div>
            );
          })}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn gradient-button text-white"
              onClick={addProduct}
            >
              Add product
            </button>
          </div>
          <div>
            <div className="my-2 d-flex justify-content-between align-items-center">
              <h3 className="text-grey">Total</h3>
              <TextField
                className="bg-white scan-inp"
                id="outlined-search"
                label={total}
                type="number"
                disabled
              />
            </div>
            {type === "vat" ? (
              <>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <h3 className="text-grey ">Vat Amount</h3>
                  <TextField
                    className="bg-white scan-inp"
                    id="outlined-search"
                    label={vat}
                    type="number"
                    disabled
                  />
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <h3 className="text-grey">Sum Total</h3>
                  <TextField
                    className="bg-white scan-inp"
                    id="outlined-search"
                    label={vat + total}
                    type="number"
                    disabled
                  />
                </div>
              </>
            ) : null}
            <div className="my-2 d-flex justify-content-between align-items-center">
              <h3 className="text-grey">Cash</h3>
              <TextField
                className="bg-white scan-inp"
                id="outlined-search"
                label="Cash"
                name="cash"
                onChange={(e) => {
                  handleChange(e);
                }}
                type="number"
                value={receiptData.cash}
              />
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
              <h3 className="text-grey">Change</h3>
              <TextField
                className="bg-white scan-inp"
                id="outlined-search"
                label={change}
                type="number"
                disabled
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn bg-dgreen   gradient-button text-light "
                onClick={() => {
                  submit();
                }}
              >
                Create Receipt!
              </button>
            </div>
          </div>
        </div>
        {customerModal && (
          <Modal2>
            <CustomerInfo
              clientType={isVendor ? "Vendor" : "Customer"}
              handleClientInfoChange={handleClientInfoChange}
              setCustomerModal={setCustomerModal}
            />
          </Modal2>
        )}
      </section>
    </>
  );
};
export default AddReceipt;
