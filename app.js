/**
 * Purpose of this module is to query all pages in databases the app has access
 * to.
 */

// Load all environment variables
require("dotenv").config();

const express = require("express");
const notionService = require("./services/notionApiService");

// Create an express app
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/db_pages", async (req, res) => {
  const allDatabases = await notionService.getDatabases();
  const allPages = [];

  for (const db of allDatabases) {
    const dbPages = await notionService.getDbPages(db.id);
    for (const page of dbPages) {
      allPages.push(page);
    }
  }

  res.json(allPages);
});

app.all("/secret/:code", (req, res) => {
  res.json(req.params);
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
