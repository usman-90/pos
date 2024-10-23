import {
  faArrowLeft,
  faArrowRight,
  faTrash,
  faEye,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import ViewBarcodes from "./barcodes.jsx";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/modal";
import ItemDescription from "./itemDesc";
import DeleteItem from "./delItem";
import { search } from "../../helpers/search";

const InventoryTable = ({ pData, refetch, searchParam, searchBy }) => {
  const [currItem, setCurrItem] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [barcodeNumModal, setBarcodeNumModal] = useState(false);
  const [barcodeNum, setBarcodeNum] = useState(null);
  const headings = [
    "Id",
    "Name",
    "Category",
    "Qty",
    "Cost Price",
    "Selling Price",
    "Total Cost",
    "View",
    "Barcode",
    "Delete",
  ];

  const data = search(pData, searchParam, searchBy) ?? [];
  let pages = Math.ceil(data?.length / 10);
  let [curr, setcurr] = useState(1);
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
  };

  const currData = data?.slice((curr - 1) * 10, curr * 10);

  return (
    <div>
      <table className="t_main p-4 rounde shadow">
        <thead className="m-3 bg-bggray text-white">
          <tr className="m-3">
            {headings.map((heading, ind) => {
              return (
                <td
                  key={ind}
                  className="p-4 fw-bold px-4 text-dark font-primary text-center"
                >
                  {heading}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className="custTableRowBg">
          {currData?.map((d, index) => {
            return (
              <tr key={index} className="bg-bggray cursor-pointer  nbg z-0">
                <td className="p-2 text-center font-primary ">{index + 1}</td>
                <td className="p-2 font-primary text-center">
                  {d.label === "" ? "------" : d.label}
                </td>
                <td className="p-2 text-center font-primary">{d?.category}</td>
                <td className="p-2 text-center font-primary">{d?.qty}</td>
                <td className="p-2 text-center font-primary">{d?.costPrice}</td>
                <td className="p-2 text-center font-primary">
                  {d?.sellingPrice}
                </td>
                <td className="p-2 text-center font-primary">
                  {d?.qty * d.costPrice}
                </td>
                <td className="p- text-center text-danger fs-5">
                  <button
                    className="border-0 eye bg-transpaent p-2 rounded-circle text-dark bg-transparent "
                    onClick={() => {
                      setCurrItem(d);
                      setShowItemModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td className="p- text-center text-danger fs-5">
                  <button
                    className="border-0 bg-transparent text-dark eye p-2  br-40"
                    onClick={() => {
                      setCurrItem(d);
                      setBarcodeNumModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faBarcode} />
                    <FontAwesomeIcon icon={faBarcode} />
                  </button>
                </td>
                <td className="p- text-center text-danger fs-5">
                  <button
                    className="border-0 bg-transparent text-danger eye p-2  br-40"
                    onClick={() => {
                      setCurrItem(d);
                      setShowDelModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dark font-primary text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dark font-primary ">{data?.length}</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="p-2 fs-5 text-dark font-primary text-center">
              Page {curr} of {pages}
            </td>
            <td className="p-2 text-center"></td>
            <td className="p-2 text-center"></td>
            <td></td>
            <td class=" text-center">
              <button
                onClick={prev}
                disabled={curr === 1}
                className="border-0 mx-1 text-dgreen bg-white fs-4"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={next}
                disabled={curr === pages}
                className="border-0 mx-1 text-dgreen bg-white fs-4"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      {showItemModal && (
        <Modal>
          <ItemDescription
            refetch={refetch}
            product={currItem}
            setShowItemModal={setShowItemModal}
          />
        </Modal>
      )}
      {showDelModal && (
        <Modal>
          <DeleteItem
            refetch={refetch}
            currItem={currItem}
            setShowDelModal={setShowDelModal}
          />
        </Modal>
      )}
      {barcodeNumModal && (
        <Modal>
          <section className="bg-bggray rounded px-5 py-4">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="text-black font-primary ">Input Number⁉</h4>
                  <p className="fs-5 text-black font-primary">
                    Select 'Create Max' to create maximum number of barcodes
                    (max = 51).
                  </p>
                </div>

                <button
                  onClick={() => setBarcodeNumModal(false)}
                  className="text-dark btn-close ms-4 border-0 bg-bggray fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <hr />
              <TextField
                id="outlined-search"
                name="barcodeNum"
                label="Number of Barcodes"
                type="number"
                className="my-2 mb-3 w-100"
                value={barcodeNum}
                onChange={(e) => {
                  setBarcodeNum(e.target.value);
                }}
              />

              <div className="d-flex justify-content-around">
                <button
                  onClick={() => {
                    setBarcodeNumModal(false);
                    setShowBarcodeModal(true);
                  }}
                  className=" btn gradient-button text-light fs-5 px-5"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setBarcodeNum(51);
                    setBarcodeNumModal(false);
                    setShowBarcodeModal(true);
                  }}
                  className="btn btn-danger gradient-red px-5 fs-5"
                >
                  Create Max
                </button>
              </div>
            </div>
          </section>
        </Modal>
      )}
      {showBarcodeModal && (
        <Modal>
          <div>
            <button
              onClick={() => setShowBarcodeModal(false)}
              className="ms-5 barcode-close-btn text-dark btn-close border-0 bg-white fs-4"
              type="button"
              aria-label="Close"
            ></button>
            <ViewBarcodes
              name={currItem?.label}
              value={currItem?._id}
              num={barcodeNum}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InventoryTable;
