require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");

const newRouter = require("./routes/newRouter");
const indexRouter = require("./routes/indexRouter");

// VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// PARSES THE URL INTO DATA INSIDE REQ.BODY
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/new", newRouter);
app.use("/", indexRouter);

const PORT = process.env.port || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
