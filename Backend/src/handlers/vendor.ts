import { database_connection } from "../db";
import { ObjectId } from "mongodb";

//////////////////////////////////////////////////////////////////////get all vendors

export const getAllVendors = async (req, res) => {
  try {
    const vendorcollection = await database_connection(["vendor invoice"]);
    const setNo = parseInt(req.params.setNo);
    const query = req.params.query;
    const itemsPerPage = 50;
    const todate = new Date(req.params.todate);
    const fromdate = new Date(req.params.fromdate);

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    const skip = (setNo - 1) * itemsPerPage;
    let vendors = [];
    let totalVendorCount = 0;
    if (query === "aisPsqSjMUDTj387Ol") {
      if (isNaN(todate.getDate()) && isNaN(fromdate.getDate())) {
        vendors = await vendorcollection[0]
          .aggregate([
            { $match: { userId: req.user.id } },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: itemsPerPage },
          ])
          .toArray();
        totalVendorCount = await vendorcollection[0].countDocuments({
          userId: req.user.id,
        });
      } else {
        vendors = await vendorcollection[0]
          .aggregate([
            {
              $match: {
                userId: req.user.id,
                date: { $gte: fromdate, $lte: todate },
              },
            },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: itemsPerPage },
          ])
          .toArray();
        totalVendorCount = await vendorcollection[0].countDocuments({
          userId: req.user.id,
          date: { $gte: fromdate, $lte: todate },
        });
      }
      if (vendors.length === 0) {
        console.log("no vendor found");
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ vendors: vendors, totalCount: totalVendorCount });
    } else {
      if (isNaN(todate.getDate()) && isNaN(fromdate.getDate())) {
        vendors = await vendorcollection[0]
          .find({ $text: { $search: query }, userId: req.user.id })
          .sort({ date: -1 })
          .limit(itemsPerPage)
          .skip(skip)
          .toArray();
        totalVendorCount = await vendorcollection[0].countDocuments({
          $text: { $search: query },
          userId: req.user.id,
        });
      } else {
        vendors = await vendorcollection[0]
          .find({
            $text: { $search: query },
            userId: req.user.id,
            date: { $gte: todate, $lte: fromdate },
          })
          .sort({ date: -1 })
          .limit(itemsPerPage)
          .skip(skip)
          .toArray();
        totalVendorCount = await vendorcollection[0].countDocuments({
          $text: { $search: query },
          userId: req.user.id,
          date: { $gte: todate, $lte: fromdate },
        });
      }

      if (vendors.length === 0) {
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ vendors: vendors, totalCount: totalVendorCount });
    }
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////////////CREATE VENDOR////////////////////////////

export const createVendor = async (req, res) => {
  try {
    const vendorcollection = await database_connection([
      "vendor invoice",
      "inventory",
    ]);
    const { cash, vat, change, date, product, rDesc, rName, total ,clientInfo} = req.body;

    // Get the user's ID from the request (assuming it's available in req.user._id)
    const userId = req.user.id;
    // console.log(userId);
    const a = new Date(date).toDateString();
    const a2 = new Date().toTimeString();
    const a3 = a + " " + a2;

    const vendorData = {
      userId: userId, // Associate the vendor with the user by including their ID
      cash: cash,
      change: change,
      date: new Date(a3),
      product: product,
      rDesc: rDesc,
      rName: rName,
      total: total,
      vat,
      clientInfo
    };
    console.log(product);

    const result = await vendorcollection[0].insertOne(vendorData);

     product.forEach(async (prod) => {
      await vendorcollection[1].updateOne(
        {
          userId,
          _id: new ObjectId(`${prod?.product?._id}`),
        },
        {
          $inc: {
            qty: Number(prod?.productQty),
          },
        },
      );
    });

    if (result.acknowledged === true) {
      console.log("Vendor data inserted successfully:", result.insertedId);
      return res
        .status(201)
        .json({ message: "Vendor data inserted successfully" });
    } else {
      console.log("Error occurred while inserting the data");
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

///////////////////////////////////////////DELETE VENDOR/////////////////////////////////////

export const deleteVendor = async (req, res) => {
  try {
    const vendorCollection = await database_connection(["vendor invoice"]);

    //   const vendorIdToDelete = req.params.id;
    const vendorIdToDelete = new ObjectId(`${req.params.id}`);

    // Find the vendor by ID and also check if it belongs to the user (using userId)
    const deletedVendor = await vendorCollection[0].findOneAndDelete({
      _id: vendorIdToDelete,
      userId: req.user.id,
    });

    if (!deletedVendor) {
      // If the vendor was not found or didn't belong to the user, return a 404 status
      return res.status(404).json({ message: "Vendor not found" });
    }
    console.log(deletedVendor);

    // If the vendor was successfully deleted, return a success message
    return res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

////////////DELETE ALL VENDORS/////////////////////////////
export const deleteAllVendors = async (req, res) => {
  try {
    const vendorcollection = await database_connection(["vendor invoice"]);

    // Delete all vendors associated with the user
    const deleteResult = await vendorcollection[0].deleteMany({
      userId: req.user.id,
    });

    if (deleteResult.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "All vendors deleted successfully" });
    } else {
      return res.status(404).json({ message: "No vendors found for deletion" });
    }
  } catch (error) {
    console.error("Error deleting vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};














////////////////////////////////////////////////////NEW VENDORS////////////////////////////////////////
///////////////////////////////////////NEW ROUTES FOR SAVING THE VENDORS//////////////////
export const createNewVendor = async (req, res) => {
  try {
    const custVendor = await database_connection(["vendor"]);
    const {
      name,
      address,
      gender,
      email,
      pContact,
      OContact,
      occupation,
      cnic,
    } = req.body;
    const userId = req.user.id;
    const newVendor = {
      userId: userId,
      name: name,
      address: address,
      gender: gender,
      email: email,
      pContact: pContact,
      OContact: OContact,
      occupation: occupation,
      cnic: cnic,
      date: new Date(),
    };
    console.log(newVendor);
    const result = await custVendor[0].insertOne(newVendor);
    if (result.acknowledged === true) {
      return res.status(200).json({ message: "vendor successfully added" });
    } else {
      return res.status(501).json({ error: "failed to add vendor" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//////////////////////////////////////////////////////////////////DELETE A CUSTOMER NEW CUSTOMER BY ID/////////////////

export const deleteSingleVendor=async(req,res)=>{
  try{
    const id=new ObjectId(`${req.params.id}`);
    const vendorCollection=await database_connection(["vendor"]);
    const result = await vendorCollection[0].findOneAndDelete({ _id: id });
    if(!result){
      return res.status(404).json({ error: "vendor not found" });
    }
    return res.status(200).json({ message: "vendor deleted successfully" });
  }
  catch(error){  
    console.error("Error deleting customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



////////////////////////////////EDIT NEW VENDOR //////////////////////

export const editNewVendor = async (req, res) => {
  try{
    const vendorCollection= await database_connection(["vendor"]);
    const userid=req.user.id;
    const id =new ObjectId(`${req.params.id}`);
    const vendor=await vendorCollection[0].findOne({_id:id,userId:userid});
    if(!vendor){
      return res.status(404).json({error:"vendor not found"});
    }
    const updateVendor={
      name:req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      email: req.body.email,
      pContact: req.body.pContact,
      OContact: req.body.OContact,
      occupation: req.body.occupation,
      cnic: req.body.cnic,

    }
    const result= await vendorCollection[0].updateOne({_id:id},{$set:updateVendor});
    if(result.modifiedCount===1){
      return res.status(200).json({message:"vendor updated successfully"});
    }
    else{
      return res.status(500).json({error:"failed to update vendor"});
    }
  }
  catch(error){
    console.error("Error updating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


///////////////////////GET ALL NEW VENDORS//////////

export const getNewVendors = async (req, res) => {
  try {
    const vendorCollection = await database_connection(["vendor"]);
    const setNo = parseInt(req.params.setNo);
    const query=req.params.query;
    const itemsPerPage = 10;
    console.log(query)

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    const skip = (setNo - 1) * itemsPerPage;
    if (query === "aisPsqSjMUDTj387Ol") {
      console.log(req.user.id)
      const vendors = await vendorCollection[0]
        .aggregate([
          { $match: { userId: req.user.id } },
          { $sort: { date: -1 } },
          { $skip: skip },
          { $limit: itemsPerPage }, 
        ])
        .toArray();
      const totalVendorCount = await vendorCollection[0].countDocuments({
        userId: req.user.id,
      });


      if (vendors.length === 0) {
        console.log("no vendors found");
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
      .status(200)
      .json({ vendors: vendors, totalCount: totalVendorCount });
  } else {
    const vendors = await vendorCollection[0]
      .find({ $text: { $search: query }, userId: req.user.id })
      .sort({ date: -1 })
      .limit(itemsPerPage)
      .skip(skip)
      .toArray();
    const totalCustomerCount = await vendorCollection[0].countDocuments({
      $text: { $search: query },
      userId: req.user.id,
    });

    if (vendors.length === 0) {
      return res
        .status(404)
        .json({ message: "No new clients found for this set" });
    }

    return res
      .status(200)
      .json({ vendors: vendors, totalCount: totalCustomerCount });
  }
} catch (error) {
  console.error("Error fetching vendor :", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};
