import { ObjectId } from "mongodb";
import { database_connection } from "../db";

///////////////////////////////////////////////////////get all customers

export const getAllCustomersInvoice = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const setNo = parseInt(req.params.setNo);
    const query = req.params.query;
    const itemsPerPage = 50;
    const todate = new Date(req.params.todate);
    const fromdate = new Date(req.params.fromdate);

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    const skip = (setNo - 1) * itemsPerPage;
    let customers = [];
    let totalCustomerCount = 0;
    if (query === "aisPsqSjMUDTj387Ol") {
      if (isNaN(todate.getDate()) && isNaN(fromdate.getDate())) {
        customers = await custCollection[0]
          .aggregate([
            { $match: { userId: req.user.id } },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: itemsPerPage },
          ])
          .toArray();
        totalCustomerCount = await custCollection[0].countDocuments({
          userId: req.user.id,
        });
      } else {
        customers = await custCollection[0]
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
        totalCustomerCount = await custCollection[0].countDocuments({
          userId: req.user.id,
          date: { $gte: fromdate, $lte: todate },
        });
      }
      if (customers.length === 0) {
        console.log("no customer found");
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ customers: customers, totalCount: totalCustomerCount });
    } else {
      if (isNaN(todate.getDate()) && isNaN(fromdate.getDate())) {
        customers = await custCollection[0]
          .find({ $text: { $search: query }, userId: req.user.id })
          .sort({ date: -1 })
          .limit(itemsPerPage)
          .skip(skip)
          .toArray();
        totalCustomerCount = await custCollection[0].countDocuments({
          $text: { $search: query },
          userId: req.user.id,
        });
      } else {
        customers = await custCollection[0]
          .find({
            $text: { $search: query },
            userId: req.user.id,
            date: { $gte: todate, $lte: fromdate },
          })
          .sort({ date: -1 })
          .limit(itemsPerPage)
          .skip(skip)
          .toArray();
        totalCustomerCount = await custCollection[0].countDocuments({
          $text: { $search: query },
          userId: req.user.id,
          date: { $gte: todate, $lte: fromdate },
        });
      }

      if (customers.length === 0) {
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ customers: customers, totalCount: totalCustomerCount });
    }
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////////////CREATE CUSTOMER//////////////////////////////////////////////
export const createCustomerInvoice = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice", "inventory"]);
    const { vat, cash, change, date, product, rDesc, rName, total ,clientInfo} = req.body;
    const userId = req.user.id;
    console.log(date);
    const a = new Date(date).toDateString();
    const a2 = new Date().toTimeString();
    const a3 = a + " " + a2;
    const custData = {
      userId: userId,
      cash: cash,
      change: change,
      date: new Date(a3),
      product: product,
      rDesc: rDesc,
      rName: rName,
      total: total,
      vat,
      clientInfo,
      
    };

    const result = await custCollection[0].insertOne(custData);

    product.forEach(async (prod) => {
      await custCollection[1].updateOne(
        {
          userId,
          _id: new ObjectId(`${prod?.product?._id}`),
        },
        {
          $inc: {
            qty: Number(prod?.productQty) * -1,
          },
        },
      );
    });

    if (result.acknowledged === true) {
      return res
        .status(201)
        .json({ message: "Customer invoice created successfully" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////DELETE A CUSTOMER////////////////////////////

export const deleteCustomerInvoice = async (req, res) => {
  try {
    const id = new ObjectId(`${req.params.id}`);
    const custCollection = await database_connection(["customer invoice"]);
    const result = await custCollection[0].findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////DELETE ALL CUSTOMERS////////////////////////////

export const deleteAllCustomersInvoice = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const result = await custCollection[0].deleteMany({ userId: req.user.id });
    if (result.deletedCount >= 1) {
      return res
        .status(200)
        .json({ message: "All customers deleted successfully" });
    } else {
      return res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    console.error("Error deleting customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

///////////////////NEW CUTOMER ROUTES//////////////////////////////
//////////////////////////////create a new customer //////////////////////////////////////////////
export const createCustomer = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer"]);
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
    const newCustomer = {
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
    console.log(newCustomer);
    const result = await custCollection[0].insertOne(newCustomer);
    if (result.acknowledged === true) {
      return res.status(200).json({ message: "customer successfully added" });
    } else {
      return res.status(501).json({ error: "failed to add customer" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////GET ALL  NEW CUSTOMERS////////////////////

export const getCustomer = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer"]);
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
      const customers = await custCollection[0]
        .aggregate([
          { $match: { userId: req.user.id } },
          { $sort: { date: -1 } },
          { $skip: skip },
          { $limit: itemsPerPage }, 
        ])
        .toArray();
      const totalCustomerCount = await custCollection[0].countDocuments({
        userId: req.user.id,
      });


      if (customers.length === 0) {
        console.log("no clients found");
        return res
          .status(404)
          .json({ message: "No clients found for this set" });
      }

      return res
      .status(200)
      .json({ customers: customers, totalCount: totalCustomerCount });
  } else {
    const customers = await custCollection[0]
      .find({ $text: { $search: query }, userId: req.user.id })
      .sort({ date: -1 })
      .limit(itemsPerPage)
      .skip(skip)
      .toArray();
    const totalCustomerCount = await custCollection[0].countDocuments({
      $text: { $search: query },
      userId: req.user.id,
    });

    if (customers.length === 0) {
      return res
        .status(404)
        .json({ message: "No new clients found for this set" });
    }

    return res
      .status(200)
      .json({ customers: customers, totalCount: totalCustomerCount });
  }
} catch (error) {
  console.error("Error fetching customer invoices:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};

/////////////////////////////////////DELETE A CUSTOMER NEW CUSTOMER BY ID ARRAY/////////////////

export const deleteCustomersById = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer"]);
    const { ids } = req.body;
    console.log(ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty IDs array" });
    }

    const userId = req.user.id;
    console.log(userId);
    const objIds = ids.map((id) => {
      return new ObjectId(id);
    });

    const result = await custCollection[0].deleteMany({
      userId: userId,
      _id: { $in: objIds },
    });

    console.log(result);

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Customers deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Customers not found or could not be deleted" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////DELETE A CUSTOMER NEW CUSTOMER BY ID/////////////////

export const deleteSingleCustomer=async(req,res)=>{
  try{
    const id=new ObjectId(`${req.params.id}`);
    const custCollection=await database_connection(["customer"]);
    const result = await custCollection[0].findOneAndDelete({ _id: id });
    if(!result){
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  }
  catch(error){  
    console.error("Error deleting customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
/////////EDIT NEW CUSTOMER //////////

export const editNewCustomer = async (req, res) => {
  try{
    const custCollection= await database_connection(["customer"]);
    const userid=req.user.id;
    const id =new ObjectId(`${req.params.id}`);
    const customer=await custCollection[0].findOne({_id:id,userId:userid});
    if(!customer){
      return res.status(404).json({error:"customer not found"});
    }
    const updateCustomer={
      name:req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      email: req.body.email,
      pContact: req.body.pContact,
      OContact: req.body.OContact,
      occupation: req.body.occupation,
      cnic: req.body.cnic,

    }
    const result= await custCollection[0].updateOne({_id:id},{$set:updateCustomer});
    if(result.modifiedCount===1){
      return res.status(200).json({message:"customer updated successfully"});
    }
    else{
      return res.status(500).json({error:"failed to update customer"});
    }
  }
  catch(error){
    console.error("Error updating customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
