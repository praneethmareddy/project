const paymentRoute = require("./routes/paymentRoutes.js");
require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/auth-route.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const contactRoute = require("./routes/contact-route.js");
const serviceRoute = require("./routes/service-router.js");
const adminRoute = require("./routes/admin-router.js");
const cors = require("cors");

// to get the json data in the express app.
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use(errorMiddleware);
app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.use("/api/admin", adminRoute);

const PORT = 5000;
connectDb().then(() => {
  // Export a handler function
  module.exports = async (req, res) => {
    // Vercel will call this function when the serverless function is triggered
    await app(req, res);
  };

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
