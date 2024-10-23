import "./vendorReceipt.css";

const Receipt = () => {
  return (
    <div className="m-3 shadow cursor-pointer vendor_r p-4 ">
      <div className="d-flex flex-column ">
        <div className="d-flex justify-content-between">
          <div>
            <h2>01</h2>
            <h3>Shakeel Bhai</h3>
          </div>
          <em className="fw-bold fs-5 text-success">12-2-3</em>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            exercitationem assumenda eius corporis laudantium ullam ut mollitia
          </p>
          <span className="fs-5 me-2">Total Cost:</span>
          <em className="fs-4 text-danger fw-bold">20000/=</em>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
