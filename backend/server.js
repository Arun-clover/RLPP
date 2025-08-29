const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/Database");
const routes = require("./routes/routes");
const path = require("path");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));

// MongoDB connection
connectDB();

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
