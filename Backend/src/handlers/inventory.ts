import { database_connection } from "../db";
import { ObjectId } from "mongodb";

//////////////////////////////////////CREATE INVENTORY//////////////////////////////////////

export const createInventory = async (req, res) => {
  const inventoryCollection = await database_connection(["inventory"]);
  const { category, label, qty, costPrice, sellingPrice, imgUrl } = req.body;
  const userId = req.user.id;
  console.log(userId);
  const inventoryData = {
    userId: userId,

    category: category,
    label: label,
    qty: Number(qty),
    imgUrl: imgUrl,
    costPrice,
    sellingPrice,
  };

  const result = await inventoryCollection[0].insertOne(inventoryData);
  if (result.acknowledged === true) {
    return res.status(201).json({ message: "Inventory created successfully" });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////GET ALL INVENTORY//////////////////////////////////////

export const getAllInventory = async (req, res) => {
  try {
    const inventoryCollection = await database_connection(["inventory"]);
    const result = await inventoryCollection[0]
      .find({ userId: req.user.id })
      .toArray();
    if (result.length === 0) {
      return res.status(404).json({ error: "No items in Inventory" });
    }
    console.log(result[0]);
    res.status(200).json({ result }).end();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/////////////////////////////////EDIT INVENTORY//////////////////////////////////////

export const editInventory = async (req, res) => {
  try {
    const inventoryCollection = await database_connection(["inventory"]);

    const userId = req.user.id;
    const existingInventoryItem = await inventoryCollection[0].findOne({
      _id: new ObjectId(req.params.id),
      userId: userId,
    });

    if (!existingInventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    // Update the inventory item data
    const updatedInventoryData = {
      category: req.body.category,
      label: req.body.label,
      qty: req.body.qty,
      costPrice: req.body.costPrice,
      sellingPrice: req.body.sellingPrice,
      imgUrl: req.body.imgUrl,
    };
    console.log(req.params.id);
    // Perform the update operation
    const result = await inventoryCollection[0].updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedInventoryData },
    );
    console.log(result);

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ message: "Inventory item updated successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update inventory item" });
    }
  } catch (error) {
    console.error("Error editing inventory item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////DELETE INVENTORY//////////////////////////////////////

export const deleteInventory = async (req, res) => {
  try {
    const inventoryCollection = await database_connection(["inventory"]);

    const userId = req.user.id;
    const paramId = new ObjectId(req.params.id);
    const existingInventoryItem = await inventoryCollection[0].findOne({
      _id: paramId,
      userId: userId,
    });

    if (!existingInventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    const result = await inventoryCollection[0].deleteOne({ _id: paramId });

    console.log(result);
    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Inventory item deleted successfully" });
    } else {
      return res.status(500).json({ error: "Failed to delete inventory item" });
    }
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
