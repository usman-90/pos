import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createNewUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;
