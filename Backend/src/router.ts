import { Router } from "express";
import {
  createNewVendor,
  createVendor,
  deleteAllVendors,
  deleteSingleVendor,
  deleteVendor,
  editNewVendor,
  getAllVendors,
  getNewVendors,
} from "./handlers/vendor";
import {
  createCustomer,
  createCustomerInvoice,
  deleteAllCustomersInvoice,
 
  deleteCustomerInvoice,
  deleteCustomersById,
  deleteSingleCustomer,
  editNewCustomer,
  getAllCustomersInvoice,
  getCustomer,
} from "./handlers/customer";
import {
  createInventory,
  deleteInventory,
  editInventory,
  getAllInventory,
} from "./handlers/inventory";

import {
  setEmail,
  setBasicInfo,
  getBasicInfo,
  deleteAccount,
  resetPassword,
} from "./handlers/basicInfo";
import { verifyPass } from "./middlewares/verifyPass";
import { getStates, getProfit, getYears } from "./handlers/dashboard";

const router = Router();
//**************VENDOR*******************/
router.get("/vendor/:setNo/:query/:todate/:fromdate", getAllVendors);
router.post("/vendor", createVendor);
router.delete("/vendor/:id", deleteVendor);
router.delete("/vendor", deleteAllVendors);


//********************NEW VENDOR*********************** */
router.post("/newvendor", createNewVendor);
router.get("/newvendor/:setNo/:query", getNewVendors);
router.delete("/newvendor/:id",deleteSingleVendor);
router.put("/newvendor/:id",editNewVendor)





//*****************CUSTOMER************ */

router.get(
  "/customerinvoice/:setNo/:query/:todate/:fromdate",
  getAllCustomersInvoice,
);
router.post("/customerinvoice", createCustomerInvoice);
router.delete("/customerinvoice/:id", deleteCustomerInvoice);
router.delete("/customerinvoice/", deleteAllCustomersInvoice);

////////////////////////NEW CUSTOMER ///////////////////
//
router.post("/customer", createCustomer);
router.get("/customer/:setNo/:query", getCustomer);
router.delete("/customer/:id",deleteSingleCustomer);
router.post("/deletecustomerbyid", deleteCustomersById);
router.put("/customer/:id",editNewCustomer)
//*****************PRODUCT/INVENTORY ******************** */

router.get("/product", getAllInventory);
router.post("/product", createInventory);
router.put("/product/:id", editInventory);
router.delete("/product/:id", deleteInventory);

//*****************BASICINFO ******************** */
router.get("/basicinfo", getBasicInfo);
router.put("/basicinfo", setBasicInfo);
router.put("/basicinfo/email", setEmail);
router.put("/basicinfo/password", resetPassword);
router.post("/deleteaccount", verifyPass, deleteAccount);
//*****************Dashboard ******************** */

router.get("/dashboard/getprofit/:month/:year", getProfit);
router.get("/dashboard/getstates/:year", getStates);
router.get("/dashboard/years", getYears);

router.get("/allsale", () => {});

export default router;
