// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
// import app from "./app.js";
// import connectDB from "./config/db.js";
// import { transporter } from "./utils/mail.js";
// const PORT = process.env.PORT || 4000;


// transporter.verify((err, success) => {
//   if (err) {
//     console.log("SMTP Verify Error:", err);
//   } else {
//     console.log("SMTP Ready.");
//   }
// });




// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`AuthX running on port ${PORT}`);
   
//   });
// };

// startServer();

import dotenv from "dotenv";
dotenv.config(); // Load .env first

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./logger.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    console.log("📦 MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 AuthX running on port ${PORT}`);
      logger.info("Server started");
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
