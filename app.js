/**
 * Purpose of this module is to query all pages in databases the app has access
 * to.
 */

// Load all environment variables
require("dotenv").config();

const express = require("express");
const notionRoutes = require("./routes/notionRoutes");

// Create an express app
const app = express();

app.use("/notion", notionRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Total Recall</h1>");
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
