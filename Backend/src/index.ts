import * as dotenv from "dotenv";
dotenv.config(); // load .env file
// import config from './config'
import app from "./server";

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
