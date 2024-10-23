import { createJWT, comparePassword, hashPassword } from "../modules/auth";
import { database_connection } from "../db";

export const createNewUser = async (req, res) => {
  try {
    console.log(req?.body);
    const { email, password, name, lname } = req.body;
    const hashedPassword = await hashPassword(password);

    const shopsCollection = await database_connection(["shops"]);
    // console.log(shopsCollection);
    await shopsCollection[0].insertOne({
      username: email,
      password: hashedPassword,
      name,
      lname,
      createdAt: new Date(),
    });

    // Find the newly inserted user based on the unique identifier (username)
    const newUser = await shopsCollection[0].findOne({ username: email });

    if (newUser) {
      const { name } = newUser;
      const token = createJWT(newUser);
      return res.status(201).json({ token, name });
    } else {
      console.log("Error occurred while inserting the data");
      return res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const signin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const shopsCollection = await database_connection(["shops"]);

    const user = await shopsCollection[0].findOne({ username: email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    } else {
      const token = createJWT(user);
      const { name, username, _id } = user;
      return res.status(200).json({ token, name, username, id: _id });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
