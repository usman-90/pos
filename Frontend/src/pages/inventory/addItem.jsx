import { useState } from "react";
import { TextField } from "@mui/material";
import ImageInput from "../../components/imageInput/imgInput";
import { uploadImageAndGetURL } from "../../firebase/utils";
import Checkbox from "@mui/material/Checkbox";
import { useMutation } from "@tanstack/react-query";
import { addInventory } from "../../functions/inventory";
import { useOutletContext } from "react-router-dom";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const AddItem = ({ refetch, setShowModal }) => {
  const [isloading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: addInventory,

    onSuccess: () => {
      toast.success("Product created successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Product could not be saved");
    },
  });
  const [itemData, setItemData] = useState({
    label: "",
    qty: "",
    costPrice: "",
    sellingPrice: "",
    category: "",
  });
  const [img, setImg] = useState();

  if (mutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

  if (isloading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

  const handleChange = (e) => {
    if (e.target.name === "addToWebsite") {
      const { name, checked } = e.target;
      setItemData({ ...itemData, [name]: checked });
    } else {
      const { name, value } = e.target;
      setItemData({ ...itemData, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    let a = new Date();
    if (itemData?.label === "") {
      toast.error("Product name can't be empty! ");
      return;
    }
    if (itemData?.qty === "") {
      toast.error("Product Quantity can't be empty! ");
      return;
    }
    if (itemData?.costPrice === "") {
      toast.error("Product Cost price can't be empty! ");
      return;
    }
    if (itemData?.sellingPrice === "") {
      toast.error("Product selling price can't be empty! ");
      return;
    }
    if (itemData?.category === "") {
      toast.error("Product category can't be empty! ");
      return;
    }
    const num = Math.round(Math.random() * 10000 + a.getMilliseconds());
    let imgUrl = "";
    if (img) {
      setIsLoading(true);
      imgUrl = await uploadImageAndGetURL(`/shop/${num}`, img);
    }
    console.log({ ...itemData, imgUrl });

    mutation.mutate({ ...itemData, imgUrl });
    setIsLoading(false);
    setShowModal(false);
  };

  return (
    <section className="bg-bggray rounded p-5 modal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-black">Add Product 🗄</h1>
          <button
            onClick={() => setShowModal(false)}
            className="ms-5 text-dark btn-close border-0 bg-bggray fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <hr className="horizontal-line" />
        <div className="d-flex flex-column pt-4">
          <TextField
            id="outlined-search"
            name="label"
            label="Name"
            type="search"
            className="my-2 scan-inp"
            value={itemData.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="qty"
            label="Quantity"
            type="search"
            className="my-2 scan-inp"
            value={itemData.qty}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="costPrice"
            label="Cost Price"
            type="number"
            className="my-2 scan-inp"
            value={itemData.costPrice}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="sellingPrice"
            label="Selling Price"
            type="number"
            className="my-2 scan-inp"
            value={itemData.sellingPrice}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="category"
            label="Category"
            type="search"
            className="my-2 mb-4 scan-inp"
            value={itemData.category}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={(e) => {
              submit(e);
            }}
            className="btn  gradient-button text-white fs-5 px-4 py-2"
          >
            Add !
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddItem;
