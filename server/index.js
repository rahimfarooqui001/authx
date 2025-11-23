import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connectDB from "./config/db.js";
import { transporter } from "./utils/mail.js";
const PORT = process.env.PORT || 4000;


transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP Verify Error:", err);
  } else {
    console.log("SMTP Ready.");
  }
});




const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`AuthX running on port ${PORT}`);
   
  });
};

startServer();
