import JsBarcode from "jsbarcode";
import { useEffect, useState } from "react";
import { Image } from "@react-pdf/renderer";

const GenerateBarcode = ({ value, name }) => {
  const [barcodeImage, setBarcodeImage] = useState("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
      format: "CODE128",
      width: 2,
      height: 80,
      text: name,
      fontSize: "40px",
    });
    const barcodeDataURL = canvas.toDataURL();
    setBarcodeImage(barcodeDataURL);
  }, [value]);
  return <Image src={barcodeImage} />;
};
export default GenerateBarcode;
