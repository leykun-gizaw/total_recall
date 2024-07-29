/**
 * Purpose of this module is to query all pages in databases the app has access
 * to.
 */

// Load all environment variables
require("dotenv").config();

const express = require("express");
const notionRoutes = require("./routes/notionRoutes");
const gCalRoutes = require("./routes/gCalRoutes");

// Create an express app
const app = express();

app.use("/notion", notionRoutes);
app.use("/gcal", gCalRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Total Recall</h1>");
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
