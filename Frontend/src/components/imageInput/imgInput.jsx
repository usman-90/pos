/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./imgInput.css";

const ImageInput = ({ setcardImage, img, setIsEditable, type }) => {
  const [pictureImageTxt, setPictureImageTxt] = useState(
    img ? img : "Choose Product Image"
  );
  const [pictureImage, setPictureImage] = useState(null);

  function handleInputChange(e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = (
          <img
            src={readerTarget.result}
            className="picture__img"
            alt="Selected"
          />
        );

        setcardImage(file);
        setPictureImageTxt("");
        setPictureImage(img);
        if (setIsEditable) {
          setIsEditable(true);
        }
      });

      reader.readAsDataURL(file);
      console.log(reader);
    } else {
      setPictureImageTxt("Choose an image");
      setcardImage(null);
      setPictureImage(null);
    }
  }

  return (
    <div className="position-relative cursor-pointer z-0 w-100 h-75">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image">
          {pictureImage || pictureImageTxt}
        </span>
        <div className="overlay d-flex justify-content-center align-items-center">
          <div className="edit-btn">
            <FontAwesomeIcon
              className="fs-1 p-4 rounded-circle text-light bg-lgrey "
              icon={type === "add" ? faPlus : faPenToSquare}
            />
          </div>
        </div>
      </label>
      <input
        type="file"
        name="picture__input"
        id="picture__input"
        onChange={handleInputChange}
        multiple
      />
    </div>
  );
};

export default ImageInput;
