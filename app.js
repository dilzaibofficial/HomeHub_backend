const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/connect");
// const cors = require("cors");
// const express = require("express");
// const connectDB = require("./database/connect");
require("dotenv").config(); // Environment variables load karne ke liye
const app = express();
const bodyParser = require("body-parser");

// 1. GLOBAL MIDDLEWARES
// CORS ko hamesha routes se PEHLE hona chahiye
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 2. ROUTES
const user_routes = require("./routes/user");
const property_routes = require("./routes/property");
const stripe_routes = require("./routes/stripe");
const credit_routes = require("./routes/credit");
const admin_routes = require("./routes/admin");
const notification_routes = require("./routes/notification");

app.get("/", (req, res) => {
  res.send("Welcome to anonymous app - Backend is Live!");
});

app.use("/api/user", user_routes);
app.use("/api/property", property_routes);
app.use("/api/stripe", stripe_routes);
app.use("/api/credit", credit_routes);
app.use("/api/admin", admin_routes);
app.use("/api/notification", notification_routes);

// 3. DATABASE CONNECTION (Serverless friendly)
// Vercel par hum app.listen nahi karte, sirf DB connect karte hain
connectDB()
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// 4. EXPORT FOR VERCEL (Most Important)
// Ye line Vercel ko batati hai ke server ka entry point kya hai
module.exports = app;

// Local testing ke liye (Optional)
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = 2000;
//   app.listen(PORT, () => console.log(`Local server: http://localhost:${PORT}`));
// }