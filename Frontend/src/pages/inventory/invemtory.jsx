import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import InventoryTable from "./iTable";
import { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import AddItem from "./addItem";
import SearchBar from "../../components/searchBar/searchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../../functions/inventory";
import "./inventory.css";
import { useOutletContext } from "react-router-dom";

const Inventory = () => {
  const [pData, refetch] = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchBy, setSearchBy] = useState("");

  return (
    <section className="d_main">
      <div className="flex-mob text-dark subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="font-primary">Inventory</h1>
        <SearchBar
          value={searchVal}
          setValue={setSearchVal}
          width={"w-30rem"}
        />
        <div className="d-flex bnts justify-content-center align-items-center ">
          <MySelect
            name="Search by"
            setter={setSearchBy}
            values={["label", "category"]}
            curr={searchBy}
          />
          <AddButton padding_y={"py-2"} onChange={setShowModal} />
        </div>
      </div>
      <div>
        <div className="d-flex t-div justify-content-center align-items-start">
          <InventoryTable
            pData={pData}
            refetch={refetch}
            searchParam={searchVal}
            searchBy={searchBy}
          />
        </div>
      </div>
      {showModal && (
        <Modal>
          <AddItem setShowModal={setShowModal} refetch={refetch} />
        </Modal>
      )}
    </section>
  );
};

export default Inventory;
