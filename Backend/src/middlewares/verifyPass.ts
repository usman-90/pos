import { database_connection } from "../db";
import { ObjectId } from "mongodb";
import { comparePassword } from "../modules/auth";

export const verifyPass = async (req, res, next) => {
  const shopCol = await database_connection(["shops"]);
  const id = new ObjectId(req.user.id);
  const result = await shopCol[0].findOne({ _id: id });
  const isValid = await comparePassword(req?.body?.password, result?.password);
  if (!isValid) {
    res.status(400);
    res.json({ message: "Incorrect Password!" }).end();
    return;
  }
  next();
};
