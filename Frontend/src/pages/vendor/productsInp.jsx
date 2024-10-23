import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import "./vendor.css";

const ProductsInput = ({
  handleProductChange,
  setProduct,
  deleteProduct,
  product,
  unitPrice,
  qtyVal,
  totalPrice,
  products,
  id,
  type,
}) => {
  console.log(products);
  useEffect(() => {
    if (type === "vendor") {
      handleProductChange(
        {
          target: {
            name: "totalPrice",
            value: product && qtyVal ? product?.costPrice * qtyVal : 0,
          },
        },
        id
      );
    } else {
      handleProductChange(
        {
          target: {
            name: "totalPrice",
            value: product && qtyVal ? product?.sellingPrice * qtyVal : 0,
          },
        },
        id
      );
    }
  }, [product, qtyVal]);

  return (
    <div className="d-flex flex-wrap jf-between inp-mob  align-items-center mt-3">
      <div className="w-15rem">
        <Autocomplete
          value={product}
          onChange={(e, val) => {
            setProduct(val, id);
          }}
          disablePortal
          id="combo-box-demo"
          options={products ?? []}
          renderInput={(params) => <TextField {...params} label="Product" />}
          size="small"
        />
      </div>

      <div className="m2">
        <TextField
          id="outlined-search"
          name="unitPrice"
          // label="Unit Price"
          type="number"
          disabled
          value={type === "vendor" ? product?.costPrice : product?.sellingPrice}
          size="small"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={qtyVal}
          name="productQty"
          onChange={(e) => {
            handleProductChange(e, id);
          }}
          label="Quantity"
          type="number"
          size="small"
        />
      </div>

      <div className="m2">
        <TextField
          id="outlined-search"
          value={totalPrice}
          name="totalPrice"
          label="Total Price"
          size="small"
          type="search"
          disabled
        />
      </div>
      <button
        onClick={() => {
          deleteProduct(id);
        }}
        className="text-danger bg-bggray border-0 fs-4"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ProductsInput;
