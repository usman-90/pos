import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}; //this function will compare the password , the one user is sending to us and the hash one which is stored in the databasae ,return true or false

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
}; //this function will hash the password and return it

export const createJWT = (user) => {
  // console.log(user)
  // console.log(user._id)

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
}; //this function will create the jwt token and return it

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    console.log("ol");
    return res.status(401).json({ message: "Unauthorized token not found" });
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("ollll");
    return res.status(401).json({ message: "Unauthorized token not found" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(user,"user")
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token not found" });
  }
};
