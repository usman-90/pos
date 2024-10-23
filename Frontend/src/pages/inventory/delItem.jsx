import { useMutation } from "@tanstack/react-query";
import { deleteInventory } from "../../functions/inventory";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";

const DeleteItem = ({ refetch, currItem, setShowDelModal }) => {
  const mutation = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      refetch();
      toast.success("Product deleted successfully! ");
    },
    onError: () => {
      toast.error("Ops error! Product could not be deleted");
    },
  });
  if (mutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(currItem);
    setShowDelModal(false);
  };
  return (
    <section className="bg-bggray rounded p-5">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="text-black">Are you sure ⁉</h4>
            <p className="fs-5 text-black">
              Product will be deleted permanently!
            </p>
          </div>

          <button
            onClick={() => setShowDelModal(false)}
            className="text-dark btn-close ms-4 border-0 bg-bggray fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <hr className="horizontal-line" />
        <div className="d-flex justify-content-around">
          <button
            onClick={submit}
            className="btn btn-danger gradient-red fs-5 px-5"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setShowDelModal(false);
            }}
            className="btn gradient-button text-light px-5 fs-5"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteItem;
