import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({ text, onChange, padding_y }) => {
  return (
    <button
      onClick={() => onChange(true)}
      className={`mx-3 h-75 rounded gradient-button text-light border-0 px-3  ${
        padding_y ?? ""
      } d-flex justify-content-center align-items-center`}
    >
      <span className="me-2 font-primary">{text ?? "Add"}</span>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};
export default AddButton;
